/**
 * Created by venn on 16-8-11.
 */
import React, {Component, PropTypes} from 'react';
import {
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    View,
    Navigator,
    StyleSheet,
    Alert,
    ToastAndroid,
    NetInfo,
    ActivityIndicator,
    BackAndroid,
    AppState
} from 'react-native';
import SelectNetWorkRender from './SelectNetwork';
import Storage from 'react-native-storage';
import ProgressBar from '../common/progressbar';
import API from '../../api/API';
import RSAKey from '../../utils/rsa/rsa';

export const EXPIRES = 1000 * 3600 * 24 * 30;

const LOGIN_STATE = 'loginState';
const LOGIN_SETTING = 'loginSetting';
export var storage = new Storage({
    size: 1000,
    enableCache: true,
    sync: {}
})

class LoginRender extends Component {

    static propTypes = {
        username: PropTypes.string,
        password: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {username: '', password: '', isLoading: false};
        this.getUser();
    }

    setUser() {
        storage.save({
            key: LOGIN_STATE,
            rawData: {
                userID: this.state.username,
                password: this.state.password
            },
            expires: EXPIRES,
        });
    }

    getUser() {
        storage.load({
            key: LOGIN_STATE,
            autoSync: true,
            syncInBackground: true
        }).then(user => {
            if (user) {
                this.setState({username: user.userID, password: user.password});
            }
        }).catch(err => {
            console.log("error:" + err.toString());
        })
    }

    clearUser() {
        storage.remove({key: LOGIN_STATE});
    }

    changeUser(userID) {
        const {change} = this.props;
        if (change) {
            change(userID);
        }
    }

    setLoginSetting(json) {
        ToastAndroid.show(json.Message, ToastAndroid.LONG);
        storage.save({
            key: LOGIN_SETTING,
            rowData: {
                groupId: json.GroupId,
                languageId: json.languageId,
            },
            expires: EXPIRES,
        });
    }

    login() {
        if (this.state.username !== '' && this.state.username === this.state.password) {
            //this.clearUser();
            this.setUser();
            this.changeUser(this.state.username);
            this.getPubKey();
        }
        else {
            Alert.alert('Failure', 'Username or password is wrong!');
        }
    }

    checkNetConnect() {
        return NetInfo.isConnected;
    }

    jumpToSelectNetWork(isSuper) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id: 'SelectNetWork',
                index: 1,
                component: SelectNetWorkRender,
                showToolBar: true,
                title: 'SelectNetWork',
                params: {isSuper: isSuper, userID: this.state.username}
            });
        }
    }

    updateUsername(username) {
        this.setState({username: username});
    }

    updatePassword(password) {
        this.setState({password: password});
    }

    getPubKey() {
        this.startLoading();
        let url = API.GET_PUBKEY;
        fetch(url).then((response)=>
            response.json()
        ).then((json)=> {
            this.stopLoading();
            let publicKeyModulus = json.publicKeyModulus;
            let publicKeyExponent = json.publicKeyExponent;
            let rsa = new RSAKey();
            rsa.setPublic(publicKeyModulus, publicKeyExponent);
            let encryptPsw = rsa.encrypt(this.state.password);
            this.doLogin(this.state.username, encryptPsw);
        }).catch((error)=> {
            this.stopLoading();
            Alert.alert("ERROR", error.toString());
        });
    }

    doLogin(username, password) {
        this.startLoading();
        let url = API.LOGIN_URL;
        let jsonParams = JSON.stringify({'Uid': username, 'Password': password});
        fetch(url, {
            method: 'POST', body: jsonParams
        }).then((response)=>response.json()).then((json)=> {
            this.stopLoading();
            this.setLoginSetting(json);
            //this.openWebSocket();
            this.jumpToSelectNetWork(this.state.username.toLowerCase() == 'service');
        }).catch((error)=> {
            this.stopLoading();
            Alert.alert("ERROR", error.toString());
        });
    }

    startLoading() {
        this.setState({isLoading: true});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    openWebSocket() {
        let ws = new WebSocket(API.WEBSOCKET_URL);

        ws.onopen = ()=> {
            ToastAndroid.show('onOpen()', ToastAndroid.LONG);
        }

        ws.onmessage = (msg)=> {
            ToastAndroid.show('onmessage():' + msg.data, ToastAndroid.LONG);
        }

        ws.onerror = (e)=> {
            ToastAndroid.show('onerror():' + e.message, ToastAndroid.LONG);
        }

        ws.onclose = (e)=> {
            ToastAndroid.show('onclose():' + e.code + "," + e.reason, ToastAndroid.LONG);
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ProgressBar></ProgressBar>;
        } else {
            return (<View style = {styles.center}>
                    <Image source = {require('./../../images/logo.png')} style = {styles.logo}></Image>
                    <TextInput onChangeText = {(username)=>this.updateUsername(username)}
                               style = {styles.input} value = {this.state.username}></TextInput>
                    <TextInput onChangeText = {(password)=>this.updatePassword(password)}
                               style = {styles.input} secureTextEntry = {true}
                               value = {this.state.password}></TextInput>

                    <TouchableOpacity onPress = {()=>this.login()} style = {styles.button}>
                        <Text style = {styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
    },

    input: {
        margin: 5,
        alignSelf: 'stretch',
    },

    button: {
        margin: 5,
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

module.exports = LoginRender;

