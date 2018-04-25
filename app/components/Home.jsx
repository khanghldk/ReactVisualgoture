import React from 'react';
import { connect } from 'react-redux';

var { Link, IndexLink } = require('react-router-dom');

var { Tab, Tabs, Col, Row, ListGroup, ListGroupItem, Button } = require('react-bootstrap');

var Intro = require('Intro');

import { getAll } from '../actions/getCourses';
import { getLearnedCourses } from '../actions/getLearnedCourse';

import { Devider } from 'material-ui'


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        var { uid } = this.props.googleAuth;
        this.props.getAll();
        this.props.getLearnedCourses(uid);
    }

    render() {

        let courses = this.props.course.courses;
        let learnedCourses = this.props.learnedCourse.learnedCourses;

        var getCourse = (courseUID) => {
            for (var i = 0; i < courses.length; i++) {
                if (courses[i].uid === courseUID) {
                    return courses[i];
                }
            }
            return null;
        }

        var renderLearnedCourses = () => {
            if (learnedCourses.length > 0) {
                return (
                    <Row>
                        <Col md={10} mdOffset={1} xsOffset={1}>
                            <h3>Resume Learning</h3>
                            <ListGroup>
                                {learnedCourses.map(item => {
                                    var courseItem = getCourse(item.courseUID);
                                    var link;

                                    if (courseItem.difficulty === 'Basic') {
                                        link = '/basic-course/' + courseItem.name.toLowerCase().replace(/ /g, '-');
                                    } else {
                                        link = '/advanced-course/' + courseItem.name.toLowerCase().replace(/ /g, '-');
                                    }

                                    return (
                                        <Col sm={6} md={6} key={item.uid}>
                                            <ListGroupItem bsStyle="success">
                                                <Col mdOffset={1} xsOffset={1}>
                                                    <h3>
                                                        <Link to={link}>{courseItem.name}</Link>
                                                    </h3>
                                                    <Row>

                                                        {courseItem.description}

                                                    </Row>
                                                    <Row>
                                                        <Button bsStyle="primary"> Resume </Button>
                                                    </Row>
                                                </Col>
                                            </ListGroupItem>
                                        </Col>
                                    )
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                )
            }
        }

        var checkLearnedCourse = (courseUID) => {
            for (var i = 0; i < learnedCourses.length; i++) {
                if (learnedCourses[i].courseUID === courseUID) {
                    return true;
                }
            }
            return false;
        }

        var renderBasicCourses = () => {
            return (
                <Row>
                    <Col md={10} mdOffset={1} xsOffset={1}>
                        <h3>Basic Courses</h3>
                        <ListGroup>
                            {courses.map(item => {
                                var ok = checkLearnedCourse(item.uid);
                                if (!ok) {
                                    if (item.difficulty === 'Basic') {
                                        var link = '/basic-course/' + item.name.toLowerCase().replace(/ /g, '-');
                                        return (
                                            <Col sm={6} md={6} key={item.uid}>
                                                <ListGroupItem bsStyle={(item.price === 0) ? "success" : "danger"}>
                                                    <h3>
                                                        <Link to={link}>{item.name}</Link>
                                                    </h3>
                                                    <Row>
                                                        <Col mdOffset={1} xsOffset={1}>
                                                            {item.description}
                                                        </Col>
                                                    </Row>
                                                    {(item.price > 0) &&
                                                        <Row>
                                                            <Col mdOffset={1} xsOffset={1}>
                                                                {item.price}{item.currency}
                                                            </Col>
                                                        </Row>
                                                    }
                                                </ListGroupItem>
                                            </Col>
                                        )
                                    }
                                }
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            )
        }

        var renderAdvancedCourses = () => {
            return (
                <Row>
                    <Col md={10} mdOffset={1} xsOffset={1}>
                        <h3>Advanced Courses</h3>
                        <ListGroup>
                            {courses.map(item => {
                                var ok = checkLearnedCourse(item.uid);
                                if (!ok) {
                                    if (item.difficulty === 'Advanced') {
                                        var link = '/advanced-course/' + item.name.toLowerCase().replace(/ /g, '-');

                                        return (
                                            <Col sm={6} md={6} key={item.uid}>
                                                <ListGroupItem bsStyle={(item.price === 0) ? "success" : "danger"}>
                                                    <h3>
                                                        <Link to={link}>{item.name}</Link>
                                                    </h3>
                                                    <Row>
                                                        <Col mdOffset={1} xsOffset={1}>
                                                            {item.description}
                                                        </Col>
                                                    </Row>
                                                    {(item.price > 0) &&
                                                        <Row>
                                                            <Col mdOffset={1} xsOffset={1}>
                                                                {item.price}{item.currency}
                                                            </Col>
                                                        </Row>
                                                    }
                                                </ListGroupItem>
                                            </Col>
                                        )
                                    }
                                }
                                // <Devider/>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            )
        }

        return (
            <div>
                <Intro />
                {renderLearnedCourses()}
                {renderBasicCourses()}
                {renderAdvancedCourses()}
                {/* <Col smOffset={1} sm={10}>
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
                </Col> */}
            </div>
        );
    }
}

export default (connect(state => ({
    course: state.course,
    googleAuth: state.googleAuth,
    learnedCourse: state.learnedCourse
}),
    {
        getAll,
        getLearnedCourses,
    })(Home));