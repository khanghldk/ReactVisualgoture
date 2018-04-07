var React = require('react');
var ReactDOM = require('react-dom');
var {BrowserRouter} = require('react-router-dom');
var App = require('App');

require('style-loader!css-loader!sass-loader!applicationStyle');


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);