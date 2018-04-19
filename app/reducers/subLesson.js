import { subLessonConstants } from '../constants';

const INITIAL_STATE = {
    byLessonID: ['0'],
    byHashSubLessons: {
        '0': { lessonUID: '0', subLessons: [] }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case subLessonConstants.REQUEST:
            if (!state.byLessonID.includes(action.lessonUID)) {
                return {
                    byLessonID: [...state.byLessonID, action.lessonUID],
                    byHashSubLessons: {
                        ...state.byHashSubLessons,
                        [action.lessonUID]: []
                    }
                }
            } else {
                return state;
            }
        case subLessonConstants.SUCCESS:
            state.byHashSubLessons[action.lessonUID] = {
                ...state.byHashSubLessons[action.lessonUID],
                ...action.payload
            }
            return {
                ...state
            };
        case subLessonConstants.ERROR:
            return state;
        case subLessonConstants.CLEAR:
            return {};
        default:
            return state
    }
};