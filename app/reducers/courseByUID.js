import { courseConstants } from '../constants';

const INITIAL_STATE = {
    course: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case courseConstants.COURSE_BYUID_SUCCESS:
            return {
                course: action.payload[0]
            };
        case courseConstants.COURSE_BYUID_ERROR:
            return INITIAL_STATE;
        case courseConstants.COURSE_BYUID_REQUEST:
            return INITIAL_STATE;
        default:
            return state
    }
};