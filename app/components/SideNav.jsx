var React = require('react');
var createReactClass = require('create-react-class');

var { ListGroup, ListGroupItem } = require('react-bootstrap');

var SideNav = createReactClass({
    render: function () {
        var { title, contents } = this.props;

        var renderContents = () => {

            var result = [];

            contents.map(item => {
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
                <h4>{title}</h4>
                <ListGroup>
                    {renderContents()}
                </ListGroup>
            </div>
        )
    }
});

module.exports = SideNav;