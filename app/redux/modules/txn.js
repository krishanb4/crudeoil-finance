import { fromJS, List, Map } from 'immutable';
import { SAVE_TXNS, UPDATE_TXNS } from '../../constants/actionConstants';

const initialState = {
  txns: List([])
};

const convertToMap = (txn) => {
  return Map(txn)
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SAVE_TXNS:
      return state.withMutations((mutableState) => {
        mutableState
          .update(
            'txns',
            txns => txns.unshift(
              convertToMap(action.item)
            )
          )
      });
    case UPDATE_TXNS:
      return state.withMutations((mutableState) => {
        const index = state.get('txns').indexOf(action.item);
        mutableState.update('txns', txns => txns
          .setIn([index, 'status'], action.item.status));
      });
    default:
      return state;
  }
}
