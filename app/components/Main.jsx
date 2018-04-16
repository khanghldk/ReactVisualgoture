var React = require('react');
var createReactClass = require('create-react-class');
var { Router, Route } = require('react-router-dom');
var { connect } = require('react-redux');
var { history } = require('../helpers');

var SortRoute = require('SortRoute');
var BST = require('BST');
var Home = require('Home');

import { alertActions } from '../actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/sort' component={SortRoute} />
            <Route path='/BST' component={BST} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(Main);
export { connectedApp as Main };


// var Main = createReactClass({
//   render: function () {
//     return (
//       <div className="container">
//         <Router history={history}>
//           <div>
//             <Route exact path='/' component={Home} />
//             <Route path='/sort' component={SortRoute} />
//             <Route path='/BST' component={BST} />
//           </div>
//         </Router>
//       </div>
//     )
//   }
// });

// module.exports = Main;