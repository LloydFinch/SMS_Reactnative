/**
 * Created by root on 16-10-21.
 */
import * as types from '../constants/actionTypes';
import * as Bean from './../bean/RouteBean';
import routejson from './../utils/routejson';
import {Alert} from 'react-native';

export function init() {
    return {type: types.ROUTE_INIT};
}

export function getRoutes(path) {
    return dispatch=> {
        dispatch(loading());

        dispatch(loaded(getBestRoute(routejson.route)));

        // fetch(url).then((response)=> {
        //         return response.json();
        //     }
        // ).then((json)=> {
        //     let routeList = getBestRoute(json);
        //     dispatch(loaded(routeList));
        // }).catch((error)=> {
        //     dispatch(loaded({routeList: []}));
        //     Alert.alert('ERROR', error.toString());
        // });
    };
}

function loading() {
    return {type: types.ROUTE_LOADING};
}

function loaded(routeList) {
    return {type: types.ROUTE_LOADED, routeList: routeList};
}

function getBestRoute(json) {
    let routeList = [];

    let route = new Bean.RouteBean();
    if (json !== null) {
        route = {...json};

        let allRoutes = route.routes;
        if (allRoutes !== null && allRoutes.length > 0) {
            allRoutes.map(route=> {
                let bestRoute = new Bean.BestRoute();

                //Fare
                let fare = route.fare;
                if (fare != null) {
                    bestRoute.fare = fare;
                    bestRoute.fareValue = fare.text;
                }

                //copyrights
                let copyrights = route.copyrights;
                if (copyrights !== null) {
                    bestRoute.copyrights = copyrights;
                }

                //warnings
                let warnings = route.warnings;
                if (warnings !== null) {
                    bestRoute.warnings = warnings;
                }

                //legs
                let legs = route.legs;
                if (legs !== null && legs.length > 0) {
                    let distance = 0;
                    let duration = 0;

                    legs.map(leg=> {

                        //distance
                        let d = leg.distance;
                        if (d !== null) {
                            distance += d.value;
                        }

                        //duration
                        let dt = leg.duration;
                        if (dt !== null) {
                            duration += dt.value;
                        }
                    });

                    bestRoute.distance = distance;
                    bestRoute.duration = duration;


                    let orders = route.waypoint_order;
                    let sequence = '';

                    //TODO use the locationList and orders make visit sequence
                    //origin
                    sequence += 'origin';

                    //waypoints
                    orders.map(index=> {
                        sequence += '->';
                        sequence += ('' + index);
                    })

                    //destination
                    sequence += '->';
                    sequence += 'destination';

                    bestRoute.visit = sequence;
                    bestRoute.legs = legs;
                }

                //add route
                routeList.push(bestRoute);
            });
        }
        //sort,distance first,fare second
        return sortRouteList(routeList);
    }
    return routeList;
}

function sortRouteList(routeList) {
    return routeList;
}