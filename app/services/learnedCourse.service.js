export const learnedCourseService = {
    getLearnedCourses,
};

var axios = require('axios');

function getLearnedCourses(userUID) {
    let url = 'http://localhost:6969/learned/' + userUID;
    return axios.get(url)
    .then(function(response) {
        if (response.data.length === 0) {
            throw new Error('No learned course');
        } else {
            return response.data;
        }
    }, function(error) {
        throw new Error('Something went wrong');
    })
}