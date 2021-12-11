import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {  FAB, Button,Paragraph, TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import renderIf from 'render-if';

export default class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
         imgUrl:'http://assets.stickpng.com/thumbs/584abeed2912007028bd9331.png',
         name:'Hasintha Diyaneth',
         details:'Software Intern at Epic Technology',
         imageName:'',
         uploadedImgUrl:"none",
         location:"none",
         isstudent:"none",
         jobTitle:"none",
         jobCompany:"none",
         uni:"none",
         degree:"none",
         specialization:"none",
         displayName:"none",
         email:"none"
        };
    
      }
      async componentDidMount() {
        this.getDataToasyn()
      }

      getDataToasyn= async()=>{
        console.log("componentDidMount");
        try {
          await AsyncStorage.getItem('userMore').then(value => {
            if (value != null) {
              let user = JSON.parse(value)
              console.log(user);
              this.setState({ isstudent: user.isstudent });
              this.setState({ uni: user.uni });
              this.setState({ degree: user.degree });
              this.setState({ specialization: user.specialization });
              this.setState({ jobTitle: user.jobTitle });
              this.setState({ jobCompany: user.jobCompany });

            }
            console.log(this.state.jobTitle);
          })


        } catch (error) {
          console.log(error);
        }

        try {
          await AsyncStorage.getItem('userData').then(value => {
            if (value != null) {
              let user = JSON.parse(value)
              this.setState({ email: user.email });
              this.setState({ displayName: user.displayName });
            }
            console.log("userData"+value);
          })


        } catch (error) {
          console.log(error);
        }


        try {
          await  AsyncStorage.getItem('location').then(value => {
            if (value != null) {
              let user = JSON.parse(value)
              this.setState({ location: user.location });
            }
            console.log("location"+value);
          })


        } catch (error) {
          console.log(error);
        }

      }
      saved= async()=> {
        console.log(this.state.degree+"*degree"+this.state.email+"*email"+this.state.uploadedImgUrl+"*profileImg"+this.state.displayName+"*displayName"+this.state.uni+"*uni"+this.state.specialization+"*specialization"+this.state.isstudent+"*isstudent"+this.state.location+"*location"+this.state.jobTitle+"*jobTitle"+this.state.jobCompany+"*jobCompany");

        if (this.state.isstudent) {
          await firestore().collection('user').add({
            email:this.state.email,
            profileImg:this.state.uploadedImgUrl,
            displayName:this.state.displayName,
            uni:this.state.uni,
            degree:this.state.degree,
            specialization:this.state.specialization,
            isstudent:this.state.isstudent,
            location:this.state.location,
         updateTime:firestore.Timestamp.fromDate(new Date()),
          })
          .then(()=> {
            alert('added success')
            this.props.navigation.navigate('Tabs')
            console.log('user details saved!');
          })
          .catch((error)=> {
            this.props.navigation.navigate('RegistrationHome')
            console.log('something went wrong !!');
          })

        } else {
          await firestore().collection('user').add({
            email:this.state.email,
            profileImg:this.state.uploadedImgUrl,
            displayName:this.state.displayName,
            isstudent:this.state.isstudent,
            location:this.state.location,
            jobTitle:this.state.jobTitle,
         jobCompany:this.state.jobCompany,
         updateTime:firestore.Timestamp.fromDate(new Date()),
          })
          .then(()=> {
            alert('added success')
            this.props.navigation.navigate('Tabs')
            console.log('user details saved!');
          })
          .catch((error)=> {
            this.props.navigation.navigate('RegistrationHome')
            console.log('something went wrong !!');
          })
        }
          
        
        

      }


    changeLocation = (e) => {
        this.setState({ location: e });
      }


      clickSkip = () => {
        this.props.navigation.navigate('Tabs')
      }

      getimageFromGallery = () => {
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image.modificationDate);
          this.setState({
            imgUrl: image.path
          })
    
          this.setState({
            imageName: image.modificationDate
          })
          console.log("imageName ==="+this.state.imageName);
    
        });
      }

      clickAddPhoto =async () => {
        const fileName = this.state.imageName + ".jpg";

        console.log("**"+fileName);
        await storage().ref(`images/${fileName}`).putFile(this.state.imgUrl)
        // await reference.putFile(this.state.imagePath);
    
    
         const url = await storage().ref(`images/${fileName}`).getDownloadURL();
        console.log(url);
        // console.log(url);
    
         this.setState({
          uploadedImgUrl: url
        })
        try{
          var user= {
            uploadedImgUrl:this.state.uploadedImgUrl,
          }
           await AsyncStorage.setItem('userProfileImg',JSON.stringify(user))
          
           this.saved()
        }catch(error){
          console.log(error);
        }


        console.log(this.state.uploadedImgUrl);
     
       
        // this.props.navigation.navigate('Tabs')
      }

   


    

      getSavedStorage=()=> {
        console.log("getSavedStorage");
       
    }
   
  render() {
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

        <View style={styles.divname}>
            <Text style={styles.txtName}>Adding a photo helps people recognize you</Text>
            
          </View>

            <View style={styles.box}>
                <View style={styles.imgbox}>
                    <View style={{backgroundColor:'#DCDCDC',width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center'}} >
                        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={this.getimageFromGallery} >
                            <Image
                                style={{ width: '100%', height: '100%', opacity: 1,borderRadius:50 }}
                                source={{ uri: this.state.imgUrl }}
                            />
                        </TouchableOpacity>
                     
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:20,paddingTop:20}}>{this.state.displayName}</Text>
                    {renderIf(this.state.isstudent)(
                    <Text style={{color:'black',fontSize:16,paddingTop:10}}>{this.state.degree} - {this.state.uni}</Text>
                    )}
                     {renderIf(!this.state.isstudent)(
                    <Text style={{color:'black',fontSize:16,paddingTop:10}}>{this.state.jobTitle} at {this.state.jobCompany}</Text>
                    )}
                    </View>
                    
                </View>
            </View>

          
          <View style={{justifyContent:'center',alignItems:'center',bottom:20,position:'absolute',width:'100%'}}>
          <Button style={styles.btn1} mode="contained" onPress={this.clickAddPhoto}
            >
              Add a photo
            </Button>

            <Button style={styles.btn2} mode="text" onPress={this.clickSkip}
            >
              <Text style={{color:'grey'}}>Skip for now</Text>
            </Button>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    divname: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: 20
      },
      txtName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        color: 'black'
      },
      txtSub : {
          fontSize:16,
          color:'grey',
          marginLeft: 20,
          marginTop:10
      },
      input1: {
        marginTop: '1%',
        height: 55,
        width: '90%',
        backgroundColor:'none'
    
      },
      txtLbl: {
          color:'grey',
          fontSize:18,
          marginLeft: 25,
          marginTop:30
      },
      btn1: {
        marginTop: 40,
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
        color:'grey'
      },
      box: {
          width:'100%',
          height:350,
          alignItems:'center',
          justifyContent:'center'
      },
    imgbox: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
    });