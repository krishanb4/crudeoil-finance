import {HOME_CONNECT_WALLET_BEGIN, HOME_CONNECT_WALLET_SUCCESS,HOME_CONNECT_WALLET_FAILURE } from '../../constants/actionConstants';
import { fromJS } from 'immutable';

const initialState = {  
  isLoading: false,
  web3: null,
  address: null,
  networkId : 0,
  connected : false,


};

const initialImmutableState = fromJS(initialState);

export default function reducer(state =initialImmutableState , action = {}) {
  switch (action.type) {
    case HOME_CONNECT_WALLET_BEGIN:
        return state.withMutations((mutableState) => {
            mutableState.set('isLoading', true);
          });
      case HOME_CONNECT_WALLET_SUCCESS:
        return state.withMutations((mutableState) => {
            mutableState.set('isLoading', false);
          });
    default:
      return state;
  }
}
