import React from 'react';

import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';

class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {message} = this.props;
        return (
            <div className="container">
                <Jumbotron>
                    <h1>SORRY</h1>
                    <p>
                        {message}
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
}))(ErrorPage));
