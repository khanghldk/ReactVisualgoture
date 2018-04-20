var React = require('react');
var createReactClass = require('create-react-class');

var { ListGroup, ListGroupItem } = require('react-bootstrap');

var SideNavSub = createReactClass({
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
            var path = window.location.pathname;
            var pos = path.lastIndexOf('/');
            path = path.substr(0, pos);
            var link = path + "/" + item.name.replace(/ /g, '-');
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

module.exports = SideNavSub;