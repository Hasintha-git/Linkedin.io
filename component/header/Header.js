import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image  } from 'react-native';
import { Avatar, TextInput, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import renderIf from 'render-if';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import DrawerSider from './DrawerSider'
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../../screens/profiles/HomeScreen'
// import AboutScreen from '../../screens/profiles/AboutScreen'


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display1: true,
            display2: false,
            active: 'first',
            userImg:'https://usergenerator.canekzapata.net/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg',
        };
    }

    async componentDidMount(){
        try {
            await AsyncStorage.getItem('userProfileImg').then(value => {
              console.log(value);
              if (value != null) {
                let user = JSON.parse(value)
                this.setState({ userImg: user.uploadedImgUrl });
              }
              console.log(this.state.userImg);
            })
      
          } catch (error) {
            console.log(error);
          }
    }

    onFocusSearch = () => {
        this.setState({
            display1: false
        });
        this.setState({
            display2: true
        });
    }
    outFocusSearch = () => {
        this.setState({
            display1: true
        });
        this.setState({
            display2: false
        });
    }

    profile = () => {


    }


    render() {

        const img = '../../asserts/img/user.png'
        return (

            <SafeAreaView style={styles.Header}>
                {renderIf(this.state.display1)(
                        <TouchableOpacity style={styles.Avatar} onPress={this.profile}>
                          
                            <Image
                                style={{ width: '100%', height: '100%',borderRadius:50 }}
                                source={{ uri: this.state.userImg }}
                            />
                            {/* <Icon name="person-circle" size={28} color="gray"/> */}
                        </TouchableOpacity>
                    
                )}

                {renderIf(this.state.display1)(
                    <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, marginLeft: 10, borderRadius: 5 }}>
                        {/* <Icon name="search" size={16} color="#900" /> */}
                        <TextInput
                            style={{ width: '100%', height: 30 }}
                            placeholder="Search"
                            onFocus={this.onFocusSearch}
                            underlineColor="transparent"
                            left={<TextInput.Icon name={() =>
                                <TouchableOpacity onPress={this.outFocusSearch}>
                                    <Icon name={'search'} size={20} color="gray" />
                                </TouchableOpacity>
                            } />}
                        />
                    </View>
                )}

                {renderIf(this.state.display1)(
                    <View style={{ flex: 0.8, alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Icon name="chatbox-ellipses" size={26} color="gray" />
                        </TouchableOpacity>
                    </View>
                )}

                {renderIf(this.state.display2)(
                    <View style={{ display: 'flex', width: '100%', borderBottomColor: 'gray', borderBottomWidth: 1, height: 45, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                        <TouchableOpacity onPress={this.outFocusSearch}>

                        </TouchableOpacity>
                        <TextInput
                            style={{ width: '100%', height: 37 }}
                            placeholder="Search"
                            // onFocus={this.outFocusSearch}
                            underlineColor="transparent"
                            theme={{ colors: { primary: 'transparent' } }}
                            left={<TextInput.Icon name={() =>
                                <TouchableOpacity onPress={this.outFocusSearch}>
                                    <Icon name={'arrow-back'} size={20} color="gray" />
                                </TouchableOpacity>
                            } />}
                        />

                    </View>
                )}



            </SafeAreaView>







        )
    }
}

const styles = StyleSheet.create({
    Header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 5,
        // paddingBottom:5

    },
    Avatar: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: 'yellow'
    },
    search: {
        height: 37

    },
    input: {
        width: '100%',
        height: 37
    },
})