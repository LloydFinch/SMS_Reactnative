import React, { Component } from 'react';
import { Alert, View, Text, ListView, RefreshControl, TouchableHighlight } from 'react-native';
import API from '../api/API';

const styles = {
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
};

class EvseListView extends Component {

  state = {
    gPageNo: 1,
    dataSet: void 0,
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([]),
    refreshing: false,
  };

  componentWillMount() {
    const { charger, location, evse } = this.props;
    this.fetchAndUpdateDataSource(location, charger, evse, 'level', '2016-010-01', '2016-010-27', '6,5,4,3,2,1', this.state.gPageNo, '25');
  }

  renderRow(charger) {
    return (
      <TouchableHighlight
        onPress={() => {
        }}
      >
        <View style={styles.rowStyle} >
          <View style={{ flex: 1 }}>
            <Text>{charger.Level}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text>{'Event'}</Text>
            <Text>{'Charger Id'}</Text>
            <Text>{'EvseId'}</Text>
            <Text>{'Occurrence'}</Text>
            <Text>{'Clearance'}</Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <Text>{charger.Title}</Text>
            <Text>{charger.ChargerId}</Text>
            <Text>{charger.EvseId}</Text>
            <Text>{charger.Occurrence}</Text>
            <Text>{charger.Clearance}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  onRefresh = () => {
    const { charger, location, evse } = this.props;
    this.setState({refreshing: true, gPageNo: this.state.gPageNo + 1});
    this.fetchAndUpdateDataSource(location, charger, evse, 'level', '2016-010-01', '2016-010-27', '6,5,4,3,2,1', this.state.gPageNo, '25');
    this.setState({refreshing: false});
  };

  fetchAndUpdateDataSource(location, charger, evse, level, startTime, stopTime, levelId, pageNo, pageMax) {
    const fullAPI = API.EVENT_URL
      + 'LocationId=' + location
      + '&ChargerId=' + charger
      + '&EvseId=' + evse
      + '&OrderById=' + level
      + '&StartTime=' + startTime
      + '&StopTime=' + stopTime
      + '&LevelId=' + levelId
      + '&PageNo=' + pageNo
      + '&PerPage=' + pageMax;

    fetch(fullAPI)
      .then((response) => {
        return response.json();
      }).then((json) => {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        let tmp;
        if (typeof this.state.dataSet === 'undefined') {
          tmp = json.Chargers;
        } else {
          tmp = this.state.dataSet.concat(json.Chargers);
        }
        this.setState({ dataSource: ds.cloneWithRows(tmp), dataSet: tmp });
      }).catch((error) => {
        Alert.alert('ERROR', 'NetError!!' +
            error.toString());
      });
  }

  render() {
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No event log</Text>
        </View>
      );
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
    );
  }
}

export default EvseListView;
