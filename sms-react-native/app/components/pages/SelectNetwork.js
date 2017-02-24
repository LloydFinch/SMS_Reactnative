/**
 * Created by root on 16-8-22.
 */
import React, {Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet, TouchableOpacity, Alert, Picker, ToastAndroid} from 'react-native';
import DashBoardRender from './Dashboard';
import API from '../../api/API';
import ProgressBar from '../common/progressbar';
import {storage} from './Login';

const Item = Picker.Item;
let nets = [];

class SelectNetWork extends Component {

    constructor(props) {
        super(props);
        this.state = {selected: '', isLoading: false};
        this.getNetWorkList();
    }

    getNetWorkList() {
        this.startLoading();
        const {userID} = this.props;
        fetch(API.NETWORK_LIST_URL + userID).then((response)=>response.json()).then((json)=> {
            let netList = json.Result;
            let total = json.Total;
            if (netList) {
                nets = [];
                netList.map((net)=> {
                    nets.push({id: net.Id, name: net.Name});
                });
                this.selectNetWork(nets[0].id, 0);
            }
            this.stopLoading();
        }).catch((error)=> {
            this.stopLoading();
            Alert.alert('ERROR', error.toString());
        });
    }

    selectNetWork(value, position) {
        this.setState({selected: value});
        //this.setNetID(value);
        //ToastAndroid.show('netID1:' + value, ToastAndroid.SHORT);
    }

    setNetID(netID) {
        storage.save({
            key: 'netID',
            rawData: {
                netID: netID,
            },
            expires: 1000 * 3600 * 24 * 30,
        });
    }

    startLoading() {
        this.setState({isLoading: true});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    onBackIconClick = ()=> {
        const {openDrawer} = this.props;
        if (openDrawer) {
            openDrawer();
        }
    }

    jumpToDashBoard() {
        const {navigator} = this.props;
        let {isSuper} = this.props;
        let netID = this.state.selected;
        if (navigator) {
            navigator.push({
                id: 'Dashboard',
                index: 1,
                component: DashBoardRender,
                showToolBar: true,
                title: 'Dashboard',
                iconPath: require('../../images/dash.png'),
                onBackIconClick: this.onBackIconClick,
                params: {isSuper: isSuper, netID: netID}
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ProgressBar></ProgressBar>;
        } else {
            return (<View style = {styles.center}>
                <Text style = {{marginBottom: 50}}>Please select a net work!</Text>

                <Picker style = {styles.picker} mode = {'dropdown'} enabled = {true}
                        selectedValue = {this.state.selected}
                        onValueChange = {(value, position)=>this.selectNetWork(value, position)}
                        prompt = {'Please select a net'}
                >
                    {
                        nets.map((value, index)=>(<Item label = {value.name} value = {value.id} key = {index}></Item>))
                    }
                </Picker>

                <TouchableOpacity onPress = {()=>this.jumpToDashBoard()} style = {styles.button}>
                    <Text style = {styles.text}>Next</Text>
                </TouchableOpacity>
            </View>);
        }
    }
}
const styles = StyleSheet.create({
    center: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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

});

module.exports = SelectNetWork;