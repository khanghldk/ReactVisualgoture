var React = require('react');
var createReactClass = require('create-react-class');

var { ListGroup, ListGroupItem, Button, Col, Row, Button } = require('react-bootstrap');

var { Link } = require('react-router-dom');

var ExpandedGroup = createReactClass({
    getInitialState: function() {
        return {
            open: false
        }
    },
    handleOnClick: function() {
        var x = !this.state.open;
        this.setState({
            open: x
        })
    },
    render: function () {
        var { title, data } = this.props;

        var renderContents = () => {

            var result = [];

            data.map(item => {
                result.push(renderContent(item));
            });

            return result;
        }

        var renderContent = (item) => {
            return (
                <ListGroupItem>{item}</ListGroupItem>
            )
        }
        var link = title.replace(/ /g,'');
        var pathName = window.location.pathname + "/" + link;

        console.log(pathName);

        return (
            <div>
                <Row>
                    <Col md={9} xs={9}>
                        <a onClick={this.handleOnClick} className="groupControl" name={link}>{title}</a>
                    </Col>
                    <Col md={3} xs={3}>
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