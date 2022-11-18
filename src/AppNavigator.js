import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Offer from './Offer';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Offer} name="Offer" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
