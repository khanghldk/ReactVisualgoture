import React from 'react';

import { connect } from 'react-redux';
import { Tab, Tabs, Col, Row } from 'react-bootstrap';

var ExpandedGroup = require('ExpandedGroup');

import { Redirect } from 'react-router-dom';

import { getTopicsByCourseUID } from '../actions/getTopics';
import { getLessonsByTopicUID } from '../actions/getLessons';

import ErrorUnauthenticated from './ErrorUnauthenticated';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCourse: undefined,
            topics: [],
            lessons: [],
            type: ''
        }
    }

    componentWillMount = () => {
        var courseName = this.props.match.params.courseName;
        var type = this.props.match.params.type;
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
            topics: this.props.topic.byHashTopics[targetCourse.uid],
            type: type
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
        var { currentCourse, topics, lessons, type } = this.state;

        const { googleAuth } = this.props;

        if (!googleAuth.loggedIn) {
            return <ErrorUnauthenticated/>
        }

        const resume = (type === 'resume');

        var { learnedCourse } = this.props;
        learnedCourse = learnedCourse.learnedCourses;
        var currentLearnedCourse;

        for (var i = 0; i < learnedCourse.length; i++) {
            if (currentCourse.uid === learnedCourse[i].courseUID) {
                currentLearnedCourse = learnedCourse[i];
                break;
            }
        }

        var resumeTopic, resumeLesson;

        for (var item in topics) {
            if (topics[item].order === currentLearnedCourse.currentLesson) {
                resumeTopic = topics[item];
                break;
            }
        }

        let l = lessons[resumeTopic.uid];
        for (var item in l) {
            if (l[item].order === currentLearnedCourse.currentSubLesson) {
                resumeLesson = l[item];
            }
        }
        
        var topicName = resumeTopic.name;
        var lessonName = resumeLesson.name;

        topicName = topicName.replace(/ /g, '-');
        lessonName = lessonName.replace(/ /g, '-');

        var path = window.location.pathname;
        path = path.replace(/resume/g, '');

        var resumeLink = path
            + topicName + '/'
            + lessonName;

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

        return (
            <div className="container">
                {resume && <Redirect to={resumeLink} />}
                {!resume &&
                    <div>
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
                }
            </div>
        )
    }
}

export default (connect(state => ({
    course: state.course,
    topic: state.topic,
    lesson: state.lesson,
    googleAuth: state.googleAuth,
    learnedCourse: state.learnedCourse
}),
    {
        getTopicsByCourseUID,
        getLessonsByTopicUID,
    })(Course));
