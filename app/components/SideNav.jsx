var React = require('react');
var createReactClass = require('create-react-class');

var { ListGroup, ListGroupItem } = require('react-bootstrap');

var SideNav = createReactClass({
    render: function () {
        var { title, contents } = this.props;

        var renderContents = () => {

            var result = [];

            for (var content in contents) {
                result.push(renderContent(contents[content]));
            }

            return result;
        }

        var renderContent = (item) => {
            var link = "#" + item.name.replace(/ /g, '-');
            return (
                <ListGroupItem key={item.uid}>
                    <a href={link}>{item.name}</a>
                </ListGroupItem>
            )
        }

        return (
            <div className="sideNav">
                <h4>{title}</h4>
                <ListGroup>
                    {renderContents()}
                </ListGroup>
            </div>
        )
    }
});

module.exports = SideNav;