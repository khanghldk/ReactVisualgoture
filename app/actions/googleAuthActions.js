import { userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';

import { firebaseAuth, googleProvider } from '../database/config';

import { userService } from '../services';

require('babel-polyfill');

const loginRequest = () => ({ type: userConstants.LOGIN_GOOGLE_REQUEST });
const loginSuccess = payload => ({ type: userConstants.LOGIN_GOOGLE_SUCCESS, payload });
const loginFailure = error => ({ type: userConstants.LOGIN_GOOGLE_FAILURE, error });

const signupRequest = () => ({ type: userConstants.SIGNUP_GOOGLE_REQUEST });
const signupSuccess = payload => ({ type: userConstants.SIGNUP_GOOGLE_SUCCESS, payload });
const signupFailure = error => ({ type: userConstants.SIGNUP_GOOGLE_FAILURE, error });

export function login() {
    return async dispatch => {
        // dispatch(loginRequest());
        try {
            const result = await firebaseAuth().signInWithPopup(googleProvider);

            let account = {
                "email": result.user.email,
                "password": null,
                "googleUID": result.user.uid
            }

            dispatch(loginRequest(account.email));
            userService.login(account.email, account.password, account.googleUID)
                .then(function (data) {
                    if (data.length > 0) {
                        dispatch(loginSuccess(data[0]));
                        history.push('/');
                    } else {
                        dispatch(loginFailure('do not register'));
                        history.push('/');
                    }
                }, function (error) {
                    console.log(error);
                    dispatch(loginFailure(error));
                });

            // dispatch(loginSuccess(result));
        } catch (error) {
            dispatch(loginFailure(error));
        }
    };
}

export function signup() {
    return async dispatch => {
        dispatch(signupRequest());
        try {
            const result = await firebaseAuth().signInWithPopup(googleProvider);

            console.log(result.user.uid);

            let account = {
                "email": result.user.email,
                "password": '',
                "googleUID": result.user.uid
            }

            // dispatch(loginRequest(account.email));
            userService.signup(account.email, account.password, account.googleUID)
                .then(function (data) {
                    if (data.affectedRows > 0) {
                        dispatch(signupSuccess(data[0]));

                        var insertId = data.insertId;

                        let user = {
                            "accountUID": insertId,
                            "displayName": result.user.displayName,
                            "role": "user"
                        }

                        userService.createUser(user.accountUID, user.displayName, user.role)
                            .then(function (data) {
                                if (data.affectedRows > 0) {
                                    userService.login(account.email, account.password, account.googleUID)
                                        .then(function (data) {
                                            if (data.length > 0) {
                                                dispatch(loginSuccess(data[0]));
                                                history.push('/');
                                            } else {
                                                dispatch(loginFailure('do not register'));
                                                history.push('/');
                                            }
                                        }, function (error) {
                                            console.log(error);
                                            dispatch(loginFailure(error));
                                        });
                                } else {
                                    dispatch(loginFailure('something went wrong'));
                                }
                            }, function (error) {
                                console.log(error);
                            })
                        history.push('/');

                    } else {
                        dispatch(signupFailure('account existed'));
                        history.push('/');
                    }
                }, function (error) {
                    console.log(error);
                    dispatch(loginFailure(error));
                });

            // dispatch(loginSuccess(result));
        } catch (error) {
            dispatch(loginFailure(error));
        }
    };
}

export function logout() {
    firebaseAuth().signOut();
    return dispatch => {
        dispatch({ type: userConstants.LOGOUT });
    };
}
