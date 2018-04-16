import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

import { firebaseAuth, googleProvider } from '../database/config';

require('babel-polyfill');

const loginRequest = () => ({ type: userConstants.LOGIN_REQUEST });
const loginSuccess = payload => ({ type: userConstants.LOGIN_SUCCESS, payload });
const loginFailure = error => ({ type: userConstants.LOGIN_FAILURE, error });

export function login() {
    console.log('login');
    return async dispatch => {
        dispatch(loginRequest());
        try {
            const result = await firebaseAuth().signInWithPopup(googleProvider);
            dispatch(loginSuccess(result));
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
