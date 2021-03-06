import { learnedCourseConstants } from '../constants';
import { learnedCourseService } from '../services';

require('babel-polyfill');

const request = () => ({ type: learnedCourseConstants.REQUEST });
const success = payload => ({ type: learnedCourseConstants.SUCCESS, payload });
const failure = error => ({ type: learnedCourseConstants.ERROR, error });

export function getLearnedCourses(userUID) {
    return async dispatch => {
        dispatch(request());
        learnedCourseService.getLearnedCourses(userUID)
            .then(function(data) {
                dispatch(success(data));
            }, function(error) {
                dispatch(failure(error));
            });
    };
}

export function updateLearnCourse(learnCourse) {
    return async dispatch => {
        dispatch(request());
        learnedCourseService.updateLearnCourse(learnCourse)
            .then(function(data) {
                console.log('successful update learnCourse')
                //dispatch(success(data));
            }, function(error) {
                dispatch(failure(error));
            });
    };
}

