import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var SideNavSub = require('SideNavSub');

import { getContentsBySubLessonUID } from '../actions/getContents';
import { getLessonsByTopicUID } from '../actions/getLessons';

import { Stepper } from 'material-ui';

import VerticalLinearStepper from './VerticalLinearStepper';

class SubLesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCourse: undefined,
            currentTopic: undefined,
            currentLesson: undefined,
            lessons: [],
            contents: [],
            order: 0,
            total: 0
        }
    }

    componentWillMount = () => {

        var lessonName = this.props.match.params.sublesson.replace(/-/g, ' ').toLowerCase();
        var topicName = this.props.match.params.lesson.replace(/-/g, ' ').toLowerCase();
        var courseName = this.props.match.params.courseName.replace(/-/g, ' ').toLowerCase();

        var courses = this.props.course.courses;
        var currentCourse;
        currentCourse = courses.filter(function (course) {
            if (course.name.toLowerCase() === courseName) {
                return course;
            }
        });
        currentCourse = currentCourse[0];

        var topics = this.props.topic.byHashTopics[currentCourse.uid];
        var currentTopic;

        for (var lesson in topics) {
            if (topics[lesson].name && topics[lesson].name.toLowerCase() === topicName) {
                currentTopic = topics[lesson];
                break;
            }
        }

        var lessons = this.props.lesson.byHashLessons[currentTopic.uid];

        var currentLesson;

        for (var item in lessons) {
            if (lessons[item].name && lessons[item].name.toLowerCase().includes(lessonName)) {
                currentLesson = lessons[item];
                break;
            }
        }

        this.setState({
            currentCourse: currentCourse,
            currentTopic: currentTopic,
            currentLesson: currentLesson,
            lessons: lessons,
            total: Object.keys(lessons).length,
            order: currentLesson.order - 1
        });

        this.props.getContentsBySubLessonUID(currentLesson.uid);

    }

    getNextLesson = () => {
        var { currentLesson, currentTopic, lessons, currentCourse, total, order } = this.state;

        var topics = this.props.topic.byHashTopics[currentCourse.uid];

        for (var item in topics) {
            if (currentTopic.order + 1 === topics[item].order) {
                currentTopic = topics[item];
                break;
            }
        }

        lessons = this.props.lesson.byHashLessons[currentTopic.uid];

        for (var item in lessons) {
            if (lessons[item].order === 1) {
                currentLesson = lessons[item];
                break;
            }
        }

        this.setState({
            currentTopic: currentTopic,
            lessons: lessons,
            currentLesson: currentLesson,
            total: Object.keys(lessons).length,
            order: 0
        });

        this.props.getContentsBySubLessonUID(currentLesson.uid);

    }

    handleNext = (e) => {
        e.preventDefault();

        var { order, total, currentLesson, lessons } = this.state;

        if (order < total - 1) {
            order = order + 1;
            for (var item in lessons) {
                if ((lessons[item].order - 1) === order) {
                    currentLesson = lessons[item];
                    break;
                }
            }
            this.setState({
                currentLesson: currentLesson,
                order: order
            });
        } else {
            this.getNextLesson();
        }
        this.props.getContentsBySubLessonUID(currentLesson.uid);
    }

    handlePrevious = (e) => {
        e.preventDefault();
        var { order, total, currentLesson, lessons } = this.state;
        if (order > 0) {
            order = order - 1;
            for (var item in lessons) {
                if ((lessons[item].order - 1) === order) {
                    currentLesson = lessons[item];
                    break;
                }
            }
        }

        this.props.getContentsBySubLessonUID(currentLesson.uid);

        this.setState({
            currentLesson: currentLesson,
            order: order
        });
    }

    render() {
        var { content } = this.props;
        var { currentLesson, currentTopic, lessons, currentCourse, total, order } = this.state;

        content = content.byHashContents[currentLesson.uid];

        var nextSubLesson = null;

        for (var item in lessons) {
            if (lessons[item].order - currentLesson.order === 1) {
                nextSubLesson = lessons[item];
                break;
            }
        }

        var renderContents = () => {
            var result = [];
            for (var item in content) {
                var textContent = content[item].textContent;
                result.push(
                    <Row className="lead">
                        {textContent.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br /></span>
                        })}
                    </Row>
                )
            }

            return result;
        }

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        {currentCourse.name}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{currentTopic.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={3} sm={4} xs={12}>
                        <VerticalLinearStepper contents={lessons} activeStep={order}></VerticalLinearStepper>
                    </Col>
                    <Col mdOffset={1} md={7} sm={8} xs={12}>
                        <h3 className="text-center">{currentLesson.name}</h3>
                        {renderContents()}
                    </Col>
                </Row>
                <Row>
                    <Button className="pull-left" onClick={this.handlePrevious}>Previous</Button>
                    <Button className="pull-right" onClick={this.handleNext}>Next</Button>
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
    content: state.content
}),
    {
        getContentsBySubLessonUID,
        getLessonsByTopicUID
    })(SubLesson));