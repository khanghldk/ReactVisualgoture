export const userService = {
    login,
    signup,
    logout,
    createUser,
};

var axios = require('axios');

function login(email, password, googleUID) {
    var url = 'http://localhost:6969/login';
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

function signup(email, password, googleUID) {
    var url = 'http://localhost:6969/signup';
    return axios.post(url, {
        "email": email,
        "password": password,
        "googleUID": googleUID
    }).then(function (response) {
        return response.data;
    }, function (res) {
        throw new Error(res);
    });
}

function createUser(accountUID, displayName, role) {
    var url = 'http://localhost:6969/create';
    return axios.post(url, {
        "accountUID": accountUID,
        "displayName": displayName,
        "role": role
    }).then(function (response) {
        return response.data;
    }, function (res) {
        throw new Error(res);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}