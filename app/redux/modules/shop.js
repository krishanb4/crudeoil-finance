import { fromJS, List } from 'immutable';
import {
  FETCH_SHOP_DATA,
  ADD_SHOP,
  UPDATE_SHOP,
  SHOW_DETAIL_SHOP,
  SEARCH_SHOP
} from '../../constants/actionConstants';

const initialState = {
  list: List([]),
  totalItems: 0,
  shopIndex: 0,
  keywordValue: ''
};

let itemId = [];

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case FETCH_SHOP_DATA:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('list', items);
      });
    case SEARCH_SHOP:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
      case ADD_SHOP:
        return state.withMutations((mutableState) => {          
          mutableState
            .set('shop', action.item);
        });
    case UPDATE_SHOP:
      return state.withMutations((mutableState) => {        
        mutableState
          .set('total', state.total)
          .set('shop', state.shop);
      });
    case SHOW_DETAIL_SHOP:
      return state.withMutations((mutableState) => {
        const index = state.get('list').indexOf(action.item);
        mutableState.set('shopIndex', index);
      });
    default:
      return state;
  }
}
