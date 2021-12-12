import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, FAB, Button,Switch , TextInput } from 'react-native-paper';
import renderIf from 'render-if';
import ProfileImage from './ProfileImage';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class JobOrStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
         location:'',
         isSwitchOn:false,
        studentDetails:false,
        uni:'',
        degree:'',
        specialization:'',
        jobTitle:'',
        jobCompany:''
        };
    
      }

      studentUni=(e)=> {
        this.setState({ uni: e });
      }

      studentDeg=(e)=> {
        this.setState({ degree: e });
    }

    studentSpe=(e)=> {
        this.setState({ specialization: e });
    }

    jobTitle=(e)=> {
        this.setState({ jobTitle: e });
    }
    jobCompany=(e)=> {
        this.setState({ jobCompany: e });
    }
    changeLocation = (e) => {
        this.setState({ location: e });
      }


      clickNext = () => {

        if (this.state.isSwitchOn) {
          console.log("true"+this.state.isSwitchOn);
          try{
            var user= {
              uni:this.state.uni,
              degree:this.state.degree,
              specialization:this.state.specialization,
              isstudent:true
            }
             AsyncStorage.setItem('userMore',JSON.stringify(user))
            
            this.props.navigation.navigate('ProfileImage')
          }catch(error){
            console.log(error);
          }

          
        } else {

          try{
            var user= {
              jobTitle:this.state.jobTitle,
              jobCompany:this.state.jobCompany,
              isstudent:false
            }
             AsyncStorage.setItem('userMore',JSON.stringify(user))
            
            this.props.navigation.navigate('ProfileImage')
          }catch(error){
            console.log(error);
          }

          
          console.log("false"+this.state.isSwitchOn);
        }
    
        console.log(this.state.isSwitchOn);
      }

      onToggleSwitch = () => {
        this.setState({
            isSwitchOn:!this.state.isSwitchOn,
        });
        if(this.state.isSwitchOn){
            this.setState({
                studentDetails:false,
     
            });
        }else{
            this.setState({
                studentDetails:true,
     
            });
        }

      
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
            <Text style={styles.txtName}>Your Profile helps you discover people and opportunities</Text>
            
          </View>

          <View style={{width:'100%',height:50,justifyContent:'flex-end',flexDirection:'row'}}>
          <View style={{ paddingTop:15,position:'absolute',left:22}}>
                    <Text style={{color:'grey'}}>I'm a Student</Text>   
                </View>
                <View style={{ justifyContent:'center',alignItems:'flex-start'}}>
                {renderIf(this.state.isSwitchOn)(
                    <Text style={{color:'grey'}}>Yes</Text>  
                )} 
                {renderIf(!this.state.isSwitchOn)(
                    <Text style={{color:'grey'}}>No</Text>  
                )} 
                </View>

                <Switch value={this.state.isSwitchOn} onValueChange={this.onToggleSwitch} />
          
              

          </View>
          
          {renderIf(this.state.studentDetails)(
            <KeyboardAvoidingView>
                <View style={{justifyContent:'center',alignItems:'center'}}>
          <TextInput style={styles.input1}
              label="Univercity or School"
              onChange={(val) => this.studentUni(val.nativeEvent.text)}
            />
             <TextInput style={styles.input1}
              label="Degree"
              onChange={(val) => this.studentDeg(val.nativeEvent.text)}
            />
             <TextInput style={styles.input1}
              label="Specialization"
              onChange={(val) => this.studentSpe(val.nativeEvent.text)}
            />
          </View>
          </KeyboardAvoidingView>
                )}

{renderIf(!this.state.studentDetails)(
  <KeyboardAvoidingView>
       <View style={{justifyContent:'center',alignItems:'center'}}>
       <TextInput style={styles.input1}
           label="Job Title*"
           onChange={(val) => this.jobTitle(val.nativeEvent.text)}
         />
          <TextInput style={styles.input1}
           label="Company*"
           onChange={(val) => this.jobCompany(val.nativeEvent.text)}
         />
       </View>
       </KeyboardAvoidingView>
)}

          <View style={{justifyContent:'center',alignItems:'center',top:50,position:'absolute',width:'100%',position:'relative'}}>
          <Button style={styles.btn1} mode="contained" onPress={this.clickNext}
            >
              Next
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
        marginTop: 20,
        paddingBottom:20
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
    });