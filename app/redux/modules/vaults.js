import {
  VAULT_FETCH_VAULTS_DATA_BEGIN,
  VAULT_FETCH_VAULTS_DATA_SUCCESS,
  VAULT_FETCH_VAULTS_DATA_FAILURE,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_FAILURE,
  VAULT_FETCH_DEPOSIT_BEGIN,
  VAULT_FETCH_DEPOSIT_SUCCESS,
  VAULT_FETCH_DEPOSIT_FAILURE,
} from '../../constants/actionConstants';
import { fromJS } from 'immutable';
import { getNetworkPools } from '../../helpers/getNetworkData';

const pools = getNetworkPools();
const tokens = [];

pools.forEach(({ token, tokenAddress, earnedToken, earnedTokenAddress }) => {
  tokens.push({
    token: token,
    tokenAddress: tokenAddress,
    tokenBalance: 0,
  });
  tokens.push({
    token: earnedToken,
    tokenAddress: earnedTokenAddress,
    tokenBalance: 0,
  });
});

const initialState = {
  pools: pools,
  tokens: tokens,
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

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', true);
        mutableState.set('fetchVaultsDataPending', true);
      });
    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', false);
        mutableState.set('pools', action.data);
        mutableState.set('isFetchVaultsDataPending', false);
        mutableState.set('hasFetchVaultsDataDone', true);
      });
    // return {
    //   ...state,
    //   pools: action.items.data,
    //   isLoading: false,
    //   isFetchVaultsDataPending: false,
    //   hasFetchVaultsDataDone: false,
    // };
    case VAULT_FETCH_VAULTS_DATA_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isFetchVaultsDataPending', false);
      });

    case VAULT_FETCH_BALANCES_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isFetchBalancesPending', true);
      });

    case VAULT_FETCH_BALANCES_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isFetchBalancesPending', false);
        mutableState.set('tokens', action.data);
      });
    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };
    case VAULT_FETCH_DEPOSIT_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isDepositingPending', true);
      });
    case VAULT_FETCH_DEPOSIT_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isDepositingPending', false);
      });
    case VAULT_FETCH_DEPOSIT_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isDepositingPending', false);
      });
    default:
      return state;
  }
}
