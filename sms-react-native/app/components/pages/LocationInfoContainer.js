/**
 * Created by Jiayu.Liu on 2016/10/18.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as locationInfAction from '../../actions/locationInfoAction';
import LocationInfo from './content/LocationInfo';

class LocationInfoContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {state, actions} = this.props;
        return (
            <LocationInfo

                {...state}
                {...actions}
                {...this.props}
            />
        );
    }
}


function mapStateToProps(state) {
    return {state: state.onLocationView};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(locationInfAction, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationInfoContainer);
