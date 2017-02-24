/**
 * Created by venn on 16-9-22.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RouteRender from './content/RoutePlanner';
import actions from '../../actions/actions';

class RoutePlannerContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, actions} = this.props;
        return (<RouteRender
            {...state}
            {...actions}
            {...this.props}
        />);
    }
}

mapStateToProps = (state)=>({state: state.onRoutePlanner});

mapDispatchToProps = (dispatch)=>({actions: bindActionCreators(actions.routePlannerActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(RoutePlannerContainer);
