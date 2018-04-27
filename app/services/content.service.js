import {apiConstants} from '../constants';

export const contentService = {
    getContentsBySubLessonUID,
};

var axios = require('axios');

function getContentsBySubLessonUID(subLessonUID) {
    var url = apiConstants.URL + 'content/'
    url += subLessonUID;
    return axios.get(url)
    .then(function(response) {
        if (response.data.length === 0) {
            throw new Error('Not found');
        } else {
            return response.data;
        }
    }, function(error) {
        throw new Error('Something went wrong');
    })
}