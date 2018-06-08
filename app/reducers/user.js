import { userConstants } from '../constants';

const INITIAL_STATE = {
    users: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            };
        case userConstants.LOAD_USERS_FAILURE:
            return INITIAL_STATE;
        case userConstants.USERS_CLEAR:
            return INITIAL_STATE;
        case userConstants.LOAD_USERS_REQUEST:
            return INITIAL_STATE;
        default:
            return state;
    }
};