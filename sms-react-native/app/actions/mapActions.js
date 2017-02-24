/**
 * Created by root on 16-11-2.
 */
import * as types from '../constants/actionTypes';
import {Alert} from 'react-native';

let mLocations = [];

export function init() {
    mLocations = [];
    return {type: types.MAP_INIT};
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
                //locationList.push({Id: -1, Name: 'My Current Location', Lat: 0, Lon: 0});
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
    return {type: types.MAP_LOADING};
}

function loaded(result) {
    return Object.assign({}, {type: types.MAP_LOADED}, result);
}