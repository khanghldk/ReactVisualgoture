import React from 'react';
import { connect } from 'react-redux';

var { Link, IndexLink } = require('react-router-dom');

var { Navbar, Nav, NavItem, FormGroup, FormControl, Button, NavDropdown, MenuItem } = require('react-bootstrap');

import AuthModal from './AuthModal';

import { logout } from '../actions/googleAuthActions';

class AppNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            type: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handler = this.handler.bind(this);
    }
    handleLogin = () => {
        this.setState({
            show: true,
            type: 'login'
        })
    }

    handleLogout() {
        this.props.logout();
        this.setState({
            show: false,
            type: undefined
        })
    }

    handleSignup = () => {
        this.setState({
            show: true,
            type: 'signup'
        })
    }

    handler = (newShow) => {
        this.setState({
            show: newShow,
            type: ''
        })
    }

    render() {
        let { show, type } = this.state;
        var { googleAuth, app } = this.props;

        return (
            <div>
                <Navbar fluid inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">
                                {app.appName}
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search Algorithms" />
                            </FormGroup>{' '}
                            <Button type="submit">Submit</Button>
                        </Navbar.Form>
                        {googleAuth.loggedIn &&
                            <Nav pullRight>
                                <NavDropdown title={googleAuth.displayName} id="nav-dropdown">
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
                                </NavDropdown>
                            </Nav>}
                        {!googleAuth.loggedIn &&
                            <Nav pullRight>
                                <NavItem onClick={this.handleLogin}>
                                    Log in
                            </NavItem>
                                <NavItem onClick={this.handleSignup}>
                                    Sign up
                            </NavItem>
                            </Nav>}
                    </Navbar.Collapse>
                </Navbar>
                <AuthModal show={show && !googleAuth.loggedIn} type={type} handler={this.handler} />
            </div>
        );
    }
}

export default (connect(state => ({
    app: state.app,
    googleAuth: state.googleAuth,
}),
    {
        logout
    })(AppNav));