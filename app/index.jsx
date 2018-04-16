var React = require('react');
var { render } = require('react-dom');
var { Provider } = require('react-redux');

var { store } = require('./helpers');

var AppNav = require('./components/AppNav');

import { App } from './components';

require('applicationStyle');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);