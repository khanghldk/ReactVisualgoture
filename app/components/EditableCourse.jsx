import React from 'react';

import { connect } from 'react-redux';

import { Switch, Select, MenuItem } from '@material-ui/core';

import { getByUID } from '../actions/getCourses';

import { Row, Col } from 'react-bootstrap';

import RichTextEditor from 'react-rte';

class EditableCourse extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const uid = this.props.match.params.uid;
        this.props.getByUID(uid);
        this.setState({
            course: this.props.courseByUID.course
        });
        var course = this.props.courseByUID.course;
        if (course.isPublished === 1) {
            this.setState({
                isPublished: true
            })
        } else {
            this.setState({
                isPublished: false
            })
        }
        this.setState({
            value: RichTextEditor.createValueFromString(course.description, 'html')
        })
    }

    handleChange = (name) => (e) => {
        var course = this.state.course;
        const checked = e.target.checked;
        if (checked) {
            course.isPublished = 1;
            this.setState({
                isPublished: true,
                course: course
            })
        } else {
            course.isPublished = 0;
            this.setState({
                isPublished: false,
                course: course
            })
        }
    }

    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    };

    handleChangeDiff = event => {
        var course = this.state.course;
        course.difficulty = event.target.value;
        this.setState({
            course: course
        })
    };

    render() {
        var course = this.state.course;
        return (
            <div>
                <h1>{course.name}</h1>
                <Row>
                    Published
                    <Switch
                        checked={this.state.isPublished}
                        onChange={this.handleChange('checkP')}
                        value="checkP"
                    />
                    Difficulty
                    <Select
                        value={ this.state.course.difficulty}
                        onChange={this.handleChangeDiff}
                    >
                        <MenuItem value='basic'>Basic</MenuItem>
                        <MenuItem value='advanced'>Advanced</MenuItem>
                    </Select>
                </Row>
                <Row>
                    Description
                    <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                </Row>

            </div>
        )
    }
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
    courseByUID: state.courseByUID
}), {
        getByUID,
    })(EditableCourse));
