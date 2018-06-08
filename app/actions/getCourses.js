import { courseConstants } from '../constants';

import { courseService } from '../services';

require('babel-polyfill');

const request = () => ({ type: courseConstants.REQUEST });
const success = payload => ({ type: courseConstants.SUCCESS, payload });
const failure = error => ({ type: courseConstants.ERROR, error });

export function getAll() {
    return async dispatch => {
        dispatch(request());
        courseService.getAll()
            .then(function(data) {
                dispatch(success(data));
            }, function(error) {
                dispatch(failure(error));
            });
    };
}

const requestUID = () => ({ type: courseConstants.COURSE_BYUID_REQUEST });
const successUID = payload => ({ type: courseConstants.COURSE_BYUID_SUCCESS, payload });
const failureUID = error => ({ type: courseConstants.COURSE_BYUID_ERROR, error });

export function getByUID(uid) {
    return async dispatch => {
        dispatch(requestUID());
        courseService.getByUID(uid)
            .then(function(data) {
                dispatch(successUID(data));
            }, function(error) {
                dispatch(failureUID(error));
            });
    }
}

