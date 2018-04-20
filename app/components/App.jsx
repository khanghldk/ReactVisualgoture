import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';

import Home from './Home';
import AppNav from './AppNav';

import Course from './Course';

import SubLesson from './SubLesson';

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
        <Router history={history}>
          <div>
            <AppNav />
            <Route exact path='/' component={Home} />
            <Route path='/basic-course/:courseName' component={Course} />
            <Route path='/advanced-course/:courseName' component={Course} />       
            <Route path='/course/:courseName/:lesson/:sublesson' component={SubLesson} />
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