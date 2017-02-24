/**
 * Created by venn on 16-9-22.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ListView} from 'react-native';
import {Card, CardContent} from 'react-native-card-view';
import RouteDetailRender from './RouteDetail';
import API from '../../../api/API';

let ds = new ListView.DataSource({rowHasChanged: (row1, row2)=>Object.is(row1, row2)});

export default class RoutePlanner extends Component {
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        const {init} = this.props;
        init();
        const {getRoutes}  = this.props;
        let path = API.GOOGLE_DIRECTION_URL + 'origin=60.259445,24.837599&destination=60.259445,24.837599&waypoints=optimize:true|52.30365,4.683266&alternatives=true&language=en&key=AIzaSyBwuY55ylEFUtvtX3AhCsg48XqAFeds7tA';
        getRoutes(path);
    }

    jumpToRouteDetail = (route)=> {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'RouteDetail',
                component: RouteDetailRender,
                showToolBar: true,
                title: 'RouteDetail',
                params: {
                    route: route
                }
            });
        }
    };

    renderRow = (data, sectionID, rowID, highlightRow)=> {
        const card = {
            card: {
                flex: 1,
                padding: 5,
                margin: 5,
                marginBottom: 10,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#e5e5e5',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#e5e5e5',
                elevation: 5,
            }
        };

        let distance = data.distance / 1000.0;
        let visit = data.visit;
        let copyrights = data.copyrights;
        return (
            <TouchableOpacity onPress = {()=> {
                this.jumpToRouteDetail(data);
            }}>
                <Card styles = {card}>
                    <CardContent>
                        <Text>Total distance {distance} km</Text>
                        <Text> {visit} </Text>
                        <Text> {copyrights} </Text>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    };

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View style = {{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
        }}/>;
    }

    render() {
        const {routeList}  = this.props;
        return (<View style = {styles.center}>
            <ListView
                dataSource = {ds.cloneWithRows(routeList)}
                renderRow = {this.renderRow}
                style = {styles.container}
            />
        </View>);
    }
}

const styles = StyleSheet.create({
    center: {
        flexDirection: 'column',
        flex: 1,
        padding: 5,
    },
    container: {
        flex: 1,
        zIndex: 1,
    },
});