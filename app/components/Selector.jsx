import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            value: this.props.value
        })
    }

    // change = (e) => {
    //     this.setState({
    //         value: e.target.value
    //     });
    // }

    render() {
        return (
            <div>
                <select value={this.state.value} onChange={this.props.change}>
                    <option value='administrator'>Administrator</option>
                    <option value='staff'>Staff</option>
                    <option value='user'>User</option>
                </select>
            </div>
        )
    }
}

export default (Selector);
