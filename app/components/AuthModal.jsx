var React = require('react');
var createReactClass = require('create-react-class');

var { Popover, Tooltip, Button, Modal, OverlayTrigger, Label, Form, FormGroup, FormControl, Col, ControlLabel } = require('react-bootstrap');

import { loginWithGoogle } from "../actions/auth";
import { firebaseAuth } from "../database/config";
import { Redirect } from 'react-router-dom';

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

var AuthModal = createReactClass({
    getInitialState: function () {
        return {
            show: true,
            type: "login",
            email: "",
            password: "",
            passwordConfirm: ""
        }
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            show: newProps.show
        })
    },
    handleClose: function () {
        this.setState({
            show: false,
            type: "login"
        });
    },
    handleType: function () {
        var { type } = this.state;
        if (type === "login") {
            this.setState({
                type: "create"
            })
        } else {
            this.setState({
                type: "login"
            })
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var { type, email, password, passwordConfirm } = this.state;

        email = this.email.value;
        password = this.password.value;

        if (type === "login") {

        } else {
            passwordConfirm = this.passwordConfirm.value;
        }
    },
    handleGoogleLogin: function () {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    },
    componentWillMount: function () {
        var user = firebaseAuth().currentUser;

        if (user) {
            localStorage.removeItem(firebaseAuthKey);
            localStorage.setItem(appTokenKey, JSON.stringify(user));
            <Redirect to="/" />
        }
    },
    render: function () {
        var { show, type } = this.state;

        var renderModal = () => {
            if (type === "login") {
                return (
                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> Log in </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button
                                            bsStyle="danger"
                                            bsSize="large"
                                            block
                                            onClick={this.handleGoogleLogin}>
                                            Continue with Google
                                        </Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col smOffset={1} sm={10}>
                                        <ControlLabel>
                                            Email
                                    </ControlLabel>
                                        <FormControl
                                            type="email"
                                            placeholder="Email"
                                            inputRef={ref => { this.email = ref; }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col smOffset={1} sm={10}>
                                        <ControlLabel>
                                            Password
                                    </ControlLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Password"
                                            inputRef={ref => { this.password = ref; }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button bsStyle="info" bsSize="large" block type="submit">Log in</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button bsStyle="link" bsSize="large" block onClick={this.handleType}>
                                            Create an account
                                    </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                    </Modal>
                )
            } else {
                return (
                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> Sign up </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button bsStyle="danger" bsSize="large" block>Continue with Google</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col smOffset={1} sm={10}>
                                        <ControlLabel>
                                            Email
                                    </ControlLabel>
                                        <FormControl
                                            type="email"
                                            placeholder="Email"
                                            inputRef={ref => { this.email = ref; }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col smOffset={1} sm={10}>
                                        <ControlLabel>
                                            Password
                                    </ControlLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Password"
                                            inputRef={ref => { this.password = ref; }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPasswordConfirm">
                                    <Col smOffset={1} sm={10}>
                                        <ControlLabel>
                                            Confirm Password
                                    </ControlLabel>
                                        <FormControl
                                            type="passwordConfirm"
                                            placeholder="Confirm Password"
                                            inputRef={ref => { this.passwordConfirm = ref; }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button bsStyle="info" bsSize="large" block type="submit">Sign up</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button bsStyle="link" bsSize="large" block onClick={this.handleType}>
                                            Already have an account?
                                    </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                    </Modal>
                )
            }
        }

        return (
            <div>
                {renderModal()}
            </div>
        );
    }
});

module.exports = AuthModal;