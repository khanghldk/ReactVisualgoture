var React = require('react');
var createReactClass = require('create-react-class');
var { Jumbotron, Button, Col } = require("react-bootstrap");

var Intro = createReactClass({
    render: function () {
        return (
            <div>
                <Jumbotron>
                    <h1>You can learn many algorithms.</h1>
                    <p>
                        This site helps you learn algorithms from basic to advance through visualizer algorithms.
                        </p>
                </Jumbotron>
            </div>
        )
    }
});

module.exports = Intro;