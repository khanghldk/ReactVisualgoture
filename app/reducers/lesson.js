import { lessonConstants } from '../constants';

const INITIAL_STATE = {
    byTopicUID: [],
    byHashLessons: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case lessonConstants.REQUEST:
            if (!state.byTopicUID.includes(action.topicUID)) {
                return {
                    byTopicUID: [...state.byTopicUID, action.topicUID],
                    byHashLessons: {
                        ...state.byHashLessons,
                        [action.topicUID]: []
                    }
                }
            } else {
                return state;
            }
        case lessonConstants.SUCCESS:
            state.byHashLessons[action.topicUID] = {
                ...state.byHashLessons[action.topicUID],
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