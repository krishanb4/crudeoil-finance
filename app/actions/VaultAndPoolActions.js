import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as types from '../constants/actionConstants';
import Web3 from 'web3';
import { getRpcUrl } from '../utils/networkSetup';
import { erc20ABI, vaultABI, multiCallBnbShimABI } from '../bscconfigure';
import { byDecimals } from '../helpers/bignumber';
import { getNetworkMultiCall } from '../helpers/getNetworkData';
import BigNumber from 'bignumber.js';
import { MultiCall } from 'eth-multicall';

export function fetchVaultsData({address, web3, pools}) {
  return async dispatch => {
    dispatch(FetchBeginningVaultData());
    if (!web3) {
      // setup default provider to get vault data
      web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
    }

    const promise = new Promise((resolve, reject) => {
      const multiCall = new MultiCall(web3, getNetworkMultiCall());

      let tokenCalls = [];
      let vaultCalls = [];
      if (address) { // can only fetch allowances if a wallet is connected
        pools.map(pool => {
          const bnbShimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
          let tokenAddress = pool.get('tokenAddress');
          const token = new web3.eth.Contract(erc20ABI, tokenAddress || bnbShimAddress);
          tokenCalls.push( {
            allowance: token.methods.allowance(address, pool.get('earnContractAddress')),
          }
          );
        });
      }

       pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.get('earnedTokenAddress'));
        vaultCalls.push({
          pricePerFullShare: vault.methods.getPricePerFullShare(),
          tvl: vault.methods.balance(),
        });
      });

      Promise.all([
        multiCall.all([tokenCalls]).then(result => result[0]),
        multiCall.all([vaultCalls]).then(result => result[0]),
        //whenPricesLoaded() // need to wait until prices are loaded in cache
      ]).then(data => {
        const newPools = pools.map((pool, i) => {
          const allowance = data[0][1] ? web3.utils.fromWei(data[0][i].allowance, 'ether') : 0;
          const pricePerFullShare = byDecimals(data[1][i].pricePerFullShare, 18).toNumber();
          return {
            ...pool,
            allowance: new BigNumber(allowance).toNumber() || 0,
            pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
            tvl: byDecimals(data[1][i].tvl, 18).toNumber(),
            oraclePrice: fetchPrice({ id: pool.get('oracleId') }) || 0,
          };
        });
        dispatch({
          type: types.VAULT_FETCH_VAULTS_DATA_SUCCESS,
          data: newPools,
        });
        resolve();
      }).catch(error => {
        dispatch({
          type: types.VAULT_FETCH_VAULTS_DATA_FAILURE,
        });
        reject(error.message || error);
      });
    });

    return promise;
  };
}

export function fetchBalances({ address, web3, tokens }) {
  return dispatch => {
    dispatch({
      type: types.VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const tokensList = [];
      for (let key in tokens) {
        tokensList.push({
          token: key,
          tokenAddress: tokens[key].tokenAddress,
          tokenBalance: tokens[key].tokenBalance,
        });
      }

      const multiCall = new MultiCall(web3, getNetworkMultiCall());

      const calls = tokensList.map(token => {
        if (!token.tokenAddress) {
          const shimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
          const shimContract = new web3.eth.Contract(multiCallBnbShimABI, shimAddress);
          return {
            tokenBalance: shimContract.methods.balanceOf(address),
          };
        } else {
          const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);
          return {
            tokenBalance: tokenContract.methods.balanceOf(address),
          };
        }
      });

      multiCall
        .all([calls])
        .then(([results]) => {
          const newTokens = {};
          for (let i = 0; i < tokensList.length; i++) {
            newTokens[tokensList[i].token] = {
              tokenAddress: tokensList[i].tokenAddress,
              tokenBalance: new BigNumber(results[i].tokenBalance).toNumber() || 0,
            };
          }

          dispatch({
            type: types.VAULT_FETCH_BALANCES_SUCCESS,
            data: newTokens,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: types.VAULT_FETCH_BALANCES_FAILURE,
          });
          return reject(error.message || error);
        });
    });

    return promise;
  };
}

export const detailAction = item => ({
  type: types.SHOW_DETAIL_SHOP,
  item,
});

export const fetchAction = items => ({
  type: types.FETCH_SHOP_DATA,
  items,
});

async function _connectWallet(dispatch, web3Modal) {
  try {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    web3.eth.extend({
      methods: [
        {
          name: 'chainId',
          call: 'eth_chainId',
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });
    const subscribeProvider = provider => {
      if (!provider.on) {
        return;
      }
      provider.on('close', () => {
        dispatch(disconnectWallet(web3, web3Modal));
      });
      provider.on('disconnect', async () => {
        debugger;
        dispatch(disconnectWallet(web3, web3Modal));
      });
      provider.on('accountsChanged', async accounts => {
        if (accounts[0]) {
          dispatch({ type: types.HOME_ACCOUNTS_CHANGED, data: accounts[0] });
        } else {
          dispatch(disconnectWallet(web3, web3Modal));
        }
      });
      provider.on('chainChanged', async chainId => {
        const networkId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
        dispatch({ type: types.HOME_NETWORK_CHANGED, data: networkId });
      });
    };
    subscribeProvider(provider);

    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    let networkId = await web3.eth.getChainId();
    if (networkId === 86) {
      // Trust provider returns an incorrect chainId for BSC.
      networkId = 56;
    }

    dispatch(ConnectedToWallet({ web3, address, networkId }));
  } catch (error) {
    console.log(error);
    dispatch(ConnectedToWalletWithError());
  }
}

const FetchBeginningVaultData = items => ({
  type: types.VAULT_FETCH_VAULTS_DATA_BEGIN,
  items,
});

const ConnectedToWallet = items => ({
  type: types.HOME_CONNECT_WALLET_SUCCESS,
  items,
});

const ConnectedToWalletWithError = items => ({
  type: types.HOME_CONNECT_WALLET_FAILURE,
  items,
});

const DisConnectingToWallet = items => ({
  type: types.HOME_DISCONNECT_WALLET_BEGIN,
  items,
});

const DisConnectedToWallet = items => ({
  type: types.HOME_DISCONNECT_WALLET_SUCCESS,
  items,
});

const DisConnectedToWalletWithError = items => ({
  type: types.HOME_DISCONNECT_WALLET_FAILURE,
  items,
});

const WalletNetworkChanged = items => ({
  type: types.HOME_NETWORK_CHANGED,
  items,
});

const WalletAccountChanged = items => ({
  type: types.HOME_ACCOUNTS_CHANGED,
  items,
});
