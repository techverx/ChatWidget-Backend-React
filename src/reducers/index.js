import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduxTokenAuthReducer } from 'redux-token-auth'
import appReducer from './app';
import signInPageReducer from './sign-in';

const rootReducer = combineReducers({
  routing: routerReducer,
  user: signInPageReducer,
  app: appReducer,
  reduxTokenAuth: reduxTokenAuthReducer,
});

export default rootReducer;