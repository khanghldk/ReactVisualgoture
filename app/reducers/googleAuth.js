import { userConstants } from '../constants';

const INITIAL_STATE = {
    loggedIn: false,
    token: null,
    user: null,
    loading: false,
}

export function googleAuth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.credential.accessToken,
                user: action.payload.user,
                loading: false,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case userConstants.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};