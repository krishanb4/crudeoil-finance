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
import { fromJS } from 'immutable';
import { approval, deposit } from '../web3';

export function fetchVaultsData({ address, web3, pools }) {
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
      if (address) {
        // can only fetch allowances if a wallet is connected
        pools.map(pool => {
          const bnbShimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
          let tokenAddress = pool.get('tokenAddress');
          const token = new web3.eth.Contract(erc20ABI, tokenAddress || bnbShimAddress);
          tokenCalls.push({
            allowance: token.methods.allowance(address, pool.get('earnContractAddress')),
          });
        });
      }

      pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.get('earnedTokenAddress'));
        vaultCalls.push({
          pricePerFullShare:
            vault.methods.getPricePerFullShare() == undefined
              ? 0
              : vault.methods.getPricePerFullShare(),
          tvl: vault.methods.totalSupply() == undefined ? 0 : vault.methods.totalSupply(),
        });
      });

      Promise.all([
        multiCall.all([tokenCalls]).then(result => result[0]),
        multiCall.all([vaultCalls]).then(result => result[0]),
        //whenPricesLoaded() // need to wait until prices are loaded in cache
      ])
        .then(data => {
          const newPools = [];
          pools.map((pool, i) => {
            let a = data[1][i].pricePerFullShare == undefined ? 1 : data[1][i].pricePerFullShare;
            const allowance = data[0][i] ? web3.utils.fromWei(data[0][i].allowance, 'ether') : 0;
            const pricePerFullShare = byDecimals(a, 18).toNumber();

            var newPool = pool.set('allowance', new BigNumber(allowance).toNumber() || 0);
            newPool = newPool.set(
              'pricePerFullShare',
              new BigNumber(pricePerFullShare).toNumber() || 1
            );
            newPool = newPool.set('tvl', byDecimals(data[1][i].tvl, 18).toNumber());
            newPool = newPool.set('oraclePrice', 0.4);
            // newPools.push(newPool);
            newPools.push(newPool);
          });
          var imPools = fromJS(newPools);
          dispatch({
            type: types.VAULT_FETCH_VAULTS_DATA_SUCCESS,
            data: imPools,
          });
          resolve();
        })
        .catch(error => {
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
  return async dispatch => {
    dispatch({
      type: types.VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const tokensList = [];

      tokens.map(t => {
        tokensList.push({
          token: t.get('token'),
          tokenAddress: t.get('tokenAddress'),
          tokenBalance: t.get('tokenBalance'),
        });
      });

      const multiCall = new MultiCall(web3, getNetworkMultiCall());

      const calls = tokensList.map(token => {
        const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);
        return {
          tokenBalance: tokenContract.methods.balanceOf(address),
        };
      });

      multiCall
        .all([calls])
        .then(([results]) => {
          let newTokens = [];
          for (let i = 0; i < tokensList.length; i++) {
            let newToken = {
              token: tokensList[i].token,
              tokenAddress: tokensList[i].tokenAddress,
              tokenBalance: byDecimals(results[i].tokenBalance || 0, 18).toNumber(),
            };
            newTokens.push(newToken);
          }
          var imPools = fromJS(newTokens);
          dispatch({
            type: types.VAULT_FETCH_BALANCES_SUCCESS,
            data: imPools,
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

export function fetchDeposit({ address, web3, amount, contractAddress, index }) {
  return async dispatch => {
    dispatch({
      type: types.VAULT_FETCH_DEPOSIT_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      deposit({ web3, address, amount, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: types.VAULT_FETCH_DEPOSIT_SUCCESS,
            data,
            index,
          });
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'success', hash: '', message: 'Transaction Success' },
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: types.VAULT_FETCH_DEPOSIT_FAILURE,
            index,
          });
          dispatch({
            type: types.OPEN_TOAST,
            items: {
              type: 'error',
              hash: '',
              message: `Transaction Failed : ${error.message || error} `,
            },
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function fetchApproval({ address, web3, tokenAddress, contractAddress, index }) {
  return async dispatch => {
    dispatch({
      type: types.VAULT_FETCH_APPROVAL_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      approval({
        web3,
        address,
        tokenAddress,
        contractAddress,
        dispatch,
      })
        .then(data => {
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'success', hash: '', message: 'Transaction Success' },
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: types.OPEN_TOAST,
            items: {
              type: 'error',
              hash: '',
              message: `Transaction Failed : ${error.message || error} `,
            },
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

const FetchBeginningVaultData = items => ({
  type: types.VAULT_FETCH_VAULTS_DATA_BEGIN,
  items,
});
