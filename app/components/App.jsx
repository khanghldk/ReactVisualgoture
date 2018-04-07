var React = require('react');
var createReactClass = require('create-react-class');

var AppNav = require('AppNav');

var App = createReactClass({
  render: function () {
    return (
      <AppNav/>
    )
  }
});

module.exports = App;