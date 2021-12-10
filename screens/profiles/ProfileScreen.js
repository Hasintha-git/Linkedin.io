import React, { Component } from 'react'
import { SafeAreaView, Text,View,TouchableOpacity,StyleSheet,StatusBar,Image,ScrollView } from 'react-native'
import { Avatar, TextInput, Appbar,Card,Button   } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
            coverimgPath: 'https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg',
            coverimgName:'',
            profileimgPath: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
            profileimgName:'',
            name:'Hasintha',
            about:'Company Owner at Hasiya Tech',
            address:'Colombo, Western, Sri Lanka',
            email:'diyanethhasintha@gmai.com'
        };
    }

    onFocusSearch = () => {
        this.setState({
            display1: false
        });
        this.setState({
            display2: true
        });
    }
    outFocusSearch = () => {
        this.setState({
            display1: true
        });
        this.setState({
            display2: false
        });
    }

    getimageFromGallery = () => {
        ImagePicker.openPicker({
          width: 400,
          height: 120,
          cropping: true
        }).then(image => {
          console.log(image.modificationDate);
          this.setState({
            coverimgPath: image.path
          })
    
          this.setState({
            coverimgName: image.modificationDate
          })
          console.log("imageName ==="+this.state.coverimgName);
    
        });
      }

      getiProfileFromGallery= () => {
        ImagePicker.openPicker({
          width: 100,
          height: 100,
          cropping: true
        }).then(image => {
          console.log(image.modificationDate);
          this.setState({
            profileimgPath: image.path
          })
    
          this.setState({
            profileimgName: image.modificationDate
          })
          console.log("imageName ==="+this.state.profileimgName);
    
        });
      }

  render() {
    return (
        
      <ScrollView style={{backgroundColor:'white',flex:1}}>
             <StatusBar backgroundColor="white"barStyle="dark-content"/>
           <View style={{ display: 'flex', width: '100%', borderBottomColor: 'gray', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={this.outFocusSearch}>

                        </TouchableOpacity>
                        <TextInput
                            style={{ width: '100%', height: 37 }}
                            placeholder="Search"
                            // onFocus={this.outFocusSearch}
                            underlineColor="transparent"
                            theme={{ colors: { primary: 'transparent' } }}
                            left={<TextInput.Icon name={() =>
                                <TouchableOpacity onPress={this.outFocusSearch}>
                                    <Icon name={'arrow-back'} size={20} color="gray" />
                                </TouchableOpacity>
                            } />}
                            right={<TextInput.Icon name={() =>
                                <TouchableOpacity onPress={this.outFocusSearch}>
                                    <Icon name={'settings'} size={20} color="gray" />
                                </TouchableOpacity>
                            } />}
                        />

                    </View>
                     <View style={{height:150,width:'100%'}}>
                     <View style={{backgroundColor:'grey',height:120,width:'100%'}}>
                     <Image
                        style={styles.coverimg}
                        source={{uri: this.state.coverimgPath}}
                        />
                         <Icon onPress={this.getimageFromGallery} style={styles.coverChange} name={'camera'}  size={25} color="white" />
                         </View>

                         <View style={styles.profile}>
                     <Image style={styles.profileimg} size={75} source={{uri: this.state.profileimgPath}} />
                     <Icon onPress={this.getiProfileFromGallery} style={styles.proChange} name={'camera'}  size={20} color="white" />
                     
                     </View>
                    </View>           
                  <View style={styles.nameSection}>
                      <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>{this.state.name}</Text>
                      <Text style={{fontSize:18,color:'black'}}>{this.state.about}</Text>
                      
                      <Text style={{fontSize:16,paddingTop:10,color:'black'}}>{this.state.name}</Text>
                      <Text style={{fontSize:16,color:'grey'}}>{this.state.address}</Text>
                  </View>
                    <Text style={{color:'#0a66c2',paddingLeft:15,fontWeight:'bold'}}>2 Connection</Text>


                    <View style={{width:'100%',height:60,justifyContent:'center',justifyContent:'space-around',flexDirection:'row'}}>
                      <Button style={styles.btn} mode="text"
                      >
                        <Text style={styles.txt}> Open to</Text>
                      </Button>
                      <Button style={styles.btn2} mode="text"
                      >
                        <Text style={styles.txt2}> Add section</Text>
                      </Button>
                      <Icon name="ellipsis-horizontal-circle-outline" size={36} color="#900"/> 

                    </View>

                    {/* dashboard section********* */}

                    <View style={{backgroundColor:'#DCDCDC',paddingLeft:5,paddingRight:5,paddingTop:10}}>
                            <Text style={{color:'black'}}>Your Dashboard</Text>
                            <Text style={{paddingBottom:20,color:'black',fontSize:12,fontStyle:'italic'}}>Private to you</Text>

                            <View style={{width:'100%',height:70,flexDirection:'row'}}>

                              <View style={{  padding:5,flex:1, height: 60,backgroundColor:'white',borderBottomLeftRadius:10,borderTopLeftRadius:10}}>
                              <Text style={{color:'black',fontWeight:'bold',color:'#0a66c2',fontSize:16}}>1</Text>
                                <Text style={{color:'black',fontSize:10}}>Who viewed your profile</Text>
                              </View>

                              <View style={{ padding:5,flex: 1, height: 60,backgroundColor:'white',borderWidth:1,borderBottomColor:'white',borderTopColor:'white'}}>
                                <Text style={{color:'black',fontWeight:'bold',color:'#0a66c2',fontSize:16}}>0</Text>
                                <Text style={{color:'black',fontSize:10}}>Post Views</Text>
                              </View>

                              <View style={{  padding:5,flex: 1, height: 60,backgroundColor:'white',borderBottomRightRadius:10,borderTopRightRadius:10 }}>
                              <Text style={{color:'black',fontWeight:'bold',color:'#0a66c2',fontSize:16}}>0</Text>
                                <Text style={{color:'black',fontSize:10}}>Search appearances</Text>
                              </View>

                            </View>

                            {/* *************** */}

                      <View style={{ width: '100%', height:220, flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', padding: 5, flex: 1, height: 50, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                          <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
                            <Icon name="radio" size={18} color="#696969" />
                          </View>
                          <View style={{ flex: 7,justifyContent:'center',paddingLeft:5 }}>
                            <Text style={{ color: 'black',  color: 'black', fontSize: 16 }}>Creator mode:<Text>off</Text></Text>
                            <Text style={{ color: 'black', fontSize: 10 }}>Creator mode highlights content on your profile and helps you get discovered by potential folloers</Text>
                          </View>
                        </View>

                        <View style={{flexDirection:'row', padding: 5, flex: 1, height: 50, backgroundColor: 'white', borderWidth: 1, borderLeftColor: 'white', borderRightColor: 'white' }}>
                          <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
                            <Icon name="people" size={18} color="#696969" />
                          </View>
                          <View style={{ flex: 7,justifyContent:'center',paddingLeft:5 }}>
                            <Text style={{ color: 'black', color: 'black', fontSize: 16 }}>My Network</Text>
                            <Text style={{ color: 'black', fontSize: 10 }}>Manage your connections, events, and interests</Text>
                          </View>
                        </View>

                      <View style={{ flexDirection:'row',padding: 5, flex: 1, height: 50, backgroundColor: 'white', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                        <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
                          <Icon name="bookmark" size={18} color="#696969" />
                        </View>
                        <View style={{ flex: 7, justifyContent:'center',paddingLeft:5 }}>
                          <Text style={{ color: 'black', color: 'black', fontSize: 16 }}>My items</Text>
                          <Text style={{ color: 'black', fontSize: 10 }}>Keep track of your jobs, courses, and articles</Text>
                        </View>
                      </View>

                      </View>
                      <View style={{height:10}}></View>
                    </View>


                    {/* contact section*** */}

                    <Text style={{color:'black',paddingLeft:10}}>Contact</Text>
                    <View style={{ width: '100%', height:150, flexDirection: 'column' }}>

<View style={{ flexDirection: 'row', padding: 5, flex: 1, height: 20, backgroundColor: 'white'}}>
  <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
    <Icon name="mail-open" size={24} color="#696969" />
  </View>
  {/* , borderWidth: 1, borderLeftColor: 'white', borderRightColor: 'white',borderTopColor:'white' */}
  <View style={{ flex: 7,justifyContent:'center',paddingLeft:5}}>
    <Text style={{ color: 'black',  color: 'black', fontSize: 18 }}>E-mail</Text>
    <Text style={{ color: 'grey', fontSize: 16 }}>{this.state.email}</Text>
  </View>
</View>

{/* <View style={{flexDirection:'row', padding: 5, flex: 1, height: 20, backgroundColor: 'white' }}>
  <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
    <Icon name="people" size={18} color="#696969" />
  </View>
  <View style={{ flex: 7,justifyContent:'center',paddingLeft:5, }}>
    <Text style={{ color: 'black', color: 'black', fontSize: 16 }}>My Network</Text>
    <Text style={{ color: 'black', fontSize: 10 }}>Manage your connections, events, and interests</Text>
  </View>
</View> */}



</View>
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  profile: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: 80,
    height: 80
  },
    coverimg: {
        width: '100%',
        height:  '100%',
        position:'absolute'
      },
      profileimg: {
        width: '100%',
        height:  '100%',
        position:'absolute',
        borderRadius:40
      },
      coverChange: {
          bottom:0,
          right:0,
          position:'absolute',
          padding:5
      },
      proChange: {
        bottom:0,
        right:0,
        position:'absolute',
        padding:10
    },
      nameSection: {
        width:'100%',
        height:120,
        justifyContent:'center',
        paddingLeft:15
      },
  btn: {
    backgroundColor: '#0a66c2',
   
    width: '40%',
    height: 38,
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    color:'white',
    alignItems:'center'
  },
  btn2: {

   
    width: '40%',
    height: 38,
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    alignItems:'center',
    borderColor:'black',
    borderWidth:1
  },
  txt: {
    color: 'white',
    fontFamily: 'lucida grande',
  },
  txt2: {
    color: 'black',
    fontFamily: 'lucida grande',
  },
})




