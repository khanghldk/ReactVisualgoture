var React = require('react');
var createReactClass = require('create-react-class');
var { Link, IndexLink } = require('react-router-dom');

var { Navbar, Nav, NavItem, FormGroup, FormControl, Button, NavDropdown, MenuItem } = require('react-bootstrap');

var AuthModal = require('AuthModal');
const appTokenKey = "appToken";

import { logout } from "../actions/auth";

var AppNav = createReactClass({
    getInitialState: function () {
        var userFirebase = localStorage.getItem(appTokenKey);
        if (userFirebase) {
            return {
                show: false,
                status: "login",
                user: userFirebase
            }
        } else {
            return {
                show: false,
                status: "logout",
                user: undefined
            }
        }
    },
    handleLogin: function () {
        this.setState({ show: true });
    },
    handleLogout: function () {
        logout();
        //localStorage.removeItem(appTokenKey);
        this.setState({
            status: "logout",
            user: undefined
        })
    },
    render: function () {
        var { show, status, user } = this.state;
        var renderLoginButton = () => {
            if (status === "login") {
                user = JSON.parse(user);
                return (
                    <Nav pullRight>
                        <NavDropdown title={user.displayName} id="nav-dropdown">
                            <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
                        </NavDropdown>
                    </Nav>
                )

            } else {
                return (
                    <Nav pullRight>
                        <NavItem onClick={this.handleLogin}>
                            Log in
                        </NavItem>
                        <NavItem>
                            Sign up
                        </NavItem>
                    </Nav>
                )
            }
        }

        function renderLogin() {
            if (show) {
                return (
                    <AuthModal show={show} />
                )
            }
        }
        return (
            <div>
                <Navbar fluid inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Algorithms Visualizer</a>
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
                        {renderLoginButton()}
                    </Navbar.Collapse>
                </Navbar>
                {renderLogin()}
            </div>
        );
    }
});

module.exports = AppNav;