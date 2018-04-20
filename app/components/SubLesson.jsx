import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var SideNavSub = require('SideNavSub');

import { getContentsBySubLessonUID } from '../actions/getContents';

class SubLesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCourse: undefined,
            currentLesson: undefined,
            currentSubLesson: undefined,
            subLessons: [],
            contents: []
        }
    }

    componentWillMount = () => {

        var subName = this.props.match.params.sublesson.replace(/-/g, ' ').toLowerCase();
        var lessonName = this.props.match.params.lesson.replace(/-/g, ' ').toLowerCase();
        var courseName = this.props.match.params.courseName.replace(/-/g, ' ').toLowerCase();

        var courses = this.props.course.courses;
        var currentCourse;
        currentCourse = courses.filter(function (course) {
            if (course.name.toLowerCase() === courseName) {
                return course;
            }
        });
        currentCourse = currentCourse[0];

        var lessons = this.props.lesson.byHashLessons[currentCourse.uid];
        var currentLesson;

        for (var lesson in lessons) {
            if (lessons[lesson].name && lessons[lesson].name.toLowerCase() === lessonName) {
                currentLesson = lessons[lesson];
                break;
            }
        }

        var subLessons = this.props.subLesson.byHashSubLessons[currentLesson.uid];

        var currentSubLesson;

        for (var item in subLessons) {
            if (subLessons[item].name && subLessons[item].name.toLowerCase().includes(subName)) {
                currentSubLesson = subLessons[item];
                break;
            }
        }

        this.setState({
            currentCourse: currentCourse,
            currentLesson: currentLesson,
            currentSubLesson: currentSubLesson,
            subLessons: subLessons
        });

        this.props.getContentsBySubLessonUID(currentSubLesson.uid);

    }

    render() {
        var { content } = this.props;
        var { currentSubLesson, currentLesson, subLessons, currentCourse } = this.state;
        content = content.byHashContents[currentSubLesson.uid];

        var nextSubLesson = null;

        for (var item in subLessons) {
            console.log(subLessons[item].order);
            if (subLessons[item].order - currentSubLesson.order === 1) {
                nextSubLesson = subLessons[item];
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

        var renderNextButton = () => {
            if (nextSubLesson) {
                var path = window.location.pathname;
                var pos = path.lastIndexOf('/');
                path = path.substr(0, pos);
                path = path + '/' + nextSubLesson.name.toLowerCase().replace(/ /g, '-');
                return (
                    <Button bsStyle={{alignSelf: 'flex-end'}}>
                        <Link to={path}>
                            {nextSubLesson.name}
                        </Link>
                    </Button>
                )
            }
        }

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        {currentCourse.name}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{currentLesson.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={3} sm={4} xs={12}>
                        <SideNavSub title={currentLesson.name} contents={subLessons}></SideNavSub>
                    </Col>
                    <Col mdOffset={1} md={7} sm={8} xs={12}>
                        <h3 className="text-center">{currentSubLesson.name}</h3>
                        {renderContents()}
                    </Col>
                </Row>
                <Row>
                    {/* {renderNextButton()} */}
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
    subLesson: state.subLesson,
    content: state.content

}),
    {
        getContentsBySubLessonUID,
    })(SubLesson));