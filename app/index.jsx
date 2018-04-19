import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import AppNav from './components/AppNav';

import { App } from './components';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import CircularProgress from 'material-ui/CircularProgress';

require('applicationStyle');

render(
  <Provider store={store}>
    <PersistGate  persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);