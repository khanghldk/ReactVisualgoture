import { subLessonConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';

import { subLessonService } from '../services';

require('babel-polyfill');

const request = lessonUID => ({ type: subLessonConstants.REQUEST, lessonUID });
const success = (lessonUID, payload) => ({ type: subLessonConstants.SUCCESS, lessonUID, payload });
const failure = (lessonUID, error) => ({ type: subLessonConstants.ERROR, lessonUID, error });

export function getSubLessonsByLessonUID(lessonUID) {

    return async dispatch => {
        dispatch(request(lessonUID));
        subLessonService.getSubLessonsByLessonUID(lessonUID)
            .then(function(data) {
                dispatch(success(lessonUID, data));
            }, function(error) {
                dispatch(failure(lessonUID, error));
            });
    };
}

