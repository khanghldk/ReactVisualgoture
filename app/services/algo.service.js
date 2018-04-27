import {apiConstants} from '../constants'

export const algoService = {
    getAlgorithm,
};

var axios = require('axios');

function getAlgorithm(uid) {
    var url = apiConstants + 'algo/'
    url += uid;
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