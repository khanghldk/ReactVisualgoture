import React from 'react';
import { connect } from 'react-redux';

var { Link, IndexLink } = require('react-router-dom');

var { Tab, Tabs, Col, ListGroup, ListGroupItem } = require('react-bootstrap');

var Intro = require('Intro');

import { getAll } from '../actions/getCourses';


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.props.getAll();
    }

    render() {

        let courses = this.props.course.courses;
        // let courses = course.courses;
        return (
            <div>
                <Intro />
                <Col smOffset={1} sm={10}>
                    <Tabs defaultActiveKey={1} id="tab-algos">
                        <Tab eventKey={1} title="Basic Algorithms">
                            <ListGroup>
                                {courses.map(item => {
                                    if (item.difficulty === 'Basic') {
                                        var link = '/basic-course/' + item.name.toLowerCase().replace(/ /g, '-');
                                        return (
                                            <Col sm={6} md={4} key={item.uid}>
                                                <ListGroupItem bsStyle={item.isPremium ? "success" : "danger"}>
                                                    <Link to={link}>{item.name}</Link>
                                                </ListGroupItem>
                                            </Col>
                                        )
                                    }
                                })}
                            </ListGroup>
                        </Tab>
                        <Tab eventKey={2} title="Advanced Algorithms">
                            <ListGroup>
                                {courses.map(item => {
                                    if (item.difficulty !== 'Basic') {
                                        var link = '/advanced-course/' + item.name.toLowerCase().replace(/ /g, '-');
                                        return (
                                            <Col sm={6} md={4} key={item.uid}>
                                                <ListGroupItem bsStyle={item.isPremium ? "success" : "danger"}>
                                                    <Link to={link}>{item.name}</Link>
                                                </ListGroupItem>
                                            </Col>
                                        )
                                    }
                                })}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </Col>
            </div>
        );
    }
}

export default (connect(state => ({
    course: state.course
}),
    {
        getAll
    })(Home));