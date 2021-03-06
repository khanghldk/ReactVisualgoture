import { courseConstants } from '../constants';

const INITIAL_STATE = {
    courses: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case courseConstants.SUCCESS:
            return {
                ...state,
                courses: action.payload
            };
        case courseConstants.ERROR:
            return INITIAL_STATE;
        case courseConstants.CLEAR:
            return INITIAL_STATE;
        default:
            return state
    }
};