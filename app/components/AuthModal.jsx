import React from 'react';

import { connect } from 'react-redux';

var createReactClass = require('create-react-class');

var { Popover, Tooltip, Button, Modal, OverlayTrigger, Label, Form, FormGroup, FormControl, Col, ControlLabel } = require('react-bootstrap');

import { loginWithGoogle } from "../actions/auth";

import { login } from '../actions/googleAuthActions';

import { loginDefault } from '../actions/defaultAuth';


class AuthModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            type: props.type,
            email: '',
            password: '',
            passwordConfirm: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState({
            show: newProps.show,
            type: newProps.type
        })
    };
    handleClose() {
        this.setState({
            show: false,
            type: 'login'
        });
        this.props.handler(false);
    };
    handleType() {
        var { type } = this.state;
        if (type === 'login') {
            this.setState({
                type: 'signup'
            })
        } else {
            this.setState({
                type: 'login'
            })
        }
    };
    handleSubmit(e) {
        e.preventDefault();
        var { type, email, password, passwordConfirm } = this.state;

        email = this.email.value;
        password = this.password.value;

        if (type === 'login') {

        } else {
            passwordConfirm = this.passwordConfirm.value;
        }
    };
    handleLoginDefault = (e) => {
        e.preventDefault();
        var { email, password } = this.state;
        this.props.loginDefault(email, password, null);
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        var { show, type } = this.state;

        let loginType = (type === 'login');

        return (
            <div>
                {loginType &&
                    <Modal show={this.state.show} onHide={this.handleClose}>
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
                                            onClick={this.props.login}>
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
                                            value = {this.state.email}
                                            onChange = {this.handleEmailChange} />
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
                                            value = {this.state.password}
                                            onChange = {this.handlePasswordChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={1} sm={10}>
                                        <Button bsStyle="info" 
                                                bsSize="large" 
                                                block type="submit"
                                                onClick={this.handleLoginDefault}>
                                            Log in
                                        </Button>
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
                    </Modal>}
                {!loginType &&
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
                    </Modal>}
            </div>
        )
    };
}

export default (connect(state => ({
    googleAuth: state.googleAuth,
}),
    {
        login,
        loginDefault,
    })(AuthModal));