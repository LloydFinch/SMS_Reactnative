/**
 * Created by venn on 16-9-22.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid, ListView, WebView} from 'react-native';
import {DomParser} from 'react-native-html-parser';

let ds = new ListView.DataSource({rowHasChanged: (row1, row2)=>Object.is(row1, row2)});

export default class RouteDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderRow = (data, sectionID, rowID, highlightRow)=> {

        let distance = data.distance;
        let d = distance.text;
        let visit = data.html_instructions;
        //let str = DomParser.parseFromString(visit, 'text/html');
        return (
            <TouchableOpacity onPress = {()=> {
                ToastAndroid.show('position:' + rowID, ToastAndroid.SHORT);
            }}>
                <View style = {styles.center}>
                    <Text>{visit}</Text>
                    <Text>{d}</Text>
                </View>
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
        const {route}  = this.props;
        let legs = route.legs;
        let steps = [];
        for (let index in legs) {
            let leg = legs[index];
            let ls = leg.steps;
            for (let i in ls) {
                steps.push(ls[i]);
            }
        }

        let visit = route.visit;
        let totalDistance = route.distance / 1000;
        let duration = route.duration / 60;

        let sequence = '';
        steps.map(step=> {
            sequence += step.html_instructions;
            sequence += '<br>';
            sequence += '<br>';

        });

        return (<View style = {styles.center}>
            <Text>Visiting sequence</Text>
            <Text>{visit}</Text>

            <Text>Distance</Text>
            <Text>{totalDistance} km</Text>

            <Text>Duration</Text>
            <Text>{duration} min</Text>

            <Text>Instructions</Text>
            {/*<ListView dataSource = {ds.cloneWithRows(steps)}*/}
            {/*renderRow = {this.renderRow}*/}
            {/*style = {styles.container}*/}
            {/*/>*/}
            <WebView
                automaticallyAdjustContentInsets = {false}
                source = {{html: sequence}}
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
