export const contentService = {
    getContentsBySubLessonUID,
};

var axios = require('axios');

function getContentsBySubLessonUID(subLessonUID) {
    let url = 'http://localhost:6969/content/' + subLessonUID;
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