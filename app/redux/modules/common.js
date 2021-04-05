import { SERVER_INVOKING_STARTED, SERVER_INVOKING_STOPPED } from '../../constants/actionConstants';
import { fromJS } from 'immutable';

const initialState = {  
  isLoading: false

};

const initialImmutableState = fromJS(initialState);

export default function reducer(state =initialImmutableState , action = {}) {
  switch (action.type) {
    case SERVER_INVOKING_STARTED:
        return state.withMutations((mutableState) => {
            mutableState.set('isLoading', true);
          });
      case SERVER_INVOKING_STOPPED:
        return state.withMutations((mutableState) => {
            mutableState.set('isLoading', false);
          });
    default:
      return state;
  }
}
