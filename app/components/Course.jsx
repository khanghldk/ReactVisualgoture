import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var SideNav = require('SideNav');

var ExpandedGroup = require('ExpandedGroup');

import { Redirect } from 'react-router-dom';

import { getLessonsByCourseUID } from '../actions/getLessons';
import { getSubLessonsByLessonUID } from '../actions/getSubLessons';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCourse: undefined,
            lessons: [],
            subLessons: []
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

        this.props.getLessonsByCourseUID(targetCourse.uid);

        this.setState({
            currentCourse: targetCourse,
            lessons: this.props.lesson.byHashLessons[targetCourse.uid]
        });

        var currentLessons = this.props.lesson.byHashLessons[targetCourse.uid];

        for (var lesson in currentLessons) {
            this.props.getSubLessonsByLessonUID(currentLessons[lesson].uid);
        }

        this.setState({
            subLessons: this.props.subLesson.byHashSubLessons
        })

    }

    render() {
        var { currentCourse, lessons, subLessons } = this.state;

        var renderSubLessons = () => {
            var result = [];

            for (var lesson in lessons) {
                result.push(
                    <ExpandedGroup title={lessons[lesson].name} data={subLessons[lessons[lesson].uid]}>

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
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        Basic Algorithms
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{currentCourse.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={3} sm={4} xs={12}>
                        <SideNav title={currentCourse.name} contents={lessons}></SideNav>
                    </Col>
                    <Col mdOffset={1} md={7} sm={8} xs={12}>
                        {renderSubLessons()}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default (connect(state => ({
    course: state.course,
    lesson: state.lesson,
    subLesson: state.subLesson,
    googleAuth: state.googleAuth,
}),
    {
        getLessonsByCourseUID,
        getSubLessonsByLessonUID,
    })(Course));
