import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';

import Home from './Home';
import AppNav from './AppNav';

import Course from './Course';

import SubLesson from './SubLesson';

import ErrorPage from './ErrorPage';

import UserManagement from './UserManagement';

import EnhancedTable from './EnhancedTable';

import EditableCourse from './EditableCourse';

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
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/basic-course/:courseName/:type?' exact component={Course} />
            <Route path='/advanced-course/:courseName/:type?' exact component={Course} />
            <Route path='/basic-course/:courseName/:lesson/:sublesson' component={ (props) => (
                  <SubLesson timestamp={new Date().toString()} {...props} />
            )}/>
            <Route exact path='/manageUsers' component={UserManagement}/>
            <Route path='/edit-course/:uid' exact component={ (props) => (
                  <EditableCourse timestamp={new Date().toString()} {...props} />
            )}/>
            <Route component={(props) => (
                  <ErrorPage message={'The page you are looking for could not be found!'} {...props}/>
            )}/>
          </Switch>
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