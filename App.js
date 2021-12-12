import React, { Component }  from 'react';
import { SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
// screens
import SplashScreen from './screens/SplashScreen/SplashScreen';
import RegistrationHome from './screens/Login/RegistrationHome';
import Signin from './screens/Login/Signin';
import Joinnow from './screens/Login/JoinNow';
import Tabs from './navigation/tabs';
import ProfileScreen from './screens/profiles/ProfileScreen';
import Location from './screens/profiles/Location';
import JobOrStudent from './screens/profiles/JobOrStudent';
import ProfileImage from './screens/profiles/ProfileImage';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './component/header/Header';
import Home from './screens/Home/Home';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
          <Stack.Screen options={{ headerShown: false }} name="RegistrationHome" component={RegistrationHome} />
          <Stack.Screen options={{ headerShown: false }} name="Signin" component={Signin} />
          <Stack.Screen options={{ headerShown: false }} name="Joinnow" component={Joinnow} />
          <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
          <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Location" component={Location} />
          <Stack.Screen options={{ headerShown: false }} name="JobOrStudent" component={JobOrStudent} />
          <Stack.Screen options={{ headerShown: false }} name="ProfileImage" component={ProfileImage} />
          <Stack.Screen options={{ headerShown: false }} name="Header" component={Header} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}




