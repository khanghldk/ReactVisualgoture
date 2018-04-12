var React = require('react');
var createReactClass = require('create-react-class');

var { ListGroup, ListGroupItem, Button } = require('react-bootstrap');

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

        return (
            <div>
                <Button onClick={this.handleOnClick} bsStyle="link" bsSize="large" block>{title}</Button>
                <ListGroup className={"collapse" + (this.state.open ? ' in' : '')}>
                    {renderContents()}
                </ListGroup>
            </div>
        )
    }
});

module.exports = ExpandedGroup;