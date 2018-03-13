import { UPDATE_ATTR } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  user: {
  	email: '',
  	password: '',
  },
});

function signInPageReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case UPDATE_ATTR:
    return state.update('user', (user) => Object.assign(user, action.payload) );
  default:
    return state;
  }
}

export default signInPageReducer;

