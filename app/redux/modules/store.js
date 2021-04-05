import { fromJS, List } from 'immutable';
import {
  FETCH_STORE_DATA,
  ADD_STORE,
  UPDATE_STORE,
  SHOW_DETAIL_STORE,
  SEARCH_STORE
} from '../../constants/actionConstants';

const initialState = {
  stores: List([]),
  totalItems: 0,
  storeIndex: 0,
  pageIndex: 0,
  pageSize: 10
};

let itemId = [];

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case FETCH_STORE_DATA:
      return state.withMutations((mutableState) => {
        const data = action.data;
        mutableState.set('stores', data.optometryStoreList)
                     .set('totalItems', data.totalRecords)
                     .set('pageSize', data.pageSize)
                      .set('pageIndx', data.currentPage);
      });
    case SEARCH_STORE:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
    case ADD_STORE:
      return state.withMutations((mutableState) => {        
        mutableState
          .set('formValue', action.data );
      });
    case SHOW_DETAIL_STORE:
      return state.withMutations((mutableState) => {
        const index = state.get('stores').indexOf(action.item);
        mutableState.set('storeIndex', index);
      });
    default:
      return state;
  }
}
