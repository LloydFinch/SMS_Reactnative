/**
 * Created by root on 16-9-28.
 */
import * as types from "../constants/actionTypes";
import {ToastAndroid} from "react-native";
const initialState = {
    username: 'empty'
}

export default function onLogin(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {username: action.name});
        default:
            return state;
    }
}