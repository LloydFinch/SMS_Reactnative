/**
 * Created by venn on 16-8-10.
 */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, ToastAndroid, ListView, Picker} from 'react-native';
import ProgressBar from '../../common/progressbar';
import API from '../../../api/API';
import CheckBox from 'react-native-checkbox';
import ActionButton from 'react-native-action-button';
import RouteContainerRender from '../RoutePlannerContainer';

const CurrentLocation = 'My current location';
const Current = {Id: -1, Name: CurrentLocation, Lat: 0, Lon: 0};
const Item = Picker.Item;

let listViewDataSource;
let locationsCanChoose;
let locations;

export default class ServiceRoutePlanner extends Component {

    constructor(props) {
        super(props);
        this.init();

        const {netID, getLocationList} = this.props;
        let path = API.LOCATION_LIST_URL + netID;
        getLocationList(path);
    }

    init() {
        listViewDataSource = new ListView.DataSource({rowHasChanged: (row1, row2)=>Object.is(row1, row2)});
        const {init} = this.props;
        init();
        locations = this.props.locationList;
        locationsCanChoose = [];
    }

    jumpToRoutePlanner = ()=> {
        if (this.props.wayPoints.length < 1) {
            ToastAndroid.show('Please choose a waypoint first', ToastAndroid.SHORT);
        } else {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    id: 'RoutePlanner',
                    component: RouteContainerRender,
                    showToolBar: true,
                    title: 'RoutePlanner',
                });
            }
        }
    };

    //row in listview
    renderRow = (data, sectionID, rowID, highlightRow)=> {
        const {wayPoints} = this.props;
        const {selectWayPoints} = this.props;
        let checked = wayPoints.includes(data);
        return (
            <TouchableOpacity style = {{width: 400, height: 50}} onPress = {()=> {

            }}>
                <View style = {styles.row}>
                    <Text style = {{marginRight: 40, alignItems: 'center', width: 260}}>{data.Name}</Text>
                    <CheckBox
                        label = {null}
                        labelBefore = {true}
                        checked = {checked}
                        uncheckedImage = {require('../../../images/filt_check2.png')}
                        checkedImage = {require('../../../images/un_filtercheck.png')}
                        onChange = {(checked)=> selectWayPoints(checked, data)}>
                    </CheckBox>
                </View>
            </TouchableOpacity>
        );
    }

    //divider line in listview
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View style = {{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
        }}/>;
    }

    render() {
        const {
            origin, destination, showFAC, locationList, locationsCanChoose,
            loading, selectOrigin, selectDestination
        } = this.props;

        if (loading) {
            return (<ProgressBar>
            </ProgressBar>);
        } else {
            return (<View style = {styles.center}>
                    <Text style = {styles.tag}>origin:</Text>
                    <Picker style = {styles.picker} mode = {'dropdown'} enabled = {true}
                            selectedValue = {origin}
                            onValueChange = {(value, position)=>selectOrigin(value, position)}>
                        {
                            locationList.map((value, index)=>(
                                <Item label = {value.Name} value = {value} key = {index}></Item>))
                        }
                    </Picker>

                    <Text style = {styles.tag}>destination:</Text>
                    <Picker style = {styles.picker} mode = {'dropdown'} enabled = {true}
                            selectedValue = {destination}
                            onValueChange = {(value, position)=>selectDestination(value, position)}>
                        {
                            locationList.map((value, index)=>(
                                <Item label = {value.Name} value = {value} key = {index}></Item>))
                        }
                    </Picker>

                    <Text style = {styles.tag}>waypoints:</Text>
                    <ListView
                        dataSource = {listViewDataSource.cloneWithRows(locationsCanChoose)}
                        renderRow = {this.renderRow}
                        renderSeparator = {this.renderSeparator}
                        style = {styles.container}
                    />
                    <ActionButton
                        icon = {<Image source = {require('../../../images/ic_route_plan.png')}
                                       style = {{width: 61, height: 61, resizeMode: 'contain'}}/>}
                        active = {showFAC}
                        buttonColor = 'rgba(0,0,0,0)'
                        onPress = {()=> {
                            this.jumpToRoutePlanner();
                        }}
                    />
                </View>
            );
        }
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
    },

    list: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        width: 400,
        height: 50,
    },

    picker: {
        alignSelf: 'stretch',
        height: 40,
    },

    text: {
        fontWeight: 'bold'
    },

    tag: {
        color: '#63c2ee',
        marginTop: 10,
        alignItems: 'flex-start',
    }
});