import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import Header from '../../component/header/Header';
import {} from '../../asserts/img/loading.png'
import MemberCart from './../../component/cart/MemberCart';

export default class MyNetwork extends Component {
  render() {
    const img="../../asserts/img/loading.png"
    return (
      <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView style={{backgroundColor:'white',}}>
            <View style={{flex: 1, flexDirection: 'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        <MemberCart/>
     
     
      </View>
            </ScrollView>
    </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
    },
  })
  
  