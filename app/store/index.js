import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const loggerMiddleware = createLogger();

const config = {
    key: 'root',
    storage,
    whitelist: [
        'app',
        'alert',
        'googleAuth',
    ],
};

console.log(reducers);

const reducer = persistCombineReducers(config, {root: reducers});

export const store = createStore(
    reducer,
    {},
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        ),
    )
);