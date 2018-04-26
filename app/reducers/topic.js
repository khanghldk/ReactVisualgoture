import { topicConstants } from '../constants';

const INITIAL_STATE = {
    byCourseID: ['0'],
    byHashTopics: {
        '0': { courseUID: '0', topics: [] }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case topicConstants.REQUEST:
            if (!state.byCourseID.includes(action.courseUID)) {
                return {
                    byCourseID: [...state.byCourseID, action.courseUID],
                    byHashTopics: {
                        ...state.byHashTopics,
                        [action.courseUID]: []
                    }
                }
            } else {
                return state;
            }
        case topicConstants.SUCCESS:
            state.byHashTopics[action.courseUID] = {
                ...state.byHashTopics[action.courseUID],
                ...action.payload
            }
            return {
                ...state
            };
        case topicConstants.ERROR:
            return state;
        case topicConstants.CLEAR:
            return {};
        default:
            return state
    }
};