import React from 'react';

import { Route } from 'react-router-dom';

import { history } from '../helpers';

import { connect } from 'react-redux';
import { Tab, Tabs, Breadcrumb, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var SideNav = require('SideNav');

var ExpandedGroup = require('ExpandedGroup');

import { Redirect } from 'react-router-dom';

import { getTopicsByCourseUID } from '../actions/getTopics';
import { getLessonsByTopicUID } from '../actions/getLessons';
import SubLesson from './SubLesson';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCourse: undefined,
            topics: [],
            lessons: []
        }
    }

    componentWillMount = () => {
        var courseName = this.props.match.params.courseName;
        var { course } = this.props;
        course = course.courses;
        courseName = courseName.replace(/-/g, ' ');

        var targetCourse;

        for (var i = 0; i < course.length; i++) {
            if (course[i].name.toLowerCase() === courseName) {
                targetCourse = course[i];
                break;
            }
        }

        this.props.getTopicsByCourseUID(targetCourse.uid);

        this.setState({
            currentCourse: targetCourse,
            topics: this.props.topic.byHashTopics[targetCourse.uid]
        });

        var currentTopics = this.props.topic.byHashTopics[targetCourse.uid];

        for (var topic in currentTopics) {
            this.props.getLessonsByTopicUID(currentTopics[topic].uid);
        }

        this.setState({
            lessons: this.props.lesson.byHashLessons
        })

    }

    render() {
        var { currentCourse, topics, lessons } = this.state;

        var renderLessons = () => {
            var result = [];
            var count = 0;
            for (var topic in topics) {
                count++;
                result.push(
                    <ExpandedGroup 
                        title={topics[topic].name} 
                        data={lessons[topics[topic].uid]}>

                    </ExpandedGroup>
                );
            }

            return result;
        }

        const { googleAuth } = this.props;

        if (!googleAuth.loggedIn) {
            return <Redirect to='/' />
        }

        return (
            <div className="container">
                <Row>
                    <h1 className="text-center">{currentCourse.name}</h1>
                </Row>
                <Row>
                    <Col smOffset={1} sm={10}>
                        <Tabs defaultActiveKey={1} id="tab-course">
                            <Tab eventKey={1} title="Overview">
                                <h6>{currentCourse.description}</h6>
                            </Tab>
                            <Tab eventKey={2} title="Syllabus">
                                {renderLessons()}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default (connect(state => ({
    course: state.course,
    topic: state.topic,
    lesson: state.lesson,
    googleAuth: state.googleAuth,
}),
    {
        getTopicsByCourseUID,
        getLessonsByTopicUID,
    })(Course));
