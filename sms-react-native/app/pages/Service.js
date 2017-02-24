/**
 * Created by venn on 16-8-10.
 */
import React, {Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet, TouchableOpacity, Alert, WebView, Picker} from 'react-native';
import API from '../api/API';
import LocationRender from '../components/pages/LocationInfoContainer';
import ProgressBar from '../components/common/progressbar';
var locs = [];
var loc = [];
var chas = [];
var cha = [];
var evses = [];
var evse = [];
var locationID;
var netId;
class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            isLoading: false,
            location: 'Please select the Location',
            charger: 'Please select the Charger',
            evse: 'Please select the EVSE',
            isLocation: false,
            isCharger: false,
            isEVSE: false
        };
        this.getLocation();
    }

    componentWillMount() {
        // this.initTitle();
    }

    initTitle() {
        const {showToolBar, changeTitle, netID} = this.props;
        netId = netID

        showToolBar(true);
        changeTitle('Services');
    }

    //获取location
    getLocation() {
        this.startLoading();

        fetch(API.LOCATION_LIST_URL + '114').then((response)=> {



            // Alert.alert('result', JSON.stringify(response));
            return response.json()
        }).then((json)=> {
            let locList = json.Result;
            let total = json.Total;
            loc = [];
            if (locList) {
                locs = [];
                locs.push({id: '', name: 'Please select the Location'});
                locList.map((loc)=> {
                    locs.push({id: loc.Id, name: loc.Name});
                });
            }
            this.stopLoading();
        }).catch((error)=> {
            this.stopLoading();
            Alert.alert('ERROR', 'NetError!!' +
                error.toString() + a);
        });
    }

    getCharger(value) {
        locationID = value.toString();
        this.startLoading();
        if (value) {
            fetch(API.CHARGER_LIST_URL + value.toString()).then((response)=> {

                return response.json()
            }).then((json)=> {

                let chargerlist = json.Result;
                let tatal = json.Total;
                if (chargerlist) {
                    chas = [];
                    chas.push({id: '', name: 'Please select the Charger'})
                    chargerlist.map((cha)=> {
                        chas.push({id: cha.Id, name: cha.Name});
                    });
                }

                this.stopLoading();
            }).catch((error)=> {
                this.stopLoading();
                Alert.alert('ERROR', 'NetError!!' +
                    error.toString() + ' charger');
            })
        }
    }

    getEVSE(value) {
        this.startLoading();
        if (value) {
            fetch(API.EVSE_LIST_URL + value.toString()).then((response)=>response.json()).then((json)=> {
                let evselist = json.Evse;
                if (evselist) {
                    evses = [];
                    evses.push({id: '', name: 'Please select the EVSE'});
                    evselist.map((evs)=> {
                        evses.push({id: evs.Id, name: evs.Name});
                    })
                }

                this.stopLoading();
            }).catch((error)=> {
                this.stopLoading();
                Alert.alert('ERROR', 'NetError!!' +
                    error.toString() + ' charger');
            })
        }
    }

    changeList() {
        locs = [];
    }

    //
    startLoading() {
        this.setState({isLoading: true});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    selectNetWork(value, position) {
        this.setState({location: value});

    }

    //选择Location
    selectLocation(value, position) {
        if (value) {
            this.setState({isLocation: true, location: value})
        } else {
            this.setState({isLocation: false, location: value, isCharger: false, isEVSE: false});
            // this.setState({isCharger:false});
            // this.setState({isEVSE:false});
        }
        //   this.setState({location: value});
        this.getCharger(value);
    }

//选择Charger
    selectCharger(value, position) {
        //evses.clear();
        if (value) {
            this.setState({isCharger: true, charger: value})
        } else {
            this.setState({isCharger: false, charger: value, isEVSE: false});
            //this.setState({isEVSE:false});
        }
        // this.setState({charger: value});
        this.getEVSE(value);
    }

//选择EVSE
    selectEVSE(value, positon) {
        if (value) {
            this.setState({isEVSE: true, evse: value})
        } else {
            this.setState({isEVSE: false, evse: value});
        }
        //this.setState({evse: value});
    }

    test() {

    }

    jumpToLocation() {
        let {locationID} = this.state.location;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'Location',
                component: LocationRender,
                params: {
                    locationId: this.state.location,
                }
            });
        }
    }

// onValueChange={(value) => this.setState({location: value})}>
    render() {
        if (false) {
            return <ProgressBar></ProgressBar>;
        }

        return (


            <View style = {styles.container}>
                <View style = {styles.spineritem}>
                    <Text>Location</Text>

                    <Picker
                        style = {{width: 250}}
                        mode = {'dropdown'} enabled = {true}
                        selectedValue = {this.state.location}
                        onValueChange = {(value) => this.selectLocation(value)}>
                        {
                            locs.map((value, index)=>(
                                <Picker.Item label = {value.name} value = {value.id} key = {index}></Picker.Item>))
                        }

                    </Picker>
                </View>
                <View style = {styles.spineritem}>
                    <Text>Charger </Text>

                    <Picker
                        style = {{width: 250}}
                        selectedValue = {this.state.charger}
                        onValueChange = {(value) => this.selectCharger(value)}>
                        {
                            chas.map((value, index)=>(
                                <Picker.Item label = {value.name} value = {value.id} key = {index}></Picker.Item>))
                        }
                    </Picker>
                </View>
                <View style = {styles.spineritem}>
                    <Text>EVSE </Text>

                    <Picker
                        style = {{width: 250}}
                        selectedValue = {this.state.evse}
                        onValueChange = {(value) => this.selectEVSE(value)}>
                        {
                            evses.map((value, index)=>(
                                <Picker.Item label = {value.name} value = {value.id} key = {index}></Picker.Item>))
                        }
                    </Picker>
                </View>
                <View style = {styles.lineHorizontal}></View>
                <View style = {styles.item}>
                    { this.state.isLocation ?
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#8f82bc'}]}
                                          onPress = {()=>this.jumpToLocation()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>Info</Text>
                                <Image source = {require('./../images/cf_infoss.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity> : null}

                    <View style = {styles.lineVertical}></View>
                    { this.state.isLocation ?
                        <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#eb6877'}]}
                                          onPress = {()=>this.test()}>
                            <View style = {styles.itemItem}>
                                <Text style = {styles.itemInner}>map</Text>
                                <Image source = {require('./../images/cf_mapss.png')}
                                       style = {styles.itemImage}></Image>
                            </View>
                        </TouchableOpacity> : null}
                </View>
                <View style = {styles.lineHorizontal}></View>
                <View style = {styles.item}>
                    {
                        this.state.isCharger ?
                            <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#63c2ee'}]}
                                              onPress = {()=>this.test()}>
                                <View style = {styles.itemItem}>
                                    <Text style = {styles.itemInner}>Event</Text>
                                    <Image source = {require('./../images/cf_eventss.png')}
                                           style = {styles.itemImage}></Image>
                                </View>
                            </TouchableOpacity> : null
                    }
                    <View style = {styles.lineVertical}></View>
                    {
                        this.state.isCharger ?
                            <TouchableOpacity style = {[styles.itemItem, {backgroundColor: '#7f81d7'}]}
                                              onPress = {()=>this.test()}>

                                <View style = {styles.itemItem}>
                                    <Text style = {styles.itemInner}>Action</Text>
                                    <Image source = {require('./../images/cf_actionss.png')}
                                           style = {styles.itemImage}></Image>
                                </View>


                            </TouchableOpacity> : null
                    }

                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    spinnerview: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
    },

    picker: {
        alignSelf: 'stretch',
        height: 40,
    },

    button: {
        marginTop: 30,
        backgroundColor: '#00aeef',
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#ffffff',
        fontSize: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        margin: 8,
    },

    item: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    spineritem: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 10
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

module.exports = Services;
