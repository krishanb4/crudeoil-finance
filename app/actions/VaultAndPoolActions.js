import * as types from '../constants/actionConstants';
import Web3 from 'web3';
import { getRpcUrl } from '../utils/networkSetup';
import axios from 'axios';
import { erc20ABI, vaultABI, strategyABI } from '../bscconfigure';
import { byDecimals } from '../helpers/bignumber';
import { getNetworkMultiCall } from '../helpers/getNetworkData';
import BigNumber from 'bignumber.js';
import { MultiCall } from 'eth-multicall';
import { fromJS } from 'immutable';
import {
  approval,
  deposit,
  withdraw,
  whenPricesLoaded,
  harvest,
  fetchPrice,
  fetchStrategy,
} from '../web3';

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

      Promise.all(
        pools.map(async pool => {
          // const vault = new web3.eth.Contract(vaultABI, pool.get('earnedTokenAddress'));
          // const pid = pool.get('pid');
          // const strategyContractAddress = await fetchStrategy({
          //   web3,
          //   contractAddress: pool.get('earnedTokenAddress'),
          //   pid: pid,
          // });
          // const strategyContract = new web3.eth.Contract(strategyABI, strategyContractAddress);
          // let deposited = 0;
          // let reward = 0;
          // if(address) {
          //   deposited = await vault.methods.stakedWantTokens(pid, address).call();
          //   reward = await vault.methods.pendingAUTO(pid, address).call();
          // }
          
          // var tvl = await strategyContract.methods.wantLockedTotal().call();
          // vaultCalls.push({
          //   deposited: deposited,
          //   tvl: tvl,
          //   reward: reward,
          // });
          await _vaultsData({pool, web3, address, vaultCalls});
        })
      ).then(() => {
        Promise.all([
          multiCall.all([tokenCalls]).then(result => result[0]),
          multiCall.all([vaultCalls]).then(result => result[0]),
          whenPricesLoaded(), // need to wait until prices are loaded in cache
        ])
          .then(data => {
            const newPools = [];
            pools.map((pool, i) => {
              let depBalance = data[1][i].deposited == undefined ? 0 : data[1][i].deposited;
              let pendingReward = data[1][i].reward == undefined ? 0 : data[1][i].reward;
              const allowance = data[0][i] ? web3.utils.fromWei(data[0][i].allowance, 'ether') : 0;
              const deposited = byDecimals(depBalance, 18)
                .toNumber()
                .toFixed(8);
              const reward = byDecimals(pendingReward, 18)
                .toNumber()
                .toFixed(8);

              var newPool = pool.set('allowance', new BigNumber(allowance).toNumber() || 0);
              newPool = newPool.set('deposited', deposited || 0);
              newPool = newPool.set('reward', reward || 0);
              newPool = newPool.set('tvl', byDecimals(data[1][i].tvl, 18).toNumber());
              newPool = newPool.set('oraclePrice', fetchPrice(pool.get('oracleId')));
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
              tokenBalance: byDecimals(results[i].tokenBalance || 0, 18)
                .toNumber()
                .toFixed(8),
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

export function fetchDeposit({ address, web3, pid, amount, contractAddress, index }) {
  return async dispatch => {
    dispatch({
      type: types.VAULT_FETCH_DEPOSIT_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      deposit({ web3, address, pid, amount, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: types.VAULT_FETCH_DEPOSIT_SUCCESS,
            data,
            index,
          });
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'success', hash: '', message: 'Transaction Successfull' },
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

export function fetchWithdraw({ address, web3, amount, pid, contractAddress, index }) {
  return async dispatch => {
    dispatch({
      type: types.VAULT_FETCH_WITHDRAW_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      withdraw({ web3, address, amount, pid, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: types.VAULT_FETCH_WITHDRAW_SUCCESS,
          });
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'success', hash: '', message: 'Transaction Success' },
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: types.VAULT_FETCH_WITHDRAW_FAILURE,
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

export function fetchHarvest({ address, web3, pid, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: types.VAULT_FETCH_STRATEGY_HARVEST_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      harvest({ web3, address, pid, vaultContractAddress: contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: types.VAULT_FETCH_STRATEGY_HARVEST_SUCCESS,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: types.VAULT_FETCH_STRATEGY_HARVEST_FAILURE,
            index,
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

export function fetchApys() {
  return async dispatch => {
    dispatch({
      type: types.VAULT_FETCH_APYS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const apiReq = axios.get(`https://apiv2.crudeoil.finance/apy?_=1617972101`);

      apiReq.then(
        res => {
          var output = Object.entries(res.data).map(([token, apy]) => ({ token, apy }));
          var imData = new fromJS(output);
          dispatch({
            type: types.VAULT_FETCH_APYS_SUCCESS,
            data: imData,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: types.VAULT_FETCH_APYS_FAILURE,
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

const FetchBeginningVaultData = items => ({
  type: types.VAULT_FETCH_VAULTS_DATA_BEGIN,
  items,
});

const _vaultsData = async ({pool, web3, address, vaultCalls })=> {
  const vault = new web3.eth.Contract(vaultABI, pool.get('earnedTokenAddress'));
  const pid = pool.get('pid');
  const strategyContractAddress = await fetchStrategy({
    web3,
    contractAddress: pool.get('earnedTokenAddress'),
    pid: pid,
  });
  const strategyContract = new web3.eth.Contract(strategyABI, strategyContractAddress);
  let deposited = 0;
  let reward = 0;
  if(address) {
    deposited = await vault.methods.stakedWantTokens(pid, address).call();
    reward = await vault.methods.pendingAUTO(pid, address).call();
  }
  
  var tvl = await strategyContract.methods.wantLockedTotal().call();
  vaultCalls.push({
    deposited: deposited,
    tvl: tvl,
    reward: reward,
  });
}