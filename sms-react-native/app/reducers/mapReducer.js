/**
 * Created by root on 16-11-2.
 */

import * as types from '../constants/actionTypes';
const initialState = {
    locationList: [],
    loading: false,
};

export default function onMap(state = initialState, action = {}) {
    switch (action.type) {
        case types.MAP_INIT:
            return Object.assign({}, state);
        case types.MAP_LOADING:
            return Object.assign({}, state, {loading: true});
        case types.MAP_LOADED:
            return Object.assign({}, state, {loading: false, locationList: action.locationList});
        default:
            return state;
    }
}
