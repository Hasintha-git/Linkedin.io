import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PostView from '../../component/posts/PostView';
import { Avatar, Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import renderIf from 'render-if';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sample@gmail.com',
      password: '',
      refreshing: false,
      display1: true,
      display2: false,
      active: 'first',
      userImg: 'https://usergenerator.canekzapata.net/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg',

    };
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
    this.props.navigation.navigate('ProfileScreen')

  }

  // getData=()=> {
  //     try{
  //         AsyncStorage.getItem('userData').then(value=>{
  //             if (value!=null) {
  //               let user=JSON.parse(value)
  //                 this.setState({ email: user.email });
  //                 this.setState({ password: user.password });
  //             }
  //         })

  //     }catch(error){
  //         console.log(error);
  //     }
  // }

  async componentDidMount() {
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

  render() {

    return (
      <SafeAreaView style={styles.container}>


        <SafeAreaView style={styles.Header}>
          {renderIf(this.state.display1)(
            <TouchableOpacity style={styles.Avatar} onPress={this.profile}>

              <Image
                style={{ width: '100%', height: '100%', borderRadius: 50 }}
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

        <View style={styles.PostView}>
          <FlatList
            data={PostView}
            renderItem={({ item }) => <PostView item={item} />}
            showsVerticalScrollIndicator={false}
          >
          </FlatList>
        </View>
      </SafeAreaView>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '95%',
    alignItems: 'center',
    width: '100%'
  },
  PostView: {
    width: '100%',
    backgroundColor: 'grey'
  },
  Header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
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
