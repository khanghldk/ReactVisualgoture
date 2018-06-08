import React from 'react';

import { connect } from 'react-redux';
import { Col, Row, Table, Button } from 'react-bootstrap';

import { getAllUsers } from '../actions/user.actions';

import Selector from './Selector';

class Usermanagement extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAllUsers();
    }

    change(e) {
        e.preventDefault();
        console.log(e);
    }

    render() {
        var { users } = this.props.user;

        var renderUser = users.map(function (user, index) {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.displayName}</td>
                    <td>
                        <Selector value={user.role} />
                    </td>
                    <td>
                        <Button bsStyle='primary' bsSize='small'>Save</Button>
                    </td>
                </tr>
                // <div author={el.voice}>
                //     {el.file}
                //     <button onClick={this.props.handleClickPlay}>Play</button>
                // </div>
            );
        }, this);

        return (
            <div>
                <h1 className='text-center'>USER MANAGEMENT</h1>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Display Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUser}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
    user: state.user
}), {
        getAllUsers
    })(Usermanagement));
