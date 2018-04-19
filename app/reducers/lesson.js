import { lessonConstants } from '../constants';

const INITIAL_STATE = {
    byCourseID: ['0'],
    byHashLessons: {
        '0': { courseUID: '0', lessons: [] }
    }
    // courseUID: -1,
    // lessons: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case lessonConstants.REQUEST:
            if (!state.byCourseID.includes(action.courseUID)) {
                return {
                    byCourseID: [...state.byCourseID, action.courseUID],
                    byHashLessons: {
                        ...state.byHashLessons,
                        [action.courseUID]: []
                    }
                }
            } else {
                return state;
            }
        case lessonConstants.SUCCESS:
            state.byHashLessons[action.courseUID] = {
                ...state.byHashLessons[action.courseUID],
                ...action.payload
            }
            return {
                ...state
            };
        case lessonConstants.ERROR:
            return state;
        case lessonConstants.CLEAR:
            return {};
        default:
            return state
    }
};