/**
 * Created by root on 16-9-28.
 */
import * as types from '../constants/actionTypes';

export function login(json) {
    return {type: types.LOGIN, json};
}