var React = require('react');
var createReactClass = require('create-react-class');

var Content = createReactClass({
    render: function() {
        var {title, contents} = this.props;

        var renderContents = () => {
            contents.map(content => 
                <p>{content}</p>
            )
        }

        return (
            <div>
                <h4>{title}</h4>
                {renderContents()}
            </div>
        )
    }
});

module.exports = Content;