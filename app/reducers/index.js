import { combineReducers } from 'redux';

import { alert } from './alert.reducer';

import { googleAuth } from './googleAuth';

import { app } from './app';

const rootReducer = combineReducers({
  app,
  alert,
  googleAuth
});

export default rootReducer;