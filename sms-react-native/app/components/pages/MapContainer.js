/**
 * Created by venn on 16-8-10.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../../actions/actions';
import MapRender from './content/Map';
class MapContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {state, actions} = this.props;
        return (<MapRender
            {...state}
            {...actions}
            {...this.props}
        />);
    }
}
mapStateToProps = (state)=>({state: state.onMap});

mapDispatchToProps = (dispatch)=>({actions: bindActionCreators(actions.mapActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
