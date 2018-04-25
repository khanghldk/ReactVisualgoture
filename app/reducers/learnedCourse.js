import { learnedCourseConstants } from '../constants';

const INITIAL_STATE = {
    learnedCourses: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case learnedCourseConstants.SUCCESS:
            return {
                ...state,
                learnedCourses: action.payload
            };
        case learnedCourseConstants.ERROR:
            return INITIAL_STATE;
        case learnedCourseConstants.CLEAR:
            return INITIAL_STATE;
        default:
            return state
    }
};