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
  VAULT_FETCH_WITHDRAW_BEGIN,
  VAULT_FETCH_WITHDRAW_SUCCESS,
  VAULT_FETCH_WITHDRAW_FAILURE,
  VAULT_FETCH_APYS_BEGIN,
  VAULT_FETCH_APYS_SUCCESS,
  VAULT_FETCH_APYS_FAILURE,
  VAULT_FETCH_STRATEGY_HARVEST_BEGIN,
  VAULT_FETCH_STRATEGY_HARVEST_SUCCESS,
  VAULT_FETCH_STRATEGY_HARVEST_FAILURE
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
  apys: [],
  isFetchVaultsDataPending: true,
  isFetchBalancesPending: true,
  isDepositingPending: true,
  isWithdrawingPending: false,
  isApysPending: true,
  isHarvestingPending: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return state.withMutations(mutableState => {        
        mutableState.set('isFetchVaultsDataPending', true);
      });
    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      return state.withMutations(mutableState => {        
        mutableState.set('pools', action.data);
        mutableState.set('isFetchVaultsDataPending', false);
      });
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
      return state.withMutations(mutableState => {
        mutableState.set('isFetchBalancesPending', false);
      });
    case VAULT_FETCH_DEPOSIT_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isDepositingPending', true);
      });
    case VAULT_FETCH_DEPOSIT_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isDepositingPending', false);
      });
    case VAULT_FETCH_DEPOSIT_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isDepositingPending', false);
      });

    case VAULT_FETCH_WITHDRAW_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isWithdrawingPending', true);
      });
    case VAULT_FETCH_WITHDRAW_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isWithdrawingPending', false);
      });
    case VAULT_FETCH_WITHDRAW_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isWithdrawingPending', false);
      });
    case VAULT_FETCH_APYS_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isApysPending', true);
      });
    case VAULT_FETCH_APYS_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isApysPending', false);
        mutableState.set('apys', action.data);
      });
    case VAULT_FETCH_APYS_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isApysPending', false);
      });
      case VAULT_FETCH_STRATEGY_HARVEST_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isHarvestingPending', true);
      });
    case VAULT_FETCH_STRATEGY_HARVEST_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isHarvestingPending', false);
      });
    case VAULT_FETCH_STRATEGY_HARVEST_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isHarvestingPending', false);
      });
    default:
      return state;
  }
}
