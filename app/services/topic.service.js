export const topicService = {
    getTopicsByCourseUID,
};

var axios = require('axios');

function getTopicsByCourseUID(courseUID) {
    let url = 'http://localhost:6969/topic/' + courseUID;
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