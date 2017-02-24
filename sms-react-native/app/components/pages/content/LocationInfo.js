/**
 * Created by Jiayu.Liu on 2016/10/18.
 */
/**
 * Created by Jiayu.Liu on 2016/9/26.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    WebView,
    Picker,
    ScrollView,
    ListView,
    ToastAndroid
} from 'react-native';
import API from '../../../api/API';
var locs = [];
var loc = [];
var chas = [];
var cha = [];
var evses = [];
var evse = [];
var i = 0;
var locationInfo = {};
var evseItem = [];
var [name,image,lat,lon,address1,address2,city,state,country,phone,note,mail,mobile,image]=[];
var chargerData = new Array();
//var evseData = new Array();
var listData = [];
var evseData;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var id;
var netId;
let myListData = [];
export default  class LocationInfo extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2,
            }),
            load: false,
            locationId:'278',
            locationData: ' ',
            locationFish: false,
            dataSourcess: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };

        const {getLocation,getCharger,locationId} = this.props;
       // netId = locationId;
        this.setState({
            locationId:this.props.locationId,
        });
        netId = this.state.locationId;
          this.getCharger(netId);
        //  this.getLocation();
        myListData = new ListView.DataSource({
            rowHasChanged: (row1, row2)=>row1 !== row2,
        });

        getLocation(netId);
       //getCharger(netId);



    }

 //   componentWillMount() {
        //this.initTitle();
// this.setState({
//     locationId:this.props.locationId,
// });
//     }

    initTitle() {
        const {showToolBar, changeTitle} = this.props;
        showToolBar(true);
        changeTitle('Location info');
    }

//     getLocation = ()=> {
//
//
//         fetch(API.LOCATION_INFO_URL + '85').then((response)=> {
//             // Alert.alert('result', JSON.stringify(response));
//
//             return response.json()
//         }).then((json)=> {
//             let json1 = json._bodylnit;
// //let locationInfo={};
//             this.setState({locationFish: true});
//             //locationInfo = json;name,image,lat,lon,address1,address2,city,state,country,phone,note,mail,mobile,image
//             locationInfo = {
//                 Name: json.Name,
//                 Lat: json.Lat,
//                 Lon: json.Lon,
//                 Address1: json.Address1,
//                 Address2: json.Address2,
//                 City: json.City,
//                 State: json.State,
//                 Country: json.Country,
//                 Phone: json.Phone,
//                 Note: json.Note,
//                 Mail: json.Mail,
//                 Mobile: json.Mobile,
//                 Image: json.Image
//             };
//             // Alert.alert("Success", "Success!!" +
//             //     '');
//
//         }).catch((error)=> {
//
//             Alert.alert("ERROR", "NetError!!" +
//                 error.toString() + ' Location');
//         });
//     }
    getCharger = (netId)=> {

        this.startLoading();

        fetch(API.CHARGER_LIST_URL + netId).then((response)=> {

            return response.json()
        }).then((json)=> {
            let chargerlist = json.Result;
            let tatal = json.Total;
            var concat = chargerData.concat(json.Result);
            chargerData = concat;
            if (chargerlist) {
                chas = [];
                chargerlist.map((cha)=> {
                    chas.push({
                        id: cha.Id,
                        name: cha.Name,
                        status: cha.Status,
                        evsetotal: cha.EvseTotal,
                        evseusing: cha.EvseUsing,
                        image: cha.Image
                    });
                });
            }


            //  if(chas){
            this.getEVSE()
            // }else{
            // Alert.alert("ERRORa", "NetError!!" +
            //     'gggdld' + ' '+chas===null);
            //  }

            // this.setState({
            //     dataSource:this.state.dataSource.cloneWithRows(chargerData),
            //     loaded:true,
            // });
            //   Alert.alert('dddd');
            this.stopLoading();
        }).catch((error)=> {
            this.stopLoading();
            // Alert.alert("ERROR", "NetError!!" +
            //     error.toString() + ' charger');
        })

    }
    getEVSE = ()=> {
        this.startLoading();
        // Alert.alert("ERROR", "NetError!!" +
        //     'gggdld' + ' '+chas.toString());

        if (true) {
            let id = chargerData[i].Id;
            // Alert.alert("Charger", "i" +i+' '+ chargerData[i].Id.toString() + ' Charger');
            fetch(API.EVSE_LIST_URL + id).then((response)=> {
                //Alert.alert('result', JSON.stringify(response));
                return response.json()
            }).then((json)=> {
                let evselist = json.Evse;
                let evseData = json;
                let data = new Array();
                var concat = data.concat(json.Evse);
                data = concat;
                // let data = {
                //     Name:json.Name,
                //     Evse:json.Evse,
                // }
                // Alert.alert("EVSE", "i" +i+' '+ evselist.toString() + ' EVSE');
                // if (evselist) {
                //     evses = [];
                //
                //     evselist.map((evs)=> {
                //         evses.push({id: evs.Id, name: evs.Name});
                //     })
                // }
                listData.push({itemData: Object.assign({charger: chargerData[i], evse: data})});
                i++;
                // if(chas){
                let bool = i < (chargerData.length) - 1;
                let b = false;
                if (bool) {
                    //Alert.alert("EVSE", "i" +i+' '+chargerData.length + ' getEVSE'+(bool));
                    this.getEVSE();
                } else {


                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        loaded: true,
                    });
                    //  Alert.alert("EVSE", "i" + i + ' ' + listData.toString() + ' EVSE');
                }

                //  }
                this.stopLoading();
            }).catch((error)=> {
                i++;
                this.stopLoading();
                Alert.alert("ERROR", "NetError!!" +
                    error.toString() + ' EVSE');
            })
        } else {

        }
    }

    changeList() {
        locs = [];
    }

    //
    startLoading() {
        //  this.setState({isLoading: true});
    }

    stopLoading() {
        // this.setState({isLoading: false});
    }

    selectNetWork(value, position) {
        this.setState({location: value});

    }


    test() {

    }

// getStatus=(status)=>{
//    switch(status){
//        case -1:
//            return "Offline";
//        case 0:
//            return "Available";
//        case 1:
//            return "Occupied";
//        case 2:
//            return "Reserved";
//        case 3:
//            return "Unavailable";
//        case 4:
//            return "Faulted";
//        default:
//            return " "
//
//    }
//
// }
    renderItem(charger) {
        var evses = [];
        // var evse = [];
        getStatus = (status)=> {
            switch (status) {
                case -1:
                    return "Offline";
                case 0:
                    return "Available";
                case 1:
                    return "Occupied";
                case 2:
                    return "Reserved";
                case 3:
                    return "Unavailable";
                case 4:
                    return "Faulted";
                default:
                    return " "

            }

        }
        //  Alert.alert("Charger", "i" +' '+ charger.itemData.evse.Evse.toString() + ' Charger');
        for (var iq = 0; iq < charger.itemData.evse.length; iq++) {
            // let evse = charger.itemData.evse[i];
            var connectors = [];
            for (var ic = 0; ic < charger.itemData.evse[iq].Connector.length; ic++) {
                connectors.push(
                    <View style = {styles.infoview}>
                        <View style = {[{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}>
                            {
                                <View style = {{
                                    height: 12,
                                    width: 12,
                                    borderRadius: 6,
                                    backgroundColor: '#000',
                                }}/>
                            }
                        </View>
                        <Text style = {{marginLeft: 8,}}>{
                            charger.itemData.evse[iq].Connector[ic].Name.toString() + "(" + charger.itemData.evse[iq].Connector.length + ")"
                        }
                        </Text>
                    </View>
                )
            }
            evses.push(
                <View>
                    <Text>{
                        charger.itemData.evse[iq].Name.toString()
                    }
                    </Text>
                    <View style = {styles.infoview}>{
                        connectors
                    }
                    </View>
                </View>
            );
        }
        //ToastAndroid.show( charger.itemData.evse.toString(),ToastAndroid.LONG);
        return (
            <View >
                <View style = {styles.itemview}>
                    <Image source = {{uri: charger.itemData.charger.Image}} style = {styles.itemimg}>
                    </Image>
                    <View>

                        <View>
                            <Text style = {styles.toptext}>Charger ID</Text>
                            <Text style = {styles.bottomtext}>{charger.itemData.charger.Id}</Text>
                        </View>
                        <View>
                            <Text style = {styles.toptext}>Charger Name</Text>
                            <Text style = {styles.bottomtext}>{charger.itemData.charger.Name}</Text>
                        </View>
                        <View style = {styles.infoview}>
                            <Text style = {styles.toptext}>Status</Text>
                            <Text style = {styles.bottomtext}>{this.getStatus(charger.itemData.charger.Status)}</Text>
                        </View>
                        <View style = {styles.infoview}>
                            <Text style = {styles.toptext}>Type</Text>
                            <Text style = {styles.bottomtext}>{charger.itemData.charger.Type}</Text>
                        </View>
                        <View>
                            <Text style = {styles.toptext}>Description</Text>
                            <Text style = {styles.bottomtext}>{charger.itemData.charger.Note}</Text>
                        </View>
                    </View>
                </View>
                <View style = {{backgroundColor: '#cfcfcf'}}>{evses}</View>

            </View>
        );
    }

    readerEvse = ()=> {
        var evseItem = [];
        for (let i = 0; i < 5; i++) {
            evseItem.push(
                <View>
                    <Text>Connectors</Text>
                </View>)
        }
        return evseItem;
    }

    readerConnectors(charger) {
        return <View>
            <Text>Connectors</Text>
        </View>;
    }

// onValueChange={(value) => this.setState({location: value})}>
    render() {
        const {data, isLoadingg, listData, chargerFish,} = this.props;

        if (isLoadingg) {
            return (<View>
                <Text>正在加载</Text>
            </View>);
        } else {
            // Alert.alert("ERROR", "isLoading !!" +
            //     listData + ' Location');
            return (
                <ScrollView>

                    <View>
                        {
                            data.Image !== null ? <Image source = {{uri: data.Image}}
                                                         style = {styles.itemImage}></Image> :
                                <Image source = {'../../../images/zxc.jpg'}
                                       style = {styles.itemImage}></Image>
                        }
                        {
                            data.Name !== '' ? <View style = {styles.linear}>
                                <Image source = {require('../../../images/ic_station.png')}
                                       style = {styles.topimg}></Image>
                                <View style = {styles.linearview}>
                                    <Text style = {styles.toptext}>Location name</Text>
                                    {
                                        <Text>{data.Name}</Text>

                                    }

                                </View>
                            </View> : null
                        }

                        {
                            data.Phone !== '' ?
                                <View style = {styles.linear}><Image source = {require('../../../images/ic_phone.png')}
                                                                     style = {styles.topimg}></Image>
                                    <View style = {styles.linearview}>
                                        <Text style = {styles.toptext}>Phone number</Text>
                                        <Text style = {styles.bottomtext}>{data.Phone}</Text>
                                    </View>
                                </View> : null
                        }


                        {
                            data.Mobile !== '' ? <View style = {styles.linear}>
                                <Image source = {require('../../../images/mobile.png')} style = {styles.topimg}></Image>
                                <View style = {styles.linearview}>
                                    <Text style = {styles.toptext}>Mobile</Text>
                                    <Text style = {styles.bottomtext}>{data.Mobile}</Text>
                                </View>
                            </View> : null
                        }

                        {
                            data.Mail !== '' ? <View style = {styles.linear}>
                                <Image source = {require('../../../images/mail.png')} style = {styles.topimg}></Image>
                                <View style = {styles.linearview}>
                                    <Text style = {styles.toptext}>Mail</Text>
                                    <Text style = {styles.bottomtext}>{data.Mail}</Text>
                                </View>
                            </View> : null
                        }

                        {data.Address1 !== '' ? <View style = {styles.linear}>
                            <Image source = {require('../../../images/ic_navi.png')} style = {styles.topimg}></Image>
                            <View style = {styles.linearview}>
                                <Text style = {styles.toptext}>Address</Text>
                                <Text style = {styles.bottomtext}>{data.Address1 + data.Address2}</Text>
                            </View>
                        </View> : null}
                        {
                            data.City !== '' ? <View style = {styles.linear}>
                                <Image source = {require('../../../images/ic_description.png')}
                                       style = {styles.topimg}></Image>
                                <View style = {styles.linearview}>
                                    <Text style = {styles.toptext}>Coordinates</Text>
                                    <Text style = {styles.bottomtext}>{data.City}</Text>
                                </View>
                            </View> : null
                        }

                        {
                            data.Note !== '' ? <View style = {styles.linear}>
                                <Image source = {require('../../../images/beizhu.png')} style = {styles.topimg}></Image>
                                <View style = {styles.linearview}>
                                    <Text style = {styles.toptext}>Note</Text>
                                    <Text style = {styles.bottomtext}>{data.Note}</Text>
                                </View>
                            </View> : null
                        }
                        {

                            true ? <ListView style = {{marginLeft: 16, marginRight: 16,}}
                                             dataSource = {this.state.dataSource}
                                             renderRow = {this.renderItem}
                            >

                            </ListView> : null
                        }

                    </View>
                </ScrollView>



            );
        }
    }

    renderItemm(charger) {
        return (<View>
            <Text style = {styles.toptext}>gggggggg</Text>
        </View>);
    }
}
const styles = StyleSheet.create({
    linear: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linearview: {
        flexDirection: 'column',
        marginLeft: 16,
    },
    toptext: {
        color: '#333333',
        textAlign: 'auto',
        fontSize: 18,
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    bottomtext: {
        color: '#666666',
        textAlign: 'auto',
        alignItems: 'center',
        textAlignVertical: 'center',
        marginLeft: 3,
        fontSize: 14,
    },
    topimg: {
        width: 30,
        height: 30,
        marginLeft: 16,
        alignItems: 'center',
        resizeMode: 'contain'

    },
    itemview: {
        flexDirection: 'row',

    },
    itemimg: {
        height: 180,
        alignItems: 'center',
        resizeMode: 'contain',
        flex: 1,
    },
    infoview: {
        flexDirection: 'row',
    },
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
    viewhide: {},
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
        width: width,
        height: 498 * width / 750,
    }
});

