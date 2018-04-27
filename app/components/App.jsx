import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';

import Home from './Home';
import AppNav from './AppNav';

import MenuAppBar from './MenuAppBar';

import Course from './Course';

import SubLesson from './SubLesson';

import Sort from './Sort';

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
        <Router history={history}>
          <div className="container">
            <AppNav />
            <Route exact path='/' component={Home} />
            <Route path='/basic-course/:courseName/:type?' component={Course} />
            <Route path='/advanced-course/:courseName/:type?' component={Course} />       
            <Route path='/course/:courseName/:lesson/:sublesson' component={SubLesson} />
            <Route path='/algo' component={Sort} />
          </div>
        </Router>
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