import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, View ,Image} from 'react-native';
import Header from '../../component/header/Header';

export default class Jobs extends Component {
  render() {
    const img="../../asserts/img/loading.png"
    return (
      <SafeAreaView style={styles.container}>
        <Header/>
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <Image
           style={{width:200,height:200}} 
          source={require(img)}
        />
         <Text style={{color:'#333333',fontSize:18,fontWeight:'bold'}}>Jobs</Text>
       <Text style={{color:'grey',fontSize:20,fontWeight:'bold'}}>Development Stages</Text>
      </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center'
    },
  })
  
  