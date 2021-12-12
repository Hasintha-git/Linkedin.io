import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, theme, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home/Home';
import MyNetwork from '../screens/MyNetwork/MyNetwork';
import Post from '../screens/post/Post';
import Notification from '../screens/Notification/Notification';
import Jobs from '../screens/jobs/Jobs';
import Header from '../component/header/Header';
import ProfileScreen from '../screens/profiles/ProfileScreen';


const Tab = createBottomTabNavigator();

const IncomeTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow,

        }}
    // onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'blue'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);




class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: 'sample@gmail.com',
        };
      }
    



    render() {
 
        return (
         

                <View style={styles.MainView} >
                    <StatusBar barStyle="dark-content" backgroundColor="white"/>

                    {/* <Header/> */}
                    <Tab.Navigator initialRouteName="Home"

                        screenOptions={{
                            
                            tabBarHideOnKeyboard: true,
                            tabBarShowLabel: false,
                            tabBarStyle: {
                                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                                height: 78,
                            }
                            
                        }}
                    >
                        <Tab.Screen name="Home" component={Home}
                            options={{
                               
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                        <Icon name="home" size={18} style={{ color: focused ? '#333333' : 'gray'}} />
                                        <Text
                                            style={{ color: focused ? '#333333' : 'gray', fontSize: 12}}>
                                            Home
                                        </Text>
                                    </View>
                                ),
                            }} />


                        <Tab.Screen name="MyNetwork" component={MyNetwork}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                        <Icon name="people" size={18} style={{ color: focused ? '#333333' : 'gray'}} />
                                        <Text
                                            style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                            My Network
                                        </Text>
                                    </View>
                                ),
                            }}
                        />


                        <Tab.Screen name="Post" component={Post}
                            options={{
                                headerShown: false,
                                tabBarVisible:true,
                                // tabBarVisibilityAnimationConfig:Post,
                                tabBarIcon: ({ focused }) => (
                                    
                                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                        <Icon name="add-circle" size={18} style={{ color: focused ? '#333333' : 'gray'}} />
                                        <Text
                                            style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                            Post
                                        </Text>
                                    </View>
                                ),
                            }}
                        />


                        <Tab.Screen name="Notification" component={Notification}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                        <Icon name="notifications" size={18} style={{ color: focused ? '#333333' : 'gray'}} />
                                        <Text
                                            style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                            Notification
                                        </Text>
                                    </View>
                                ),
                            }}
                        />
                        <Tab.Screen name="Jobs" component={Jobs}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                        <Icon name="folder" size={18} style={{ color: focused ? '#333333' : 'gray'}} />
                                        <Text
                                            style={{ color: focused ? '#333333' : 'gray', fontSize: 12 }}>
                                            Jobs
                                        </Text>
                                    </View>
                                ),
                            }}
                        />
                    </Tab.Navigator>



                </View>

         
        );
    }
}

export default Tabs;

// const styles=StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',

//   }
// });
const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignContent: 'center',
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,

        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },

});