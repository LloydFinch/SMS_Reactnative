/**
 * Created by venn on 16-8-10.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../../actions/actions';
import ServiceRoutePlanner from './content/ServiceRoutePlanner';

class ServiceRoutePlannerContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {state, actions} = this.props;
        return (
            <ServiceRoutePlanner
                {...state}
                {...actions}
                {...this.props}
            />
        );
    }
}

mapStateToProps = (state)=>({state: state.onServiceRoutePlanner});

mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators(actions.serviceRoutePlannerActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRoutePlannerContainer);