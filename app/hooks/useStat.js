import { ethers, utils, BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { fetchPrice, getEarnings, getHolders } from '../utils/apis/fetchData';

var vaults = [
  {
    id: 1,
    logo: '/images/logo/eth.svg',
    platformImage: '/images/logo/venus.svg',
    platform: 'Venus',
    name: 'ETH',
    token: 'ETH',
    tokenDescription: 'Venus',
    description: 'OIL/BNB',
    balance: '$0.00',
    deposited: '$0.00',
    apy: '0.00%',
    daily: '0.00%',
    tvl: '$0.00M',
    reward: '$0.00',
    inactive: false,
    depositsPaused: false,
    tokenAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'mooVenusETH',
    earnedTokenAddress: '0xA9936272065e6DDAc9D2453C9a2712B581e9aE1B',
    earnContractAddress: '0xA9936272065e6DDAc9D2453C9a2712B581e9aE1B',
    pricePerFullShare: 1,
    oracle: 'tokens',
    oracleId: 'ETH',
    oraclePrice: 0,
    status: 'active',
    assets: ['ETH'],
    callFee: 1,
    buyTokenUrl:
      'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  },
  // {
  //   id: 2,
  //   logo: '/images/logo/bnb.svg',
  //   platformImage: '/images/logo/venus.svg',
  //   platform: 'Venus',
  //   name: 'DLPT',
  //   token: 'DLPT',
  //   tokenDescription: 'Venus',
  //   description: 'OIL/BNB',
  //   balance: '$0.00',
  //   deposited: '$0.00',
  //   apy: '0.00%',
  //   daily: '0.00%',
  //   tvl: '$0.00M',
  //   reward: '$0.00',
  //   inactive: false,
  //   depositsPaused: false,
  //   tokenAddress: '0xd7c39356ac6b7e19c44917dffde3e55f8b7489da',
  //   tokenDecimals: 18,
  //   tokenDescriptionUrl: '#',
  //   earnedToken: 'OL',
  //   earnedTokenAddress: '0xD7c39356ac6B7e19C44917DfFde3E55F8b7489DA',
  //   earnContractAddress: '0xD7c39356ac6B7e19C44917DfFde3E55F8b7489DA',
  //   pricePerFullShare: 1,
  //   oracle: 'tokens',
  //   oracleId: 'ETH',
  //   oraclePrice: 0,
  //   status: 'active',
  //   assets: ['ETH'],
  //   callFee: 1,
  //   buyTokenUrl:
  //     'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  // },
];

const formatTvl = tvl => {
  const order = Math.floor(Math.log10(tvl) / 3);
  if (order < 0) {
    return '$0.00';
  }

  const units = ['', 'k', 'M', 'B', 'T'];
  const num = tvl / 1000 ** order;

  // return `$ ${num.toFixed(2)}${units[order]}`;
  return {
    val: num.toFixed(2),
    unit: units[order],
  };
};

const CFVault = [
  'function balanceOf(address who) external view returns(uint256)',
  'function totalSupply() external view returns(uint256)',
];

const useStat = () => {
  const [globalTvl, setGlobalTvl] = useState(0);
  const [activeVaults, setActiveVaults] = useState(0);
  const [dailyRewards, setDailyRewards] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [extHolders, setExtHolders] = useState(0);
  const [extPrice, setExtPrice] = useState(0);
  const [marketCap, setMarketCap] = useState({ val: 0 });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    setActiveVaults(() => vaults.filter(vault => vault.status === 'active').length);
  }, [vaults]);

  const fetchVaultTvl = async ({ vault, signer }) => {
    try {
      const vaultContract = new ethers.Contract(vault.earnedTokenAddress, CFVault, signer);

      const vaultBalance = await vaultContract.totalSupply();

      const price = await fetchPrice({ oracle: vault.oracle, id: vault.oracleId });

      const normalizationFactor = 100000;
      const normalizedPrice = BigNumber.from(Math.round(price * normalizationFactor));
      const vaultBalanceInUsd = vaultBalance.mul(normalizedPrice);
      const result = vaultBalanceInUsd.div(normalizationFactor);

      const vaultObjTvl = utils.formatEther(result);
      vault.tvl = Number(vaultObjTvl).toFixed(2);
      return result;
    } catch (err) {
      return 0;
    }
  };

  const fetchGlobalTvl = async () => {
    let promises = [];
    vaults.forEach(vault => promises.push(fetchVaultTvl({ vault, signer })));
    await Promise.all(promises);

    let globalTvl = 0;

    const isUniqueEarnContract = (pool, index, pools) => {
      const earnContractAddress = pool.earnContractAddress;
      return pools.findIndex(p => p.earnContractAddress === earnContractAddress) === index;
    };

    vaults
      .filter(p => p.status === 'active')
      .filter(isUniqueEarnContract)
      .forEach(({ tvl }) => {
        globalTvl += Number(tvl);
      });
    setGlobalTvl(globalTvl);
  };

  const fetchEarnings = async () => {
    let earnings = (await getEarnings()) || { daily: 0, total: 0 };

    if (!earnings.total) {
      earnings.total = 0;
    }
    if (typeof earnings.total === 'string' || earnings.total instanceof String) {
      earnings.total = Number(earnings.total) / 1e18;
    }

    setDailyRewards(earnings.daily.toFixed(2));
    setTotalRewards(earnings.total.toFixed(2));
  };

  const fetchExtHolders = async () => {
    const holders = (await getHolders()) || 0;
    setExtHolders(holders);
  };

  const fetchExtPrice = async () => {
    // This id should be change when create id
    const price = await fetchPrice({ oracle: 'tokens', id: 'BIFI' });
    const mcap = formatTvl((80000 - 4000) * price);
    setExtPrice(price.toFixed(2));
    setMarketCap(mcap);
  };

  return {
    fetchGlobalTvl,
    fetchEarnings,
    fetchExtHolders,
    fetchExtPrice,
    globalTvl,
    activeVaults,
    dailyRewards,
    totalRewards,
    extHolders,
    extPrice,
    marketCap,
  };
};

export default useStat;
