import React from 'react';

import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';

class ErrorUnauthenticated extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ErrorPage message='You need to login to go to this page!'/>
        )
    }
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
}))(ErrorUnauthenticated));
