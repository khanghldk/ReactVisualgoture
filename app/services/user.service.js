export const userService = {
    login,
    logout,
};

var axios = require('axios');

function login(email, password, googleUID) {
    var url = 'http://localhost:6969/login'
    return axios.post(url, {
        "email": email,
        "password": password,
        "googleUID": googleUID
    }).then(function (response) {
        if (response.data.length === 0) {
            throw new Error('You have not registered this account yet.');
        } else {
            return response.data;
        }
    }, function (res) {
        throw new Error('Something went wrong');
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}