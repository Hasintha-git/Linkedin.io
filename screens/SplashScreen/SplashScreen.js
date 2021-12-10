import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image, div } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

export default class SplashScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: 'sample@gmail.com',
      password: '123456987',
    };

  }
  componentDidMount() {
    this.getSavedStorage()
  }

  getSavedStorage=()=> {
    try{
        AsyncStorage.getItem('userData').then(value=>{
            if (value!=null) {
              let user=JSON.parse(value)
                this.setState({ email: user.email });
                this.setState({ password: user.password });
                this.getDataToFirebase()
            }else{
              setTimeout(() => {
                this.props.navigation.navigate('RegistrationHome')
              }, 2000);
            }
        })

    }catch(error){
     console.log(error);
    }
}

getDataToFirebase=()=> {
  auth()
  .signInWithEmailAndPassword(this.state.email, this.state.password)
  .then((user) => { 
    console.log(user);
    console.log('login succes');
    setTimeout(() => {
      this.props.navigation.navigate('Tabs')

    }, 2000);
  })
  .catch(error => {
    this.props.navigation.navigate('RegistrationHome')
  });
}

    // componentDidMount(){
    //     setTimeout(() => {
    //       this.props.navigation.navigate('RegistrationHome')
    //     }, 2000);
    //    }
  render() {
    return (
        <View style={styles.container}> 

        <StatusBar backgroundColor="#e9e6df"barStyle="dark-content"/>
        <View style={styles.div1}>
        
        <Image
                     source={require('../../asserts/img/linkedinlogo.png')}
                     resizeMode="contain"
                     style={{
                         width:200,
                         height:200,
                         alignItems:'center',
                         justifyContent:'center'
                         // tintColor:'red'
                     }}
                     PlaceholderContent={<ActivityIndicator />}
                     />
                  </View>   
                  <View style={styles.div2}></View>
         {/* <Text style={styles.txt}>Expense Tracking</Text> */}
           {/* <ActivityIndicator size='large' color='blue' style={{margin:10}}/> */}
       </View>
    )
  }
}
const styles=StyleSheet.create({
    txt:{
        color:'#333333',
        fontSize:23,

        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
        fontFamily:'lucida grande',
    },
    container:{
        flex:1,
        backgroundColor:'black',
      },
      div1: {
        backgroundColor:'#1c2228',
        flex:2,
        // borderBottomRightRadius:100,
        // borderBottomLeftRadius:100,
        borderBottomStartRadius:120,
        borderBottomEndRadius:120,
        borderBottomWidth:20,
        alignItems:'center',
        justifyContent:'flex-end'
        // borderBottomEndRadius:100
      },
      div2:{
          flex:1
      }
  });