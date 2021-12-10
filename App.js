import React from 'react';
import { SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
// screens
import SplashScreen from './screens/SplashScreen/SplashScreen';
import RegistrationHome from './screens/Login/RegistrationHome';
import Signin from './screens/Login/Signin';
import Joinnow from './screens/Login/JoinNow';
import Tabs from './navigation/tabs';
import ProfileScreen from './screens/profiles/ProfileScreen';

const switchNavigator=createSwitchNavigator({
  SplashScreen:SplashScreen,
  RegistrationHome:RegistrationHome,
  Signin:Signin,
  Joinnow:Joinnow,
  Tabs:Tabs,
  ProfileScreen:ProfileScreen,
})

const App=createAppContainer(switchNavigator)
export default App;