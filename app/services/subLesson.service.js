export const subLessonService = {
    getSubLessonsByLessonUID,
};

var axios = require('axios');

function getSubLessonsByLessonUID(lessonUID) {
    let url = 'http://localhost:6969/subLesson/' + lessonUID;
    return axios.get(url)
    .then(function(response) {
        console.log(response.data);
        if (response.data.length === 0) {
            throw new Error('Not found');
        } else {
            return response.data;
        }
    }, function(error) {
        throw new Error('Something went wrong');
    })
}