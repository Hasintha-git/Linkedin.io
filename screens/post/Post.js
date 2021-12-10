import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import Header from '../../component/header/Header';
import { Avatar, TextInput, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from '../Home/Home';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import renderIf from 'render-if';


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sample@gmail.com',
      url: '../../asserts/img/user.png',
      imagePath: '../../asserts/img/user.png',
      imageName: '',
      postbody:'',
      uploadedImgUrl:'empty',
      displayName:''

    };
  }


  
  changePostTxt = (e) => {

    this.setState({ postbody: e });


  }

  closePost = () => {
    alert("close")

  }

   submitPost= async()=> {


    console.log(this.state.email);
    console.log(this.state.uploadedImgUrl);
    console.log(this.state.postbody);



       await firestore().collection('posts').add({
          userEmail:this.state.email,
          post:this.state.postbody,
          postImg:this.state.uploadedImgUrl,
          postTime:firestore.Timestamp.fromDate(new Date()),
          like:null,
          comment:null,
          displayName:this.state.displayName
        })
        .then(()=> {
          alert('added success')
          console.log('post added!');
        })
        .catch((error)=> {
          console.log('something went wrong !!');
        })

  

  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          let user = JSON.parse(value)
          this.setState({ displayName: user.displayName });
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  getimageFromGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image.modificationDate);
      this.setState({
        imagePath: image.path
      })

      this.setState({
        imageName: image.modificationDate
      })
      console.log("imageName ==="+this.state.imageName);

    });
  }

  UploadImage = async () => {
    const fileName = this.state.imageName + ".jpg";

    console.log("**"+fileName);
    await storage().ref(`images/${fileName}`).putFile(this.state.imagePath)
    // await reference.putFile(this.state.imagePath);


     const url = await storage().ref(`images/${fileName}`).getDownloadURL();
    console.log(url);
    // console.log(url);

    this.setState({
      uploadedImgUrl: url
    })
   
    // console.log(url);
    this.submitPost()

  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.Header}>

          <TouchableOpacity style={styles.Avatar} onPress={this.closePost}>

            <Icon name="close" size={28} color="gray" />
          </TouchableOpacity>

          <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, marginLeft: 10, borderRadius: 5 }}>
            {/* <Icon name="search" size={16} color="#900" /> */}
            <Text style={{ color: 'black', fontSize: 20 }}>Share Post</Text>
          </View>

          <View style={{ flex: 1.5, alignItems: 'center' }}>
            <TouchableOpacity onPress={this.UploadImage}>
              <Text style={{ color: 'grey', fontSize: 16 }}>Post</Text>
            </TouchableOpacity>
          </View>




        </SafeAreaView>

        <ScrollView style={styles.divscroll}>


          {/* <Header/> */}
          <View style={styles.div1}>
            <View style={styles.divimg}>
              <Avatar.Image size={40} source={require('../../asserts/img/user.png')} />

            </View>

            <View style={styles.divimgtxt}>
              <View style={styles.divimgtxt1}>
                <Text style={{ color: 'black', fontSize: 16 }}>{this.state.displayName}</Text>
              </View>
              <View style={styles.divimgtxt2}>
                <View style={{ flexDirection: 'row', backgroundColor: '#FFF0F5', width: 100, height: '60%', justifyContent: 'space-around', alignItems: 'center', borderRadius: 30 }}>
                  <Icon name="globe" size={14} color="#900" />
                  <Text style={{ fontSize: 12, color: 'black' }}>Anyone</Text>
                  <Icon name="chevron-down" size={16} color="#900" />
                </View>
              </View>
            </View>
          </View>


          <View style={{ height: '100%', width: '100%' }}>
            <TextInput
              multiline
              placeholder="Write something with multilines  here.."
              underlineColor="transparent"
              theme={{ colors: { primary: 'transparent' } }}
              style={{
                backgroundColor: 'none',
                width: '100%',
              }}
              onChange={(val) => this.changePostTxt(val.nativeEvent.text)}
            />
            <View style={styles.divimgview}>
              <Image

                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                source={{ uri: this.state.imagePath }}

              />
            </View>



          </View>

        </ScrollView>
   
        <View style={styles.bottombar}>
          <TouchableOpacity onPress={this.getimageFromGallery}>
            <Icon name="image" size={22} style={{ color: 'gray' }} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="videocam" size={22} style={{ color: 'gray' }} />
          </TouchableOpacity>
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
    alignItems: 'center',

  },
  Header: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowBottomRadius: 2,
    elevation: 1,
    overflow: 'hidden',
    borderTopWidth: 0,

  },
  Avatar: {
    width: 37,
    height: 37,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'none'
  },
  search: {
    height: 37

  },
  input: {
    width: '100%',
    height: 37
  },
  div1: {
    width: '100%',
    height: 70,
    flexDirection: 'row'
  },
  divscroll: {
    height: '100%',
    width: '100%',
  },
  divimg: {
    width: '25%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divimgtxt: {
    width: '75%',
    height: 70,
    flexDirection: 'column',

  },
  divimgtxt1: {
    height: 35,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  divimgtxt2: {
    height: 35,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  bottombar: {
    width: '100%',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',

    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,

  },
  divimgview: {
    height: 400,
    width: '100%',
    padding: 10,

  }

})

