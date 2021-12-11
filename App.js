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
import Location from './screens/profiles/Location';
import JobOrStudent from './screens/profiles/JobOrStudent';
import ProfileImage from './screens/profiles/ProfileImage';

import MemberView from './component/cart/MemberView';

const switchNavigator=createSwitchNavigator({
  Tabs:Tabs,
  MemberView:MemberView,
  SplashScreen:SplashScreen,
  RegistrationHome:RegistrationHome,
  Signin:Signin,
  Joinnow:Joinnow,
 
  ProfileScreen:ProfileScreen,
  Location:Location,
  ProfileImage:ProfileImage, 
  JobOrStudent:JobOrStudent,


})

const App=createAppContainer(switchNavigator)
export default App;
