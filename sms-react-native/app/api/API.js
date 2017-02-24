/**
 * Created by venn on 16-8-11.
 */
var BASE_URL = 'http://172.22.35.146:7001/EMEA/';
exports.WEBSOCKET_URL = 'ws://172.22.35.146:7001/EMMA/WebSocket';
exports.GET_PUBKEY = BASE_URL + 'user/info/publickey';
exports.LOGIN_URL = BASE_URL + 'user/info';
exports.LOCATION_LIST_URL = BASE_URL + 'location/list?Id=';
exports.NETWORK_LIST_URL = BASE_URL + 'network/list?UserId=';
exports.CHARGER_LIST_URL = BASE_URL + 'charger/list?Id=';
exports.EVSE_LIST_URL = BASE_URL + 'charger/info?Id=';
exports.EVENT_URL = BASE_URL + 'event/log_list?';
exports.LOCATION_INFO_URL = BASE_URL + 'location/info?Id=';
exports.GOOGLE_DIRECTION_URL = 'https://maps.googleapis.com/maps/api/directions/json?';
