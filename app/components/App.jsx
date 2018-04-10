var React = require('react');
var createReactClass = require('create-react-class');

var AppNav = require('AppNav');
var Main = require('Main');

var App = createReactClass({
  render: function () {
    return (
      <div>
        <AppNav/>
        <Main/>
      </div>
    )
  }
});

module.exports = App;