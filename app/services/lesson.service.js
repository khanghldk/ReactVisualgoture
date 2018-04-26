export const lessonService = {
    getLessonsByTopicUID,
};

var axios = require('axios');

function getLessonsByTopicUID(TopicUID) {
    let url = 'http://localhost:6969/lesson/' + TopicUID;
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