export const bscPools = [
  {
    id: 'cake-bnb-diesel',
    pid: 0,
    tokenAddress: '0xd712c16e0f6955db04d4e6167f485cb227a0f6ae',   
    earnContractAddress: '0xDD156A7cA731269Bbb12E772290260CFA3F2620d',
    strategyAddress: '0xdCaf4A943313B4B34c7A4D026847ac1b683a8225',
    logo: '/images/logo/diesel-bnb.svg',
    platformImage: '/images/logo/pancake.svg',    
    platform: 'pancake',
    name: 'BNB-DIESEL',
    token: 'BNB-DIESEL',
    rewardAprKey: 'bnb-diesel-xyz',
    tokenDescription: 'BNB-DIESEL PAIR',
    description: 'DIESEL',
    balance: 0,
    deposited: 0,
    apy: 0,
    daily: 0,
    tvl: 0,
    reward: 0,
    isActive: true,
    depositsPaused: false,
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'BNB-DIESEL', 
    oracle: 'lps',
    oracleId: 'cake-bnb-diesel',
    oraclePrice: 0,    
    status: 'active',
    assets: ['DIESEL, BNB'],
    callFee: 1,
    buyTokenUrl: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    addLiquidityUrl : 'https://exchange.pancakeswap.finance/#/add/BNB/0xe1eA2E1907d93F154234CE3b5A7418faf175fE11',
    farmContract: 'https://bscscan.com/address/0xD712c16e0f6955dB04d4E6167f485Cb227a0f6Ae',
    vaultContract: 'https://bscscan.com/address/0xDD156A7cA731269Bbb12E772290260CFA3F2620d'
  },
  {
    id: 'diesel-diesel',
    pid: 2,
    tokenAddress: '0xe1ea2e1907d93f154234ce3b5a7418faf175fe11',
    earnContractAddress: '0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D',
    strategyAddress: '0xf8AF376Bed503aECF95F7720E87CB6E3ec4476D8',    
    logo: '/images/logo/diesel.svg',
    platformImage: '/images/logo/pancake.svg',    
    platform: 'pancake',
    name: 'DIESEL',
    token: 'DIESEL',
    rewardAprKey: 'diesel-diesel-xyz',
    tokenDescription: 'DIESEL SINGLE',
    description: 'DIESEL',
    balance: 0,
    deposited: 0,
    apy: 0,
    daily: 0,
    tvl: 0,
    reward: 0,
    isActive: true,
    depositsPaused: false,
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'DIESEL',    
    oracle: 'tokens',
    oracleId: 'DIESEL',
    oraclePrice: 0,    
    status: 'active',
    assets: ['DIESEL'],
    callFee: 1,
    buyTokenUrl: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xe1ea2e1907d93f154234ce3b5a7418faf175fe11',
    addLiquidityUrl : 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xe1ea2e1907d93f154234ce3b5a7418faf175fe11',
    farmContract: 'https://bscscan.com/address/0xD712c16e0f6955dB04d4E6167f485Cb227a0f6Ae',
    vaultContract: 'https://bscscan.com/address/0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D'
  },
  {
    id: 'venus-eth',
    pid: 4,    
    tokenAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',    
    earnContractAddress: '0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D',
    strategyAddress : '0xa2f585B1A9eECD4962f7EE5A0BC675361ed79190',
    logo: '/images/logo/eth.svg',
    platformImage: '/images/logo/venus.svg',    
    platform: 'Venus',
    name: 'ETH',
    token: 'ETH',
    rewardAprKey: 'venus-eth-xyz',
    tokenDescription: 'ETH SINGLE',
    description: 'ETH',
    balance: 0,
    deposited: 0,
    apy: 0,
    daily: 0,
    tvl: 0,
    reward: 0,
    isActive: true,
    depositsPaused: false,
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'ETH',
    oracle: 'tokens',
    oracleId: 'ETH',
    oraclePrice: 0,    
    status: 'active',
    assets: ['ETH'],
    callFee: 1,
    buyTokenUrl: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x250632378e573c6be1ac2f97fcdf00515d0aa91b',
    addLiquidityUrl : 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x250632378e573c6be1ac2f97fcdf00515d0aa91b',
    farmContract: 'https://bscscan.com/address/0x250632378e573c6be1ac2f97fcdf00515d0aa91b',
    vaultContract: 'https://bscscan.com/address/0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
  },
  {
    id: 'cake-cake',
    pid: 5,    
    tokenAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',    
    earnContractAddress: '0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D',
    strategyAddress : '0x8fd96F7FC0d2442a985bD47EcdeB601174F7EE12',
    logo: '/images/logo/cake.svg',
    platformImage: '/images/logo/pancake.svg',    
    platform: 'pancakeSwap',
    name: 'CAKE',
    token: 'CAKE',
    rewardAprKey: 'cake-xyz',
    tokenDescription: 'CAKE SINGLE',
    description: 'CAKE',
    balance: 0,
    deposited: 0,
    apy: 0,
    daily: 0,
    tvl: 0,
    reward: 0,
    isActive: true,
    depositsPaused: false,
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'CAKE',
    oracle: 'tokens',
    oracleId: 'CAKE',
    oraclePrice: 0,    
    status: 'active',
    assets: ['CAKE'],
    callFee: 1,
    buyTokenUrl: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    addLiquidityUrl : 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    farmContract: 'https://bscscan.com/address/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    vaultContract: 'https://bscscan.com/address/0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D'
  },
  {
    id: 'bakery-bake',
    pid: 5,    
    tokenAddress: '0xe02df9e3e622debdd69fb838bb799e3f168902c5',    
    earnContractAddress: '0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D',
    strategyAddress : '0x3db6BB68F2Bd40cc0473bD33C298B7754107CDb8',
    logo: '/images/logo/bake.svg',
    platformImage: '/images/logo/bake.svg',    
    platform: 'pancakeSwap',
    name: 'BAKE',
    token: 'BAKE',
    rewardAprKey: 'bake-xyz',
    tokenDescription: 'BAKE SINGLE',
    description: 'BAKE',
    balance: 0,
    deposited: 0,
    apy: 0,
    daily: 0,
    tvl: 0,
    reward: 0,
    isActive: true,
    depositsPaused: false,
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'BAKE',
    oracle: 'tokens',
    oracleId: 'BAKE',
    oraclePrice: 0,    
    status: 'active',
    assets: ['BAKE'],
    callFee: 1,
    buyTokenUrl: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    addLiquidityUrl : 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    farmContract: 'https://bscscan.com/address/0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    vaultContract: 'https://bscscan.com/address/0xf8E1F982568E67e9D8F778254e93A49f8d5dA68D'
  }
];
