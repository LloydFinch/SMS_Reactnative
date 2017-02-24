/**
 * Created by venn on 16-8-10.
 */
import React, {Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import API from '../../../api/API';
import ProgressBar from '../../common/progressbar';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        const {init, getLocationList, netID}  = this.props;
        init();
        getLocationList(API.LOCATION_LIST_URL + netID);
    }

    animateToCoordinate(coordinate, duration) {
        this.map.animateToCoordinate(coordinate, duration);
    }

    render() {
        const {loading} = this.props;

        if (loading) {
            return (<ProgressBar>
            </ProgressBar>);
        } else {
            let {locationList} = this.props;
            //Alert.alert('locationList', JSON.stringify(locationList));
            let [latitude,longitude] = [37.78825, -122.4324];
            if (locationList.length > 0) {
                const locationFirst = locationList[0];
                if (locationFirst !== null) {
                    latitude = locationFirst.Lat;
                    longitude = locationFirst.Lon;
                }
            }

            return (<MapView ref = {ref=> {
                this.map = ref;
            }}
                             provider = {PROVIDER_GOOGLE}
                             style = {styles.map}
                             onRegionChange = {()=> {
                             }}
                             onRegionChangeComplete = {()=> {
                             }}
                             initialRegion = {{
                                 latitude: latitude,
                                 longitude: longitude,
                                 latitudeDelta: 30.0,
                                 longitudeDelta: 30.0,
                             }}
            >
                {
                    locationList.map(location=> {
                        let lat = location.Lat;
                        let lon = location.Lon;
                        return (<MapView.Marker
                            title = 'SMS'
                            description = {'latitude' + lat + ',longitude' + lon}
                            coordinate = {{latitude: lat, longitude: lon}}
                            onPress = {(coordinate, position)=> {
                                this.animateToCoordinate({
                                    latitude: lat,
                                    longitude: lon
                                }, 1000);
                            }}
                        />)
                    })
                }

            </MapView>);
        }
    }
}
const styles = StyleSheet.create({
    map: {
        borderWidth: 1,
        borderColor: '#000000',
        height: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
});
