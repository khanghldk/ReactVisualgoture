import { topicConstants } from '../constants';
import { topicService } from '../services';

require('babel-polyfill');

const request = courseUID => ({ type: topicConstants.REQUEST, courseUID });
const success = (courseUID, payload) => ({ type: topicConstants.SUCCESS, courseUID, payload });
const failure = (courseUID, error) => ({ type: topicConstants.ERROR, courseUID, error });

export function getTopicsByCourseUID(courseUID) {
    return async dispatch => {
        dispatch(request(courseUID));
        topicService.getTopicsByCourseUID(courseUID)
            .then(function(data) {
                dispatch(success(courseUID, data));
            }, function(error) {
                dispatch(failure(courseUID, error));
            });
    };
}

