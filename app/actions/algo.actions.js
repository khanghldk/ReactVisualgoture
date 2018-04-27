import { algoConstants } from '../constants';
import { algoService } from '../services';

require('babel-polyfill');

const request = () => ({ type: algoConstants.REQUEST });
const success = payload => ({ type: algoConstants.SUCCESS, payload });
const failure = error => ({ type: algoConstants.ERROR, error });

export function getAlgorithm(uid) {
    return async dispatch => {
        dispatch(request());
        algoService.getAlgorithm(uid)
            .then(function(data) {
                dispatch(success(data));
            }, function(error) {
                dispatch(failure(error));
            });
    };
}

