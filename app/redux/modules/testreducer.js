import {
    VAULT_FETCH_VAULTS_DATA_BEGIN,
    VAULT_FETCH_VAULTS_DATA_SUCCESS,
    VAULT_FETCH_VAULTS_DATA_FAILURE,
    VAULT_FETCH_BALANCES_SUCCESS,
    VAULT_FETCH_BALANCES_BEGIN,
    VAULT_FETCH_BALANCES_FAILURE,
  } from '../../constants/actionConstants';
  import { fromJS } from 'immutable';
  import { getNetworkPools } from '../../helpers/getNetworkData';
  
  const pools = getNetworkPools();
  const tokens = {};
  
  pools.forEach(({ token, tokenAddress, earnedToken, earnedTokenAddress }) => {
    tokens[token] = {
      tokenAddress: tokenAddress,
      tokenBalance: 0,
    };
    tokens[earnedToken] = {
      tokenAddress: earnedTokenAddress,
      tokenBalance: 0,
    };
  });
  
  const initialState = {
    pools : pools,
    tokens : tokens,
    apys: {},
    fetchApysDone: false,
    fetchApysPending: false,
    fetchVaultsDataDone: false,
    fetchVaultsDataPending: false,
    fetchBalancesDone: false,
    fetchBalancesPending: false,
    fetchApprovalPending: {},
    fetchDepositPending: {},
    fetchWithdrawPending: {},
    fetchHarvestPending: {},
  };
  
  // const initialState = {
  //   isLoading: false,
  //   web3: null,
  //   address: null,
  //   networkId: 0,
  //   connected: false,
  //   connectWalletPending: false,
  // };
  
  //const initialImmutableState = fromJS(initialState);
  
  export default function reducer(state = initialState, action = {}) {
    switch (action.type) {      
      default:
        return state;
    }
  }
  