/**
 * Created by Jiayu.Liu on 2016/10/18.
 */

import {Alert} from 'react-native';
import * as types from '../constants/actionTypes';
import API from '../api/API';
let chargerData = [];
let i = 0;
let listData = [];

function chargerLoading() {

    return {
        type: types.CHARGER_LIST_LOADING,
    }
}

function chargerLoaded(result) {
    Alert.alert("ERRORchargerLoade", "NetError!!" +
        result.toString() + ' EVSEggg');
    return Object.assign({}, {type: types.CHARGER_LIST_LOADED,}, result);


}
function locationLoading() {
    return {
        type: types.LOCATION_INFO_LOADING,
    }
}
function locationLoaded(result) {
    return Object.assign({}, {type: types.LOCATION_INFO_LOADED,}, result);
}
export function getLocation(netId) {
    return dispatch => {
        dispatch(locationLoading())
        let locationInfo = {};
       // Alert.alert('netID',netId)
        fetch(API.LOCATION_INFO_URL + netId).then((response)=> {
            //Alert.alert('result', JSON.stringify(response));
            return response.json()
        }).then((json)=> {
            locationInfo = {
                Name: json.Name,
                Lat: json.Lat,
                Lon: json.Lon,
                Address1: json.Address1,
                Address2: json.Address2,
                City: json.City,
                State: json.State,
                Country: json.Country,
                Phone: json.Phone,
                Note: json.Note,
                Mail: json.Mail,
                Mobile: json.Mobile,
                Image: json.Image
            };
            // Alert.alert("ERROR", "NetError!!" +
            //     'SUccess' + ' Location');
            dispatch(locationLoaded({locationInfo: locationInfo}));


        }).catch((error)=> {
            dispatch(locationLoaded({locationInfo: locationInfo}));
            // Alert.alert("ERROR", "NetError!!" +
            //     error.toString() + ' Location');
        });
    }
}

export function getCharger(netId) {
    return dispatch=> {
        dispatch(chargerLoading());


        fetch(API.CHARGER_LIST_URL + netId).then((response)=> {

            return response.json()
        }).then((json)=> {
            //  let chargerlist = json.Result;
            // let tatal = json.Total;
            var concat = chargerData.concat(json.Result);
            chargerData = concat;


            getEVSE(chargerData, dispatch);

        }).catch((error)=> {
            Alert.alert("ERROR", "NetError!!!" +
                error.toString() + ' Charger');
        })
    }
}

function getEVSE(chargerData, dispatch) {

    //dispatch(chargerLoaded({listData: []}));

    if (true) {
        let id = chargerData[i].Id;
        //let chargerData = chargerData;
        fetch(API.EVSE_LIST_URL + id).then((response)=> {

            return response.json()
        }).then((json)=> {


            let evselist = json.Evse;
            let evseData = json;
            let data = new Array();
            var concat = data.concat(json.Evse);
            data = concat;

            listData.push({itemData: Object.assign({charger: chargerData[i], evse: data})});
            i++;
            let bool = i < (chargerData.length) - 1;


            if (bool) {
                getEVSE(chargerData, dispatch);

            } else {

                dispatch(chargerLoaded({listData: listData}))

            }

        }).catch((error)=> {
            i++;
            return chargerLoaded({listData: []});
            Alert.alert("ERROR", "NetError!!" +
                error.toString() + ' EVSE');
        })
    } else {
        return chargerLoaded({listData: []});
    }
}
