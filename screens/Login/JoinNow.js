import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Validation, Sizer } from 'rn-core-utils';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Joinnow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      isValidateUser: true,
      isValidPassword: true,
      validfirst: false,
      validlast: false,
      nameContinue: true,
      mailContinue: false,
      passwordContinue: false,
      validphone: false,
      validpassword: false,
      securePassword: true,
      iconName: "eye-off",
      phone: '',
      email: props.email,
      password: '',
      photoURL:'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'

    };

  }

  changeFirstName = (e) => {
    if (e.length > 0) {
      this.setState({ validfirst: false });
      this.setState({ firstname: e });
    } else {
      this.setState({ validfirst: true });
    }
  }
  changeLastName = (e) => {
    if (e.length > 0) {
      this.setState({ validlast: false });
      this.setState({ lastname: e });
    } else {
      this.setState({ validlast: true });
    }
  }

  changeEmail = (e) => {
    this.setState({ email: e });
  }

  changePassword = (e) => {
    this.setState({ password: e });
  }

  changephone = (e) => {
    this.setState({ email: e });
  }

  onCheckValidationName = () => {
    console.log(this.state.firstname.length);
    const isFirstNameValid = Validation.validateName(this.state.firstname.length);
    const isSecondNameValid = Validation.validateName(this.state.lastname.length);
    if (isFirstNameValid && isSecondNameValid) {
      console.log(' validation pass');
      this.setState({ nameContinue: false });
      this.setState({ mailContinue: true });
    } else {
      if (!isFirstNameValid) {
        this.setState({ validfirst: true });
      }
      if (!isSecondNameValid) {
        this.setState({ validlast: true });
      }
      console.log('Please enter valid ');
    }
  };



  onCheckValidationPassword = () => {
    const isEmailValid = Validation.validateEmail(this.state.email);
    const isPasswordValid = Validation.validatePassword(this.state.password.length);
    if (isEmailValid && isPasswordValid) {
      console.log(' validation pass set passowrd');
      this.registerUser()
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


  onCheckValidationEmail = () => {
    const lenght = this.state.phone.length;
    console.log(this.state.email);
    const isEmailValid = Validation.validateEmail(this.state.email);
    this.setState({ validphone: true });
    if (lenght == 10 || isEmailValid) {
      const isPhoneValid = Validation.validatePhone(this.state.email);
      if (isPhoneValid || isEmailValid) {
        this.setState({ validphone: false });
        console.log(' validation pass');
        this.setState({ mailContinue: false });
        this.setState({ passwordContinue: true });


      } else {
        this.setState({ validphone: true });
        console.log('Please enter valid ');
      }
    }
  };

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

  registerUser=()=> {
    console.log("registerUser method called");
    auth()
  .createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((user) => {
    user.user.updateProfile({
      displayName: this.state.firstname,
   }).then(function() {
      // Update successful.
   }, function(error) {
      // An error happened.
   });
   user.user.updateProfile({
    photoURL: this.state.photoURL,
 }).then(function() {
    // Update successful.
 }, function(error) {
    // An error happened.
 });

   try{
    var user= {
      email:this.state.email,
      password:this.state.password,
      displayName:this.state.firstname,
    }
     AsyncStorage.setItem('userData',JSON.stringify(user))
    
    this.props.navigation.navigate('Location')
  }catch(error){
    console.log(error);
  }

    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }

  render() {

    const Continue = () => {

    }
    return (
      <View style={styles.container}>

        {/* header start */}
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
        </View>
        {/* header end */}


        {/* name section */}
        {renderIf(this.state.nameContinue)(
          <View style={styles.divname}>
            <Text style={styles.txtName}>Add Your Name</Text>
          </View>
        )}

        {renderIf(this.state.nameContinue)(
          <View style={styles.div2} onLayout={this.onLayout}>
            <TextInput style={styles.input1}
              label="First Name*"
              type="text"
              onChange={(val) => this.changeFirstName(val.nativeEvent.text)}
            />
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>
              {renderIf(this.state.validfirst)(
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>Please Enter Your First name</Text>
              )}
            </View>
            <TextInput style={styles.input1}
              label="Last Name*"
              onChange={(val) => this.changeLastName(val.nativeEvent.text)}
            // secureTextEntry={true}
            />

            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>
              {renderIf(this.state.validlast)(
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>Please Enter Your Last name</Text>
              )}
            </View>
            <Button style={styles.btn1} mode="contained" onPress={this.onCheckValidationName}
            >
              Continue
            </Button>
          </View>
        )}

        {/* email section */}

        {renderIf(this.state.mailContinue)(
          <View style={styles.divmail}>
            <Text style={styles.txtMail}>Add Your email or Phone</Text>
          </View>
        )}

        {renderIf(this.state.mailContinue)(
          <View style={styles.div2mail} onLayout={this.onLayout}>
            <TextInput style={styles.input1}
              label="Email or Phone*"
              onChange={(val) => this.changephone(val.nativeEvent.text)}
            />
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>
              {renderIf(this.state.validphone)(
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>Please Enter Valid phone or email</Text>
              )}
            </View>
            <Button style={styles.btn1} mode="contained" onPress={this.onCheckValidationEmail}
            >
              Continue
            </Button>
          </View>
        )}

        {/* password section */}

        {renderIf(this.state.passwordContinue)(
          <View style={styles.divmail}>
            <Text style={styles.txtMail}>Set Your Password</Text>
          </View>
        )}

        {renderIf(this.state.passwordContinue)(
          <View style={styles.div2Password} onLayout={this.onLayout}>


            <TextInput style={styles.input1}
              label="Email or Phone*"
              onChange={(val) => this.changeEmail(val.nativeEvent.text)}
              value={this.state.email}

            />
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%' }}>
              {renderIf(this.state.validemail)(
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>Please Enter Valid email</Text>
              )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 10 }}>
              <TextInput style={styles.input1}
                label="Password*"
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


            {/* ************ */}

            <View style={styles.div3}>
              <Text style={{ color: 'gray', fontSize: 10 }}>6 or more characters</Text>
            </View>
            <View style={styles.div4}>
              <Text style={styles.txtagree}>
                By clicking Agree & Join, You agree to the LinkedIn <Text style={styles.fontChange}>User Agreement, Privacy Policy,</Text> and<Text style={styles.fontChange}>  Cookie Policy</Text>.For phone number signups we will send a verification code via SMS.
              </Text>
            </View>




            <Button style={styles.btn1} mode="contained" onPress={this.onCheckValidationPassword}
            >
              Agree & Join
            </Button>

            {/* ********** */}
          </View>
        )}




      </View>
    )
  }
}
const styles = StyleSheet.create({
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
  divname: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20
  },
  txtName: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black'
  },

  div2: {
    height: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    width: '100%',
    marginTop: 20
  },

  div2Password: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    width: '100%',
    marginTop: 20,
  },
  input1: {
    marginTop: '1%',
    height: 55,
    width: '90%',
    backgroundColor: 'none'

  },
  btn1: {
    marginTop: 40,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#0a66c2'
  },
  div3: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,

  },
  div4: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,

  },
  txtagree: {
    color: '#333333',
    fontSize: 12
  },
  fontChange: {
    color: '#0a66c2',
    fontWeight: 'bold',

  },
  divmail: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20
  },
  txtMail: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black'
  },

  txtMail: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black'
  },

  div2mail: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    width: '100%',
    marginTop: 20
  },

})