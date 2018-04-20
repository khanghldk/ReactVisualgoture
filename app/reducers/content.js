import { contentConstants } from '../constants';

const INITIAL_STATE = {
    bySubLessonID: ['0'],
    byHashContents: {
        '0': { subLessonUID: '0', subLessons: [] }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case contentConstants.REQUEST:
            if (!state.bySubLessonID.includes(action.subLessonUID)) {
                return {
                    bySubLessonID: [...state.bySubLessonID, action.subLessonUID],
                    byHashContents: {
                        ...state.byHashContents,
                        [action.subLessonUID]: []
                    }
                }
            } else {
                return state;
            }
        case contentConstants.SUCCESS:
            state.byHashContents[action.subLessonUID] = {
                ...state.byHashContents[action.subLessonUID],
                ...action.payload
            }
            return {
                ...state
            };
        case contentConstants.ERROR:
            return state;
        case contentConstants.CLEAR:
            return {};
        default:
            return state
    }
};