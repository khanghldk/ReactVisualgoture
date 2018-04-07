var React = require('react');
var createReactClass = require('create-react-class');
var { Switch, Route } = require('react-router-dom');
var App = require('App');
var Sort = require('Sort');
var BST = require('BST');

var Main = createReactClass({
  render: function () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/sort' component={Sort} />
          <Route path='/BST' component={BST} />
        </Switch>
      </div>
    )
  }
});

module.exports = Main;