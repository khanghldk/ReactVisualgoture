import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const config = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(config, reducers);

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  {},
  composeWithDevTools(
    applyMiddleware(thunk, loggerMiddleware),
  )
);

export default store;
