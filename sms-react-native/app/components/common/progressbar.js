/**
 * Created by root on 16-8-22.
 */

import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

class ProgressBar extends Component {
    render() {
        return (<View style = {styles.container}>
            <ActivityIndicator size = {'large'}>
            </ActivityIndicator>
            <Text>玩命加载中...</Text>
        </View>);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = ProgressBar;