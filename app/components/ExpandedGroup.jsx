var React = require('react');
var createReactClass = require('create-react-class');

var { ListGroup, ListGroupItem, Button, Col, Row, Button } = require('react-bootstrap');

var { Link } = require('react-router-dom');

var ExpandedGroup = createReactClass({
    getInitialState: function () {
        return {
            open: false
        }
    },
    handleOnClick: function () {
        var x = !this.state.open;
        this.setState({
            open: x
        })
    },
    render: function () {
        var { title, data } = this.props;

        var renderContents = () => {

            var result = [];

            for (var content in data) {
                result.push(renderContent(data[content].uid, data[content].name));
            }

            // data.map(item => {
            //     result.push(renderContent(item));
            // });

            return result;
        }

        var renderContent = (num, item) => {
            return (
                <ListGroupItem key={num}>{item}</ListGroupItem>
            )
        }
        var link = title.replace(/ /g, '-');
        var pathName = window.location.pathname + "/" + link;
        return (
            <div>
                <Row>
                    <Col md={10} xs={10}>
                        <a onClick={this.handleOnClick} className="groupControl" name={link}>{title}</a>
                    </Col>
                    <Col md={2} xs={2}>
                        <Button>
                            <Link to={pathName}>
                                Go
                            </Link>
                        </Button>
                    </Col>
                </Row>
                <ListGroup className={"collapse" + (this.state.open ? ' in' : '')}>
                    {renderContents()}
                </ListGroup>
            </div>
        )
    }
});

module.exports = ExpandedGroup;