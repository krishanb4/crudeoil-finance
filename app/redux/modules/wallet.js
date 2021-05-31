import {
  HOME_CONNECT_WALLET_BEGIN,
  HOME_CONNECT_WALLET_SUCCESS,
  HOME_CONNECT_WALLET_FAILURE,
  HOME_ACCOUNTS_CHANGED,
  HOME_NETWORK_CHANGED,
  HOME_DISCONNECT_WALLET_BEGIN,
  HOME_DISCONNECT_WALLET_SUCCESS,
  HOME_DISCONNECT_WALLET_FAILURE
  
} from '../../constants/actionConstants';
import { fromJS } from 'immutable';
import { stubTrue } from 'lodash-es';

const initialState = {
  isLoading: false,
  web3: null,
  address: null,
  networkId: 0,
  connected: false,
  connectWalletPending: false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case HOME_CONNECT_WALLET_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', true);
        mutableState.set('connectWalletPending', true);
      });
    case HOME_CONNECT_WALLET_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', false);
        mutableState.set('address', action.items.address);
        mutableState.set('connected', true);
        mutableState.set('web3', action.items.web3);
        mutableState.set('networkId', action.items.networkId);
        mutableState.set('connectWalletPending', false);
      });
    case HOME_NETWORK_CHANGED:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', false);
        mutableState.set('networkId', action.data);
      });

    case HOME_ACCOUNTS_CHANGED:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', false);
        mutableState.set('address', action.data.account);
        mutableState.set('connected', true);
        mutableState.set('web3', action.data.web3);
      });
    case HOME_CONNECT_WALLET_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', false);
        mutableState.set('connectWalletPending', false);
      });
    case HOME_DISCONNECT_WALLET_BEGIN:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', stubTrue);
        mutableState.set('disConnectWalletPending', true);
      });

    case HOME_DISCONNECT_WALLET_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('isLoading', false);
        mutableState.set('address', '');
        mutableState.set('connected', false);
        mutableState.set('web3', null);
        mutableState.set('disConnectWalletPending', false);
      });
    case HOME_DISCONNECT_WALLET_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('address', '');
        mutableState.set('web3', null);
        mutableState.set('disConnectWalletPending', false);
      });
    default:
      return state;
  }
}
