import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, FAB, Button,Switch , TextInput } from 'react-native-paper';
import renderIf from 'render-if';

export default class JobOrStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
         location:'',
         isSwitchOn:false,
        studentDetails:false
        };
    
      }
    changeLocation = (e) => {
        this.setState({ location: e });
      }


      clickNext = () => {
        console.log(this.state.isSwitchOn);
      }

      onToggleSwitch = () => {
        this.setState({
            isSwitchOn:!this.state.isSwitchOn,
        });
        if(this.state.isSwitchOn){
            this.setState({
                studentDetails:this.state.isSwitchOn,
     
            });
            console.log(this.state.isSwitchOn);
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
          <View style={{ paddingTop:15,position:'absolute',left:10}}>
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
                <View style={{justifyContent:'center',alignItems:'center'}}>
          <TextInput style={styles.input1}
              label="enter your Edu"
              onChange={(val) => this.changeLocation(val.nativeEvent.text)}
            />
          </View>
                )}

{renderIf(!this.state.studentDetails)(
       <View style={{justifyContent:'center',alignItems:'center'}}>
       <TextInput style={styles.input1}
           label="enter your Job"
           onChange={(val) => this.changeLocation(val.nativeEvent.text)}
         />
       </View>
)}
          <View style={{justifyContent:'center',alignItems:'center',bottom:20,position:'absolute',width:'100%'}}>
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