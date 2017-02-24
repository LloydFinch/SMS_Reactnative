/**
 * Created by venn on 16-8-10.
 */
import React, {Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import ServiceRender from './Service';
import MapRender from './MapContainer';
import RoutePlannerRender from './ServiceRoutePlannerContainer';
import SwitchNetworkRender from './SwitchNetork';
import AboutRender from './About';
import SettingsRender from './Settings';
class DashBoard extends Component {

    constructor(props) {
        super(props);
    }

    jumpToService() {
        const {navigator} = this.props;
        let {netID} = this.props;
        if (navigator) {
            navigator.push({
                id: 'Service',
                component: ServiceRender,
                showToolBar: true,
                title: 'Service',
                params: {
                    netID: netID,
                }
            });
        }
    }

    jumpToMap() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'Map',
                component: MapRender,
                showToolBar: true,
                title: 'Map'
            });
        }
    }

    jumpToRoutePlanner() {
        const {navigator} = this.props;
        let {netID} = this.props;
        if (navigator) {
            navigator.push({
                id: 'ServiceRoutePlanner',
                component: RoutePlannerRender,
                showToolBar: true,
                title: 'ServiceRoutePlanner',
                params: {
                    netID: netID,
                }
            });
        }
    }

    jumpToNetSetting() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'SwitchNetwork',
                component: SwitchNetworkRender,
                showToolBar: true,
                title: 'SwitchNetwork'
            });
        }
    }

    jumpToSetting() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'Settings',
                component: SettingsRender,
                showToolBar: true,
                title: 'Settings'
            });
        }
    }

    jumpToAbout() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'About',
                component: AboutRender,
                showToolBar: true,
                title: 'About'
            });
        }
    }

    logout() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.popToTop();
        }
    }

    render() {
        if (this.props.isSuper) {
            return (<View style = {styles.container}>
                    <View style = {styles.item}>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#6fba2c'}]}
                                          onPress = {()=>this.jumpToService()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Service</Text>
                                <Image source = {require('../../images/ic_charge.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.lineVertical}></View>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#ff9d29'}]}
                                          onPress = {()=>this.jumpToMap()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Map</Text>
                                <Image source = {require('../../images/ic_map_dashboard.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.lineHorizontal}></View>
                    <View style = {styles.item}>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#8f82bc'}]}
                                          onPress = {()=>this.jumpToRoutePlanner()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Route planner</Text>
                                <Image source = {require('../../images/ic_routeplan.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.lineVertical}></View>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#eb6877'}]}
                                          onPress = {()=>this.jumpToNetSetting()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Switch network</Text>
                                <Image source = {require('../../images/ic_netsetting.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.lineHorizontal}></View>
                    <View style = {styles.item}>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#63c2ee'}]}
                                          onPress = {()=>this.logout()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Log out</Text>
                                <Image source = {require('../../images/ic_logout.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.lineVertical}></View>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#7f81d7'}]}
                                          onPress = {()=>this.jumpToSetting()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Settings</Text>
                                <Image source = {require('../../images/ic_setting.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (<View style = {styles.container}>
                    <View style = {styles.item}>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#6fba2c'}]}
                                          onPress = {()=>this.jumpToService()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Service</Text>
                                <Image source = {require('../../images/ic_charge.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.lineVertical}></View>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#ff9d29'}]}
                                          onPress = {()=>this.jumpToMap()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Map</Text>
                                <Image source = {require('../../images/ic_map_dashboard.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.lineHorizontal}></View>
                    <View style = {styles.item}>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#63c2ee'}]}
                                          onPress = {()=>this.logout()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Log out</Text>
                                <Image source = {require('../../images/ic_logout.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.lineVertical}></View>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#eb6877'}]}
                                          onPress = {()=>this.jumpToNetSetting()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Switch network</Text>
                                <Image source = {require('../../images/ic_netsetting.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.lineHorizontal}></View>
                    <View style = {styles.item}>
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#7f81d7'}]}
                                          onPress = {()=>this.jumpToSetting()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Settings</Text>
                                <Image source = {require('../../images/ic_setting.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style = {styles.lineVertical}></View>
                        <View style = {[styles.itemItem, {backgroundColor: '#ffffff'}]}>
                        </View>
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        margin: 8,
    },

    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
    },

    itemItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    itemInner: {
        color: '#ffffff',
        fontSize: 20,
    },

    lineVertical: {
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        width: 8,
    },

    lineHorizontal: {
        backgroundColor: '#ffffff',
        height: 8,
    },

    itemImage: {
        width: 50,
        height: 50,
        marginTop: 15,
    }
});

module.exports = DashBoard;