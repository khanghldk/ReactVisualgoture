import {apiConstants} from '../constants';

export const lessonService = {
    getLessonsByTopicUID,
};

var axios = require('axios');

function getLessonsByTopicUID(TopicUID) {
    var url = apiConstants.URL + 'lesson/'
    url += TopicUID;
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