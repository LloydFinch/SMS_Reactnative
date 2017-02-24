/**
 * Created by root on 16-9-29.
 */

import * as types from '../constants/actionTypes';
import {Alert} from 'react-native';
const current = {Id: -1, Name: 'My Current Location', Lat: 0, Lon: 0};
let [mOrigin,mDestination] = [current, current];
let mLocations = [];
let mWayPoints = [];

export function init() {
    mLocations = [];
    mWayPoints = [];
    return {type: types.ROUTE_PLANNER_INIT};
}

export function selectOrigin(origin, position) {
    mOrigin = origin;
    let locationsCanChoose = updateListDataSource(mOrigin);
    return Object.assign({}, {
        type: types.ROUTE_PLANNER_SELECT_ORIGIN,
        origin: origin,
        locationsCanChoose: locationsCanChoose
    }, updateWayPoints());
}

export function selectDestination(destination, position) {
    mDestination = destination;
    let locationsCanChoose = updateListDataSource(mOrigin, mDestination);
    return Object.assign({}, {
        type: types.ROUTE_PLANNER_SELECT_DESTINATION,
        destination: destination,
        locationsCanChoose: locationsCanChoose
    }, updateWayPoints());
}

export function selectWayPoints(checked, location) {
    if (checked) {
        if (!mWayPoints.includes(location)) {
            mWayPoints.push(location);
        }
    } else {
        if (mWayPoints.includes(location)) {
            let index = mWayPoints.findIndex((value, index, arr)=>value === location);
            if (index >= 0) {
                mWayPoints.splice(index, 1);
            }
        }
    }
    let showFAC = false;
    if (mWayPoints.length > 0) {
        showFAC = true;
    }
    return {type: types.ROUTE_PLANNER_SELECT_WAYPOINT, wayPoints: mWayPoints, showFAC: showFAC};
}

export function getLocationList(path) {
    return dispatch => {
        dispatch(loading());

        let locationList = [];
        fetch(path).then((response)=> {
                return response.json();
            }
        ).then((json)=> {
            let total = json.Total;
            let results = json.Result;
            if (results) {
                locationList.push({Id: -1, Name: 'My Current Location', Lat: 0, Lon: 0});
                results.map((location)=> {
                    locationList.push(location);
                });
                mLocations = locationList;
                dispatch(loaded({locationList: locationList}));
            }
        }).catch(error=> {
            dispatch(loaded({locationList: locationList}));
            Alert.alert('Error', 'error:' + error);
        });
    }
}

function loading() {
    return {type: types.LOCATION_LIST_LOADING};
}

function loaded(result) {
    return Object.assign({}, {type: types.LOCATION_LIST_LOADED}, result);
}

function updateListDataSource(origin = mOrigin, destination = mDestination) {
    let locationsCanChoose = resetWayPointsList();
    let index = locationsCanChoose.findIndex((value, index, arr)=>(value.Id === origin.Id));
    if (index >= 0) {
        locationsCanChoose.splice(index, 1);
    }
    let index2 = locationsCanChoose.findIndex((value, index, arr)=>(value.Id === destination.Id));
    if (index2 >= 0) {
        locationsCanChoose.splice(index2, 1);
    }
    return locationsCanChoose;
}

function resetWayPointsList() {
    let locationsCanChoose = [];
    mLocations.map((location)=> {
        locationsCanChoose.push(location);
    })
    return locationsCanChoose;
}

function updateWayPoints() {
    let index = mWayPoints.findIndex((value, index, arr)=>(value.Id === mOrigin.Id));
    if (index >= 0) {
        mWayPoints.splice(index, 1);
    }
    let index2 = mWayPoints.findIndex((value, index, arr)=>(value.Id === mDestination.Id));
    if (index2 >= 0) {
        mWayPoints.splice(index2, 1);
    }
    let showFAC = false;
    if (mWayPoints.length > 0) {
        showFAC = true;
    }
    return {wayPoints: mWayPoints, showFAC: showFAC};
}