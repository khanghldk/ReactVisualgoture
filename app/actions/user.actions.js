import { userConstants } from '../constants';
import { userService } from '../services';

require('babel-polyfill');

const request = () => ({ type: userConstants.LOAD_USERS_REQUEST });
const success = payload => ({ type: userConstants.LOAD_USERS_SUCESS, payload });
const failure = error => ({ type: userConstants.LOAD_USERS_FAILURE, error });

export function getAllUsers() {
    return async dispatch => {
        dispatch(request());
        userService.getAllUsers()
            .then(function(data) {
                dispatch(success(data));
            }, function(error) {
                dispatch(failure(error));
            });
    };
}

