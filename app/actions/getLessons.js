import { lessonConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';

import { lessonService } from '../services';

require('babel-polyfill');

const request = courseUID => ({ type: lessonConstants.REQUEST, courseUID });
const success = (courseUID, payload) => ({ type: lessonConstants.SUCCESS, courseUID, payload });
const failure = (courseUID, error) => ({ type: lessonConstants.ERROR, courseUID, error });

export function getLessonsByCourseUID(courseUID) {
    return async dispatch => {
        dispatch(request(courseUID));
        lessonService.getLessonsByCourseUID(courseUID)
            .then(function(data) {
                dispatch(success(courseUID, data));
            }, function(error) {
                dispatch(failure(courseUID, error));
            });
    };
}

