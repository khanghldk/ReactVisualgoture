var React = require('react');
var { render } = require('react-dom');
var { Provider } = require('react-redux');
// import { PersistGate } from 'redux-persist/es/integration/react';
var { store } = require('./store');

var AppNav = require('./components/AppNav');

import { App } from './components';

require('applicationStyle');

console.log(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);