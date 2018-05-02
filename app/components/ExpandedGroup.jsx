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
                result.push(renderContent(data[content].uid, data[content]));
            }

            return result;
        }

        var renderContent = (num, item) => {
            var name = item.name;
            
            var path = window.location.pathname + '/' + title.replace(/ /g, '-') + '/' + name.replace(/ /g, '-');
            // path = path.replace(/basic-course/g, 'course');
            // path = path.replace(/advanced-course/g, 'course');
            return (
                <ListGroupItem key={num}>
                    <Link to={path}>
                        {name}
                    </Link>
                </ListGroupItem>
            )
        }
        var link = title.replace(/ /g, '-');
        var pathName = window.location.pathname + "/" + link;
        return (
            <div>
                <Row>
                    <Col md={12} xs={12}>
                        <a onClick={this.handleOnClick} className="groupControl" name={link}>{title}</a>
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