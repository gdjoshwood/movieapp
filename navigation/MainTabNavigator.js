import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Detail from '../screens/Detail';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home,
  },
  config
);

HomeStack.navigationOptions = {

  tabBarVisible: false
};

HomeStack.path = '';

const DetailStack = createStackNavigator(
  {
    Detail,
  },
  config
);

DetailStack.navigationOptions = {
  
  tabBarVisible: false
};

DetailStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  DetailStack,
});

tabNavigator.path = '';

export default tabNavigator;
