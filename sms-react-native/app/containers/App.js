/**
 * Created by root on 16-9-27.
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/store';
import Home from './../components/pages/Home';



const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <Home/>
            </Provider>
        );
    }
}
