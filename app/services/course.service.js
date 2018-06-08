import { apiConstants } from '../constants';

export const courseService = {
    getAll,
    getByUID
};

var axios = require('axios');

function getAll() {
    let url = apiConstants.URL + 'course';
    return axios.get(url)
        .then(function (response) {
            if (response.data.length === 0) {
                throw new Error('No course');
            } else {
                return response.data;
            }
        }, function (error) {
            throw new Error('Something went wrong');
        })
}

function getByUID(uid) {
    let url = apiConstants.URL + 'course/' + uid;
    return axios.get(url)
        .then(function (response) {
            if (response.data.length === 0) {
                throw new Error('No course');
            } else {
                return response.data;
            }
        }, function (error) {
            throw new Error('Something went wrong');
        })
}

function getCourseByName(courseName) {
    courseName = courseName.replace(/-/g, ' ');
    return axios.post(url)
        .then(function (response) {
            if (response.data.length === 0) {
                throw new Error('Not found');
            } else {
                return response.data;
            }
        }, function (error) {
            throw new Error('Something went wrong');
        })
}