var React = require('react');
var createReactClass = require('create-react-class');

var { Breadcrumb, Col, Row } = require('react-bootstrap');
var { Link } = require('react-router-dom');
var SideNav = require('SideNav');

var Content = require('Content');

import SortAPI from '../api/SortAPI.js'

var SubLesson = createReactClass({
    render: function () {
        var { title, subLessons, currentSubLesson, contents} = this.props;
        var lessonName = this.props.match.params.lesson;

        console.log(lessonName);

        var result = SortAPI.get(lessonName);

        console.log(result);

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        {/* <Link to="/"> */}
                            Basic Algorithms
                        {/* </Link> */}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Basic Sorting Algorithms</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={3} sm={3}>
                        <SideNav title={result.title} contents={result.subLessons}></SideNav>
                    </Col>
                    <Col mdOffset={1} smOffset={1} md={7} sm={7}>
                        <div>To do</div>
                        {/* <Content title={subLessons[currentSubLesson]} contents={contents}>
                            
                        </Content> */}
                    </Col>
                </Row>
            </div>
        )
    }
});

module.exports = SubLesson;