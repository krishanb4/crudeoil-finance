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

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', true);
        mutableState.set('fetchVaultsDataPending', true);
      });
    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      // return state.withMutations(mutableState => {
      //   mutableState.set('isLoading', false);
      //   mutableState.set('pools', action.items.data);
      //   mutableState.set('isFetchVaultsDataPending', false);
      //   mutableState.set('hasFetchVaultsDataDone', true);
      // });
      return {
        ...state,
        pools: action.items.data,
        isLoading: false,
        isFetchVaultsDataPending: false,
        hasFetchVaultsDataDone: false,
      };
    case VAULT_FETCH_VAULTS_DATA_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isFetchVaultsDataPending', false);
      });

    case VAULT_FETCH_BALANCES_BEGIN:
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      return {
        ...state,
        tokens: action.data,
        fetchBalancesDone: true,
        fetchBalancesPending: false,
      };

    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };
    default:
      return state;
  }
}
