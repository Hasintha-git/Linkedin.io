import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, View, ScrollView,TouchableOpacity,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PostView from '../../component/posts/PostView';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sample@gmail.com',
      password: '',
      refreshing:false,
      

    };
  }


// getData=()=> {
//     try{
//         AsyncStorage.getItem('userData').then(value=>{
//             if (value!=null) {
//               let user=JSON.parse(value)
//                 this.setState({ email: user.email });
//                 this.setState({ password: user.password });
//             }
//         })

//     }catch(error){
//         console.log(error);
//     }
// }


  render() {
   
    return (
      <SafeAreaView style={styles.container}>
        <Header/>
        {/* <ScrollView style={styles.PostView}>
        <PostView/>
         
        </ScrollView> */}
        <View style={styles.PostView}>
        <FlatList
          data={PostView}
          renderItem={({item})=> <PostView item={item}/>}
          // keyExtractor={item=>item.id}
          showsVerticalScrollIndicator={false}
          // refreshing={this.state.refreshing}
          // onRefresh={this.hadleRefresh}
        >

        </FlatList>
        </View>
       



     
        
            
      </SafeAreaView>
      
    )
  }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
      width:'100%'
      
    },
    PostView: {
      width:'100%',
      backgroundColor:'grey'

    },
    
  })
  