var React = require('react');
var createReactClass = require('create-react-class');

var { Breadcrumb, Col, Row } = require('react-bootstrap');
var { Link } = require('react-router-dom');
var SideNav = require('SideNav');

var ExpandedGroup = require('ExpandedGroup');

var Course = createReactClass({
    render: function() {
        var {link, title, lessons, subLessons} = this.props;

        var renderSubLessons = () => {
            var result = [];

            subLessons.map(subLesson => {
                result.push(
                    <ExpandedGroup title={subLesson.title} data={subLesson.data}>

                    </ExpandedGroup>
                );
            });

            return result;
        }

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={link}>
                            Basic Algorithms
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Basic Sorting Algorithms</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={3} sm={3}>
                        <SideNav title={title} contents={lessons}></SideNav>
                    </Col>
                    <Col mdOffset={1} smOffset={1} md={7} sm={7}>
                        {renderSubLessons()}
                    </Col>
                </Row>
            </div>
        )
    }
});

module.exports = Course;