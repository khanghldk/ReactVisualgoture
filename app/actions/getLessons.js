import { lessonConstants } from '../constants';
import { lessonService } from '../services';

require('babel-polyfill');

const request = topicUID => ({ type: lessonConstants.REQUEST, topicUID });
const success = (topicUID, payload) => ({ type: lessonConstants.SUCCESS, topicUID, payload });
const failure = (topicUID, error) => ({ type: lessonConstants.ERROR, topicUID, error });

export function getLessonsByTopicUID(topicUID) {

    return async dispatch => {
        dispatch(request(topicUID));
        lessonService.getLessonsByTopicUID(topicUID)
            .then(function(data) {
                dispatch(success(topicUID, data));
            }, function(error) {
                dispatch(failure(topicUID, error));
            });
    };
}

