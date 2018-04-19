import { courseConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';

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

