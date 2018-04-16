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
            var link = "#" + item.replace(/ /g,'');
            return (
                <ListGroupItem>
                    <a href={link}>{item}</a>
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