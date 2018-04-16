import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';

var Sort = require('Sort');
var BST = require('BST');
var Home = require('Home');
import AppNav from './AppNav';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container">
        <AppNav />
        <Router history={history}>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/sort' component={Sort} />
            <Route path='/BST' component={BST} />
          </div>
        </Router>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { alert, app } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };