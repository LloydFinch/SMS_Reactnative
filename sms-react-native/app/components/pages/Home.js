/**
 * Created by root on 16-9-28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
    DrawerLayoutAndroid,
    View,
    Text,
    StyleSheet,
    Image,
    ToastAndroid,
    BackAndroid,
    ToolbarAndroid,
    TouchableOpacity
} from 'react-native';
import LoginRender from './Login';
import storage from './Login';
import ServiceRender from './Service';
import MapRender from './MapContainer';
import RoutePlannerRender from './ServiceRoutePlannerContainer';
import SwitchNetworkRender from './SwitchNetork';
import AboutRender from './About';
import SettingsRender from './Settings';

let myNavigator;

export function onBackIconClick() {
    if (myNavigator) {
        if (myNavigator.getCurrentRoutes().length <= 3) {
            BackAndroid.exitApp();
        } else {
            myNavigator.pop();
        }
    } else {
        BackAndroid.exitApp();
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {userID: '', showToolBar: false, title: 'Dashboard', navIcon: ''};
    }

    changeUserID = (userID)=> {
        this.setState({userID: userID});
    }

    openDrawer = ()=> {
        this.refs['DrawerLayout'].openDrawer();
    }

    getNetID() {
        storage.load({
            key: 'netID',
            autoSync: true,
            syncInBackground: true
        }).then(netID => {
            if (netID) {
                return netID;
            }
        }).catch(err => {
            console.log("error:" + err);
        });
    }

    currentIsDashboard() {
        return (myNavigator.getCurrentRoutes().length === 3);
    }

    jumpToService() {
        let netID = 55;
        let routeService = {
            id: 'Service',
            component: ServiceRender,
            showToolBar: true,
            title: 'Service',
            params: {
                netID: netID,
            }
        };
        if (myNavigator) {
            this.currentIsDashboard() ? myNavigator.push(routeService) : myNavigator.replace(routeService);
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    jumpToMap() {
        let routeMap = {
            id: 'Map',
            component: MapRender,
            showToolBar: true,
            title: 'Map'
        };
        if (myNavigator) {
            this.currentIsDashboard() ? myNavigator.push(routeMap) : myNavigator.replace(routeMap);
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    jumpToRoutePlanner() {
        let netID = 55;
        let routePlanner = {
            id: 'ServiceRoutePlanner',
            component: RoutePlannerRender,
            showToolBar: true,
            title: 'ServiceRoutePlanner',
            params: {
                netID: netID,
            }
        }
        if (myNavigator) {
            this.currentIsDashboard() ? myNavigator.push(routePlanner) : myNavigator.replace(routePlanner);
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    jumpToNetSetting() {
        let routeNetSetting = {
            id: 'SwitchNetwork',
            component: SwitchNetworkRender,
            showToolBar: true,
            title: 'SwitchNetwork'
        }
        if (myNavigator) {
            this.currentIsDashboard() ? myNavigator.push(routeNetSetting) : myNavigator.replace(routeNetSetting);
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    jumpToSetting() {
        let routeSetting = {
            id: 'Settings',
            component: SettingsRender,
            showToolBar: true,
            title: 'Settings'
        }
        if (myNavigator) {
            this.currentIsDashboard() ? myNavigator.push(routeSetting) : myNavigator.replace(routeSetting);
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    jumpToAbout() {
        let routeAbout = {
            id: 'About',
            component: AboutRender,
            showToolBar: true,
            title: 'About'
        }
        if (myNavigator) {
            this.currentIsDashboard() ? myNavigator.push(routeAbout) : myNavigator.replace(routeAbout);
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    logout() {
        if (myNavigator) {
            myNavigator.popToTop();
        }
        this.refs['DrawerLayout'].closeDrawer();
    }

    render() {
        let component = LoginRender;
        var navigationView = (
            <View style = {{flex: 1, backgroundColor: '#fff'}}>
                <Image source = {require('../../images/ic_background.png')} style = {styles.headerBack}>
                    <View style = {{alignSelf: 'flex-end'}}>
                        <Image source = {require('../../images/ic_account_circle_white_48dp.png')}
                               style = {[styles.logo, {alignSelf: 'flex-start'}]}></Image>
                        <Text style = {{
                            width: 100,
                            alignSelf: 'flex-start',
                            textAlign: 'center',
                            color: '#fff'
                        }}>{this.state.userID}</Text>
                    </View>
                </Image>

                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/charging_functions.png')}></Image>
                    <TouchableOpacity onPress = {()=>this.jumpToService()}>
                        <Text style = {styles.menu}>Service</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/map.png')}></Image>
                    <TouchableOpacity onPress = {()=>this.jumpToMap()}>
                        <Text style = {styles.menu}>Map</Text>
                    </TouchableOpacity>
                </View>


                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/ic_menu_route_planner.png')}></Image>
                    <TouchableOpacity onPress = {()=>this.jumpToRoutePlanner()}>
                        <Text style = {styles.menu}>Route planner</Text>
                    </TouchableOpacity>
                </View>


                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/network_setting.png')}></Image>
                    <TouchableOpacity onPress = {()=>this.jumpToNetSetting()}>
                        <Text style = {styles.menu}>Switch network</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/settings.png')}></Image>
                    <TouchableOpacity onPress = {()=>this.jumpToSetting()}>
                        <Text style = {styles.menu}>Settings</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/dashboard.png')}></Image>
                    <TouchableOpacity>
                        <Text style = {styles.menu}>About</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.menuLine}>
                    <Image source = {require('../../images/log_out.png')}></Image>
                    <TouchableOpacity onPress = {()=>this.logout()}>
                        <Text style = {styles.menu}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                ref = {'DrawerLayout'}
                drawerWidth = {300}
                drawerPosition = {DrawerLayoutAndroid.positions.Left}
                renderNavigationView = {() => navigationView}>

                <View style = {{flex: 1}}>
                    <Navigator initialRoute = {{
                        id: 'login',
                        index: 0,
                        component: component,
                        change: this.changeUserID,
                        showToolBar: false,
                        title: '',
                    }}
                               configureScene = {(route)=> {
                                   return Navigator.SceneConfigs.FadeAndroid;
                               }}
                               renderScene = {(route, navigator)=> {
                                   let Component = route.component;
                                   myNavigator = navigator;
                                   let height = route.showToolBar ? 50 : 0;
                                   let title = route.title;
                                   let iconPath = require('../../images/ic_back.png');
                                   if (route.iconPath) {
                                       iconPath = route.iconPath;
                                   }
                                   let onIconClicked = onBackIconClick;
                                   if (route.onBackIconClick) {
                                       onIconClicked = route.onBackIconClick;
                                   }

                                   if (Component) {
                                       return (
                                           <View style = {{flex: 1}}>
                                               <ToolbarAndroid
                                                   navIcon = {iconPath}
                                                   title = {title}
                                                   titleColor = {'#fff'}
                                                   style = {{height: height, backgroundColor: '#63c2ee'}}
                                                   onIconClicked = {onIconClicked}
                                               />
                                               <Component {...route.params}
                                                          change = {route.change}
                                                          navigator = {navigator}
                                                          openDrawer = {this.openDrawer}
                                               />
                                           </View>);

                                   }
                               }}/>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        marginLeft: 20,
        fontSize: 15,
        textAlign: 'left',
        color: '#000'
    },

    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },

    menuLine: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    headerBack: {
        flexDirection: 'row',
        resizeMode: 'contain',
        height: 190,
        width: 350,
    }
})

BackAndroid.addEventListener('hardwareBackPress', ()=> {
    if (myNavigator) {
        //Login and Dashboard
        if (myNavigator.getCurrentRoutes().length <= 3) {
            return false;
        } else {
            myNavigator.pop();
            return true;
        }
    } else {
        return false;
    }
});

module.exports = Home;