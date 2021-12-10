import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, FAB, Button,Paragraph, TextInput } from 'react-native-paper';

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
         location:''
    
        };
    
      }
    changeLocation = (e) => {
        this.setState({ location: e });
      }


      clickNext = () => {
        this.props.navigation.navigate('JobOrStudent')
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
            <Text style={styles.txtName}>Confirm Your Location</Text>
            
          </View>
          <Text style={styles.txtSub}>See people, Jobs, and news in your area.</Text>

          <Text style={styles.txtLbl}>Location*</Text>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <TextInput style={styles.input1}
              label="enter your location"
              onChange={(val) => this.changeLocation(val.nativeEvent.text)}
            />
          </View>
        
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
    });