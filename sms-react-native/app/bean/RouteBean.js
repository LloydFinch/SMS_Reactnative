/**
 * Created by root on 16-10-21.
 */
export class RouteBean {
    status;//string
    geocoded_waypoints;//list[WayPoints]
    routes;//list[Routes]
}

export class WayPoints {
    geocoder_status;//string
    place_id;//string
    types;//list[string]
}

export class Routes {
    legs;//list[Legs]
    fare;//Fare
    copyrights;//string
    warnings;//string[]
    waypoint_order;//int[]
}

export class Legs {
    distance;//Distance
    duration;//Duration
    start_address;//string
    end_address;//string
    start_location;//StartLocation
    end_location;//EndLocation
    steps;//list[Steps]
}

export class Distance {
    text;//string
    value;//long
}

export class Duration {
    text;//string
    value;//long
}

export class StartLocation {
    lat;//double
    lng;//double
}

export class EndLocation {
    lat;//double
    lng;//double
}

export class Steps {
    travel_mode;//string
    start_location;
    end_location;
    html_instructions;//string
    distance;
    duration;
}

export class Fare {
    currency;//string
    value;//int
    text;//string
}


//best route
export class BestRoute {
    id;
    distance;//long
    fare;//double
    fareValue;//string
    visit;//string
    copyrights;//string
    warnings;//[string]
    duration;//long
    legs//list[legs]
}