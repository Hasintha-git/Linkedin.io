import React, { Component, useState } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Validation, Sizer } from 'rn-core-utils';
import renderIf from 'render-if';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sample@gmail.com',
      password: null,
      validemail: false,
      validpassword: false,
      securePassword: true,
      iconName: "eye-off"
    };

  }

 
  changeEmail = (e) => {

    this.setState({ email: e });

  }
  changePassword = (e) => {

    this.setState({ password: e });


  }

  onPressPasswordEye = () => {
    const eyeName = this.state.iconName;
    if (eyeName == "eye-off") {
      this.setState({ securePassword: false });
      this.setState({ iconName: "eye" });
    }
    if (eyeName == "eye") {
      this.setState({ securePassword: true });
      this.setState({ iconName: "eye-off" });
    }
  }

  onCheckValidation = () => {
    const isEmailValid = Validation.validateEmail(this.state.email);
    const isPasswordValid = Validation.validatePassword(this.state.password.length);
    if (isEmailValid && isPasswordValid) {
      this.setState({ validemail: false });
      this.setState({ validpassword: false });
      console.log(' validation pass');

      this.signIn()
    } else {
      if (!isEmailValid) {
        this.setState({ validemail: true });
      }
      if (!isPasswordValid) {
        this.setState({ validpassword: true });

      }
      if (isEmailValid) {
        this.setState({ validemail: false });
      }
      if (isPasswordValid) {
        this.setState({ validpassword: false });

      }



      console.log('Please enter valid ');
    }

  };


  signIn=async()=> {
 
    auth()
    .signInWithEmailAndPassword(this.state.email,this.state.password)
    .then((user) => { 
      console.log(user);
      console.log('login succes');
      try{
        var user= {
          email:this.state.email,
          password:this.state.password,
          displayName:user.additionalUserInfo.profile,

        }
         AsyncStorage.setItem('userData',JSON.stringify(user))
        
        this.props.navigation.navigate('Tabs')
      }catch(error){
        console.log(error);
      }
      // this.props.navigation.navigate('Tabs')
    })
    .catch(error => {
      console.error(error);
    });
  }


  render() {
    const Joinnow = () => {
      this.props.navigation.navigate('Joinnow')
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.div1}>
          <Image
            source={require('../../asserts/img/linkedinfull.png')}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: 20
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <TouchableOpacity style={{ width: '60%', alignItems: 'flex-end' }} onPress={() => {
            Joinnow()
          }}>
            <Text style={{ color: '#0a66c2', fontSize: 16 }}>Join now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divSignin}>
          <Text style={styles.txtSignin}>Sign in</Text>
        </View>


        <View style={styles.div2} onLayout={this.onLayout}>
          <TextInput style={styles.input1}
            label="Email or User name"
            autoCapitalize='none'
            onChange={(val) => this.changeEmail(val.nativeEvent.text)}
          />

          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>
            {renderIf(this.state.validemail)(
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>Please Enter Valid email</Text>
            )}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 10 }}>
            <TextInput style={styles.input1}
              label="Password"
              onChange={(val) => this.changePassword(val.nativeEvent.text)}
              secureTextEntry={this.state.securePassword}

            />
            <TouchableOpacity style={{ zIndex: 99, right: 20 }} onPress={this.onPressPasswordEye}>
              <Icon name={this.state.iconName} size={18} color="#900" />
              {/* eye-off */}
            </TouchableOpacity>

          </View>


          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>
            {renderIf(this.state.validpassword)(
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>Please Enter Valid password</Text>
            )}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginLeft: 20, marginTop: 15 }} >
            <Checkbox />
            <Text style={{ color: 'black', marginLeft: 1 }}>Remember me.</Text>
            <TouchableOpacity>
              <Text style={{ color: '#0a66c2', marginLeft: 5 }}>Learn more</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.btnforgetbox} mode="text" onPress={() => {
            Signin()
          }}
          >
            <Text style={styles.txt2}>Forget Password ?</Text>
          </TouchableOpacity>


          {/* button section start */}
          <Button style={styles.btn1} mode="contained" onPress={this.onCheckValidation}
          >
            Continue
          </Button>



          {/* ----- or ------- dash */}
          <View style={styles.dashbox}>
            <View style={styles.dash} />
            <Text style={styles.dashtxt}>or</Text>
            <View style={styles.dash} />
          </View>
          {/* ----- or ------- dash end */}

          <Button style={styles.btn2} mode="text" onPress={() => {
            joinwithGoogle()
          }}
          >
            <Text style={styles.txt}> <Icon name="logo-google" size={18} color="#900" />  Join With Google</Text>
          </Button>

          <Button style={styles.btn2} mode="text" onPress={() => {
            joinwithGoogle()
          }}
          >
            <Text style={styles.txt}> <Icon name="logo-facebook" size={18} color="#900" />  Join With Facebook</Text>
          </Button>
          {/* button section end */}
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  input1: {
    marginTop: '2%',
    height: 55,
    width: '90%',
    backgroundColor: 'none'

  },
  input2: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  headerbox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  headerbox2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20
  },
  txt: {
    color: '#333333',
    fontFamily: 'lucida grande',
  },
  txt2: {
    color: '#0a66c2',
    fontFamily: 'lucida grande',
    fontSize: 12
  },
  txtSignin: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black'
  },
  txtjoinnow: {
    color: '#0a66c2',
    fontFamily: 'lucida grande',
    fontSize: 18
  },
  container: {
    flexDirection: "column",
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
    // justifyContent:'center'
  },
  div1: {
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',

  },
  divSignin: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  signintxt: {
    fontSize: 18,

  },
  div2: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    width: '100%'
  },
  div3: {
    height: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100
  },
  btn1: {
    marginTop: 15,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#0a66c2'
  },
  btn2: {
    marginTop: 10,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    color: '#333333'
  },
  btn3: {
    marginTop: 10,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    color: '#0a66c2'
  },
  btnforgetbox: {
    marginTop: 20,
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    color: '#0a66c2'
  },
  div2box1: {
    flex: 0.5,
    width: '100%',

  },
  div2box2: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    margin: 20,
    paddingTop: 20

  },
  div2box3: {
    flex: 0.5,
    width: '100%',
    marginLeft: 35,
    marginTop: 20,
    overflow: 'hidden',
  },
  div2box4: {
    flex: 0.5,
    width: '100%',
    backgroundColor: 'yellow',
    marginLeft: 35,
    marginTop: 20,
    overflow: 'hidden'
  },
  dash: {
    width: 120,
    margin: 10,
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.3
  },
  dashbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  dashtxt: {
    color: 'black',
    opacity: 0.7
  },

});