import { Map, fromJS } from 'immutable';
import { CLOSE_TOAST, OPEN_TOAST } from '../../constants/actionConstants';

const initialState = {  
    toastMessage: '',
    hash: '',
    type : 'success'
  
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case CLOSE_TOAST:
        return state.withMutations((mutableState) => {
            mutableState.set('toastMessage', '');
          });
      case OPEN_TOAST:
        return state.withMutations((mutableState) => {
            mutableState.set('toastMessage', action.items.message);
            mutableState.set('toastHash', action.items.hash);
            mutableState.set('type', action.items.type);
          });
    default:
      return state;
  }
}
