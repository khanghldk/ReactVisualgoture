import { combineReducers } from 'redux';

import alert from './alert';
import googleAuth from './googleAuth';
import app from './app';

const reducers = combineReducers({
  app,
  alert,
  googleAuth,
});

export default reducers;
