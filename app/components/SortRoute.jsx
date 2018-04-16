var React = require('react');
var createReactClass = require('create-react-class');

var { Switch, Route, Router } = require('react-router-dom');

var Sort = require('Sort');
var SubLesson = require('SubLesson');

var SortRoute = createReactClass({
    render: function () {
        return (
            <Router>
                <div>
                    <Route exact path='/sort' component={Sort} />
                    <Route path='/sort/:lesson' component={SubLesson} />
                </div>
            </Router>
        )
    }
});

module.exports = SortRoute;