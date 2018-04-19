import { userConstants } from '../constants';

const INITIAL_STATE = {
    loggedIn: false,
    uid: null,
    displayName: null,
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case userConstants.LOGIN_GOOGLE_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                uid: action.payload.uid,
                displayName: action.payload.displayName,
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