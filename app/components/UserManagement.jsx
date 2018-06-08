import React from 'react';

import { connect } from 'react-redux';
import { Tab, Tabs, Col, Row, Jumbotron } from 'react-bootstrap';

class Usermanagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Jumbotron>
                    <h1>SORRY</h1>
                    <p>
                        The page you are looking for could not be found!
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
}))(Usermanagement));
