import { apiConstants } from '../constants';

export const learnedCourseService = {
    getLearnedCourses,
    updateLearnCourse
};

var axios = require('axios');

function getLearnedCourses(userUID) {
    var url = apiConstants.URL + 'learned/';
    url += userUID;
    return axios.get(url)
        .then(function (response) {
            if (response.data.length === 0) {
                throw new Error('No learned course');
            } else {
                return response.data;
            }
        }, function (error) {
            throw new Error('Something went wrong');
        })
}

function updateLearnCourse(learnedCourse) {
    var url = apiConstants.URL + 'learned/';

    return axios.post(url)
        .then(function (response) {
            if (response.data.length === 0) {
                throw new Error('No learned course');
            } else {
                return response.data;
            }
        }, function (error) {
            throw new Error('Something went wrong');
        })
}