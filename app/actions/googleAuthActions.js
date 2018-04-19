import { userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';

import { firebaseAuth, googleProvider } from '../database/config';

import { userService } from '../services';

require('babel-polyfill');

const loginRequest = () => ({ type: userConstants.LOGIN_GOOGLE_REQUEST });
const loginSuccess = payload => ({ type: userConstants.LOGIN_GOOGLE_SUCCESS, payload });
const loginFailure = error => ({ type: userConstants.LOGIN_GOOGLE_FAILURE, error });

export function login() {
    return async dispatch => {
        dispatch(loginRequest());
        try {
            const result = await firebaseAuth().signInWithPopup(googleProvider);

            console.log(result.user.uid);

            let account = {
                "email": result.user.email,
                "password": '',
                "googleUID": result.user.uid 
            }

            dispatch(loginRequest(account.email));
            userService.login(account.email, account.password, account.googleUID)
                .then(function (data) {
                    console.log(data);
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

export function logout() {
    firebaseAuth().signOut();
    return dispatch => {
        dispatch({ type: userConstants.LOGOUT });
    };
}
