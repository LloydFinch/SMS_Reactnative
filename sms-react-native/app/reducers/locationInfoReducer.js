/**
 * Created by Jiayu.Liu on 2016/10/18.
 */
import {Alert} from "react-native";
import * as types from "../constants/actionTypes";
const initialState = {
    isLoadingg: true,
    data: '',
    listData:[],
    chargerFish:false,
}
export default function onLocationView(state = initialState, action) {
    switch (action.type) {
        case types.LOCATION_INFO_LOADED:
            // Alert.alert("ERROR", "NetError!!" +
            //     action.locationInfo.toString() + ' Location');
            return Object.assign({}, state, {isLoadingg: false, data: action.locationInfo});
        case types.LOCATION_INFO_LOADING:
            // Alert.alert("ERROR", "NetError!!" +
            //     'reducer2' + ' Location');
            return Object.assign({}, state, {isLoadingg: true});
        case types.CHARGER_LIST_LOADED:
            Alert.alert("ffff", "NetError!!" +
                action.listData.toString() + ' Location');
            return Object.assign({},state,{isLoadingg: false, listData:action.listData,chargerFish:true});
        case types.CHARGER_LIST_LOADING:
            Alert.alert("ERROR", "NetError!!" +
                'OKOK' + ' EVSEggg');
            return Object.assign({},state,{isLoadingg: true});

        default:
            return state;
    }

}
