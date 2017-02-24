/* EventLog.js
* EventLog page for detail
* TODO: do not know why flex could solve button line not sync issue
*/
import React, { Component } from 'react';
import { View, ToolbarAndroid } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ChargerListView from '../ChargerListView';
import EvseListView from '../EvseListView';

const toolbarActions = [
  { title: 'Filter_time', icon: require('../../images/filter_time.png'), show: 'always' },
  { title: 'Filter', icon: require('../../images/filter.png'), show: 'always' },
  { title: 'Sort', icon: require('../../images/event_log.png'), show: 'always' },
];

const styles = {
  toolbarStyle: {
    backgroundColor: '#00aeef',
    height: 56,
  },
};

class EventLog extends Component {
  state = {
    colorProps: {
      titleColor: '#ffffff',
      subtitleColor: '#000000',
    },
  };

  onActionSelected = (position) => {
    switch (toolbarActions[position].title) {
      case 'Filter_time':
        console.log('Filter_time');
        break;
      case 'Filter':
        console.log('Filter');
        break;
      case 'Sort':
        console.log('Sort');
        break;
      default:
    }
  };

  render() {
    const { charger, location, locationName, evseConList, navigator } = this.props;
    const views = evseConList.map((value, index) =>
      <EvseListView
        tabLabel={'EVSE' + value.Connector[0].Id + ' ' + value.Connector[0].Name}
        charger={charger}
        location={location}
        evse={value.Connector[0].Id}
        key={index}
      />
    );
    return (
      <View style={{ flex: 1 }}>
        <ToolbarAndroid
          actions={toolbarActions}
          navIcon={require('../../images/ic_back.png')}
          onActionSelected={this.onActionSelected}
          onIconClicked={() => {
            if (navigator) {
              navigator.pop();
            }
          }}
          style={styles.toolbarStyle}
          subtitle={locationName}
          title={'EventLog'}
          {...this.state.colorProps}
        />
        <ScrollableTabView
          tabBarBackgroundColor={'#00aeef'}
          tabBarActiveTextColor={'#ffffff'}
          tabBarUnderlineStyle={{ backgroundColor: '#000000' }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <ChargerListView
            tabLabel={'CHARGER'}
            charger={charger}
            location={location}
          />
          {views}
        </ScrollableTabView>
      </View>
    );
  }
}

export default EventLog;
