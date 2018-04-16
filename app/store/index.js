import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const config = {
    key: 'root',
    storage,
};

// const reducer = persistCombineReducers(config, reducers);

const loggerMiddleware = createLogger();

export const store = createStore(
    reducers,
    {},
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
