var React = require('react');
var createReactClass = require('create-react-class');

var { Link, IndexLink } = require('react-router-dom');

var { Tab, Tabs, Col, ListGroup, ListGroupItem } = require('react-bootstrap');

var Intro = require('Intro');

var Home = createReactClass({
    render: function () {
        return (
            <div>
                <Intro />
                <Col smOffset={1} sm={10}>
                    <Tabs defaultActiveKey={1} id="tab-algos">
                        <Tab eventKey={1} title="Basic Algorithms">
                            <ListGroup>
                                <Col sm={6} md={4}>
                                    <ListGroupItem>
                                        <Link to="/sort">Basic Sorting Algorithms</Link>
                                    </ListGroupItem>
                                </Col>
                                <Col sm={6} md={4}>
                                    <ListGroupItem>
                                        <Link to="/">
                                            Basic Structures
                                    </Link>
                                    </ListGroupItem>
                                </Col>
                                <Col sm={6} md={4}>
                                    <ListGroupItem>
                                        <Link to="/">Advanced Sorting Algorithms</Link>
                                    </ListGroupItem>
                                </Col>
                            </ListGroup>
                        </Tab>
                        <Tab eventKey={2} title="Advanced Algorithms">
                            <ListGroup>
                                <Col sm={6} md={4}>
                                    <ListGroupItem>
                                        <Link to="/">Hash Table</Link>
                                    </ListGroupItem>
                                </Col>
                                <Col sm={6} md={4}>
                                    <ListGroupItem>
                                        <Link to="/">Binary Search Tree</Link>
                                    </ListGroupItem>
                                </Col>
                                <Col sm={6} md={4}>
                                    <ListGroupItem>
                                        <Link to="/">Graph Travelsal Algorithms</Link>
                                    </ListGroupItem>
                                </Col>
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </Col>
            </div>
        )
    }
});

module.exports = Home;