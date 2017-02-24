/**
 * Created by root on 16-9-29.
 */
import * as types from '../constants/actionTypes';
const current = {Id: -1, Name: 'My Current Location', Lat: 0, Lon: 0};
const initialState = {
    origin: current,
    destination: current,
    locationList: [],
    wayPoints: [],
    locationsCanChoose: [],
    showFAC: false,
    loading: false,
};
export default function onServiceRoutePlanner(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROUTE_PLANNER_INIT :
            return Object.assign({}, state);
        case types.ROUTE_PLANNER_SELECT_ORIGIN :
            return Object.assign({}, state,
                {
                    origin: action.origin,
                    locationsCanChoose: action.locationsCanChoose,
                    wayPoints: action.wayPoints,
                    showFAC: action.showFAC
                });
        case types.ROUTE_PLANNER_SELECT_DESTINATION :
            return Object.assign({}, state,
                {
                    destination: action.destination,
                    locationsCanChoose: action.locationsCanChoose,
                    wayPoints: action.wayPoints,
                    showFAC: action.showFAC
                });
        case types.ROUTE_PLANNER_SELECT_WAYPOINT :
            return Object.assign({}, state, {wayPoints: action.wayPoints, showFAC: action.showFAC});
        case types.LOCATION_LIST_LOADING:
            return Object.assign({}, state, {loading: true});
        case types.LOCATION_LIST_LOADED:
            return Object.assign({}, state, {loading: false, locationList: action.locationList});
        default:
            return state;
    }
}