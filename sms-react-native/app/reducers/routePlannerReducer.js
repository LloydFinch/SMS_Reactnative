/**
 * Created by root on 16-10-21.
 */
import * as types from '../constants/actionTypes';
import {Alert} from 'react-native';

const initialState = {isLoading: false, routeList: []};

export default function onRoutePlanner(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROUTE_INIT:
            return Object.assign({}, state);
        case types.ROUTE_LOADING:
            return Object.assign({}, state, {isLoading: true});
        case types.ROUTE_LOADED:
            return Object.assign({}, state, {isLoading: false}, {...action});
        default:
            return state;
    }
}