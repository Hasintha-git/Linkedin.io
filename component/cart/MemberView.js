import React, { Component } from 'react'
import MemberCart from './MemberCart'
import { ScrollView, StyleSheet, SafeAreaView, View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';

export default class MemberView extends Component {
  render() {
    return (
        <>
            <ScrollView style={{backgroundColor:'white',}}>
            <View style={{flex: 1, flexDirection: 'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
        <MemberCart/>
     
      </View>
            </ScrollView>
        </>
    )
  }
}
