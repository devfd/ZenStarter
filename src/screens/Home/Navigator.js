import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import ProfileScreen from 'screens/Home/ProfileScreen';
import SettingsScreen from 'screens/Home/SettingsScreen';

import Colors from 'theme/Colors';

export default TabNavigator({
  Profile: { screen: ProfileScreen },
  Settings: { screen: SettingsScreen },
}, {
  tabBarOptions: {
    activeTintColor: Colors.RED,
    showLabel: false,
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
    },
  },
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-settings${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={48} color={tintColor} />;
    },
  }),
  initialRouteName: 'Profile',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});
