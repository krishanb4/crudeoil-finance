import { Map, fromJS } from 'immutable';
import { INIT } from '../../constants/actionConstants';

const initialState = {
  usersLogin: Map({
    email: 'dush88c@gmail.com',
    password: 'Abc@1234',
    remember: false
  })
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    default:
      return state;
  }
}
