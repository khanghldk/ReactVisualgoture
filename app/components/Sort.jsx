var React = require('react');
var createReactClass = require('create-react-class');

var { Breadcrumb, Col, Row } = require('react-bootstrap');
var { Link } = require('react-router-dom');
var SideNav = require('SideNav');

var ExpandedGroup = require('ExpandedGroup');


var Sort = createReactClass({
    getInitialState: function () {
        return {
            title: "CONTENTS",
            contents: [
                "Introduction",
                "Bubble sort and variants",
                "Selection Sort",
                "Insertion Sort"
            ],
            title0: "Introduction",
            data0: [
                "Problems",
                "Ideas",
                "Types",
                "Applications"
            ],
            title1 : "Bubble sort and variants",
            data1: [
                "Idea of Bubble Sort",
                "Pseudo of Bubble Sort",
                "Bubble Sort",
                "Ideas for variants",
                "Shell Sort",
                "Comb Sort"
            ],
            title2: "Selection Sort",
            data2: [
                "Idea of Selection Sort",
                "Pseudo of Selection Sort",
                "Selection Sort Animation"
            ],
            title3: "Insertion Sort",
            data3: [
                "Idea of Insertion Sort",
                "Pseudo of Insertion Sort",
                "Insertion Sort Animation"
            ],
        }
    },
    render: function () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            Basic Algorithms
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Basic Sorting Algorithms</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={2} sm={2}>
                        <SideNav title={this.state.title} contents={this.state.contents}></SideNav>
                    </Col>
                    <Col md={10} sm={10}>
                        <ExpandedGroup title={this.state.title0} data={this.state.data0}>

                        </ExpandedGroup>
                        <ExpandedGroup title={this.state.title1} data={this.state.data1}>

                        </ExpandedGroup>
                        <ExpandedGroup title={this.state.title2} data={this.state.data2}>

                        </ExpandedGroup>
                        <ExpandedGroup title={this.state.title3} data={this.state.data3}>

                        </ExpandedGroup>
                    </Col>
                </Row>

            </div>
        )
    }
});

module.exports = Sort;