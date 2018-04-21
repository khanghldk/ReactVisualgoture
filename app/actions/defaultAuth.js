import { userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';

import { userService } from '../services';

import { firebaseAuth, googleProvider } from '../database/config';

require('babel-polyfill');

const loginRequest = email => ({ type: userConstants.LOGIN_REQUEST });
const loginSuccess = payload => ({ type: userConstants.LOGIN_SUCCESS, payload });
const loginFailure = error => ({ type: userConstants.LOGIN_FAILURE, error });

export function loginDefault(email, password, googleUID) {
    return async dispatch => {
        dispatch(loginRequest());
        userService.login(email, password, googleUID)
            .then(function (data) {
                console.log(data);
                dispatch(loginSuccess(data[0]));
                history.push('/');
            }, function (error) {
                dispatch(loginFailure(error));
            });
    };
}

export function logout() {
    // firebaseAuth().signOut();
    return dispatch => {
        dispatch({ type: userConstants.LOGOUT });
    };
}
