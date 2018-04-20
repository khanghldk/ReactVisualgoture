import { contentConstants } from '../constants';
import { history } from '../helpers';

import { contentService } from '../services';

require('babel-polyfill');

const request = subLessonUID => ({ type: contentConstants.REQUEST, subLessonUID });
const success = (subLessonUID, payload) => ({ type: contentConstants.SUCCESS, subLessonUID, payload });
const failure = (subLessonUID, error) => ({ type: contentConstants.ERROR, subLessonUID, error });

export function getContentsBySubLessonUID(subLessonUID) {
    return async dispatch => {
        dispatch(request(subLessonUID));
        contentService.getContentsBySubLessonUID(subLessonUID)
            .then(function(data) {
                dispatch(success(subLessonUID, data));
            }, function(error) {
                dispatch(failure(subLessonUID, error));
            });
    };
}

