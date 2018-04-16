import React from 'react';
import { connect } from 'react-redux';

var { Link, IndexLink } = require('react-router-dom');

var { Navbar, Nav, NavItem, FormGroup, FormControl, Button, NavDropdown, MenuItem } = require('react-bootstrap');

import AuthModal from './AuthModal';
const appTokenKey = "appToken";

import { logout } from '../actions/googleAuthActions';

class AppNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogin() {
        this.setState({
            show: true
        })
    }

    handleLogout() {
        this.props.logout();
        this.setState({
            show: false
        })
        // this.props.googleAuthActions.logout();
    }

    // componentWillReceiveProps() {
    //     console.log('xxx');
    //     var {googleAuth} = this.props;
    //     console.log(googleAuth.loggedIn);
    //     if (googleAuth.loggedIn) {
    //         this.setState({
    //             show: false
    //         })
    //     }
    // }

    render() {
        let { show } = this.state;
        var { googleAuth } = this.props;

        return (
            <div>
                <Navbar fluid inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {/* <Link to="/"> */}
                            Algorithms Visualizer
                            {/* </Link> */}
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
                                <NavDropdown title={googleAuth.user.displayName} id="nav-dropdown">
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
                                </NavDropdown>
                            </Nav>}
                        {!googleAuth.loggedIn &&
                            <Nav pullRight>
                                <NavItem onClick={this.handleLogin}>
                                    Log in
                            </NavItem>
                                <NavItem>
                                    Sign up
                            </NavItem>
                            </Nav>}
                    </Navbar.Collapse>
                </Navbar>
                <AuthModal show={show && !googleAuth.loggedIn} />
            </div>
        );
    }
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
}),
    {
        logout
    })(AppNav));