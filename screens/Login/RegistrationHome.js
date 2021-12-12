import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity, FAB, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


    

export default class RegistrationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      images: [
        require('../../asserts/img/marketing.png'),
        require('../../asserts/img/idea.png'),
        require('../../asserts/img/booking.png'),          // Local image
      ],
      desc: [
        'Hello',
        'My',
        'welcome',
      ],
      currentIndex: 0
    };
    GoogleSignin.configure({
      webClientId: '477164582687-ij5p71teni2h5rdhr3flijv2uv3vmn81.apps.googleusercontent.com',
    });

  }

  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };

  joinwithGoogle= async()=>{
    

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      const userinfo = auth().signInWithCredential(googleCredential);
      console.log((await userinfo).user);

      this.props.navigation.navigate('Location')
    
  }

  render() {
    const Signin = () => {
      this.props.navigation.navigate('Signin')
    }

    const joinNow = () => {
      this.props.navigation.navigate('Joinnow')
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.div1}>
          <Image
            source={require('../../asserts/img/linkedinfull.png')}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.div2} onLayout={this.onLayout}>

          <SliderBox
            images={this.state.images}
            title={this.state.desc}
            sliderBoxHeight={400}
            parentWidth={this.state.width}
            dotColor="#000000"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={'resize'} resizeMode={'center'}
          />
        </View>

        {/* button section start */}
        <View style={styles.div3} >
          <Button style={styles.btn1} mode="contained" onPress={() => {
            joinNow()
          }}
          >
            Join now
          </Button>

          <Button style={styles.btn2} mode="text" onPress={ 
            this.joinwithGoogle
          }
          >
            <Text style={styles.txt}> <Icon name="logo-google" size={18} color="#900" />  Join With Google</Text>
          </Button>

          <Button style={styles.btn3} mode="text" onPress={() => {
            Signin()
          }}
          >
            <Text style={styles.txt2}>Sign in</Text>
          </Button>
        </View>
        {/* button section end */}
      </View>
    );
  }
  handleClick = () => {
    alert('Button clicked!');
  }
}
const styles = StyleSheet.create({
  txt: {
    color: '#333333',
    fontFamily: 'lucida grande',
  },
  txt2: {
    color: '#0a66c2',
    fontFamily: 'lucida grande',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent:'center'
  },
  div1: {
    height: '8%',
    backgroundColor: 'white',
    marginLeft: 20,

  },
  div2: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  div3: {
    height: '20%',
    justifyContent: 'flex-start',

    alignItems: 'center',
    zIndex: 2,
  },
  img: {
    width: 100,
    height: 100
  },
  btn1: {
    marginTop: 20,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#0a66c2'
  },
  btn2: {
    marginTop: 20,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    color: '#333333'
  },
  btn3: {
    marginTop: 20,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    color: '#0a66c2'
  },
});