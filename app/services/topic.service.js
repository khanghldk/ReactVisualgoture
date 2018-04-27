import {apiConstants} from '../constants';

export const topicService = {
    getTopicsByCourseUID,
};

var axios = require('axios');

function getTopicsByCourseUID(courseUID) {
    var url = apiConstants.URL + 'topic/';
    url += courseUID;
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