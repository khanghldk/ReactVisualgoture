var React = require('react');
var createReactClass = require('create-react-class');
var { Link, IndexLink } = require('react-router-dom');

var {Navbar, Nav, NavItem, FormGroup, FormControl, Button} = require('react-bootstrap');

var AppNav = createReactClass({
    render: function () {
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
                        <Nav pullRight>
                            <NavItem>
                                Log in
                            </NavItem>
                            <NavItem>
                                Sign up
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
});

module.exports = AppNav;