/**
 * Created by root on 16-9-27.
 */
import {combineReducers} from 'redux';
import onLogin from './loginReducer';
import onServiceRoutePlanner from './serviceRoutePlannerReducer';
import onLocationView from './locationInfoReducer';
import onRoutePlanner from './routePlannerReducer';
import onMap from './mapReducer';

const rootReducer = combineReducers({
    onLogin,
    onServiceRoutePlanner,
    onRoutePlanner,
    onLocationView,
    onMap,
});
export default rootReducer;