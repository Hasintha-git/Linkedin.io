import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewMoreText from 'react-native-view-more-text';
import firestore from '@react-native-firebase/firestore';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sample@gmail.com',
      url: '../../asserts/img/user.png',
      imagePath: '../../asserts/img/user.png',
      imageName: '',
      postbody: 'Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.',
      uploadedImgUrl: 'https://firebasestorage.googleapis.com/v0/b/linkedin-clone-3b2b2.appspot.com/o/images%2F1638555468000.jpg?alt=media&token=448ef527-1ad9-4902-b371-7e2bda62b8b5',
      privacy: 'Anyone',
      likebtn: 'thumbs-up-outline',
      cmntbtn: 'chatbox-outline',
      allLikes: 0,
      allCmnt: 0,
      userImage: '../../asserts/img/user.png',
      postList: [],
      postCount: 0,
      postId:[],
      liked:false

    };
  }

  async componentDidMount() {
    //= =======================================

    await firestore()
      .collection('posts')
      .orderBy('postTime')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        this.setState({
          postCount: querySnapshot.size
        })
        let posts = []
        let postId=[]
        querySnapshot.forEach(documentSnapshot => {
          postId.push(documentSnapshot.id)
          posts.push(documentSnapshot.data())
        });

        this.setState({
          postId: postId,
        })
        this.setState({
          postList: posts,
        })
  
      }).then(error => {
        console.log(error);
      })
      
    console.log(this.state.postList);
    //= ========================================
  }



  likePress = (user) => {
    
    this.setState({
      likebtn: 'thumbs-up'
    })

    if (!this.state.liked ) {
      this.setState({
        allLikes: this.state.allLikes + 1
      })

      this.updateLike(user)
    } else {

      console.log('already like');
    }

  }

  updateLike=(user)=> {
    firestore()
  .collection('posts')
  .doc(user)
  .update({
    like: this.state.allLikes,
  })
  .then(() => {
    this.setState({
      liked:false
    })
    console.log('like updated!'+user);
  });
  }


  commentPress = () => {
    alert("pending development")

  }





  render() {
 
    const img = '../../asserts/img/user.png'
    return (

      <>
        {this.state.postList.map((postList,index) => <View style={styles.container} key={this.state.postId[index]} >
          
          {/* user details  */}
          <View style={styles.div1} >

            <View style={styles.divimg}>
              <Avatar.Image size={40} source={require(img)} />
            </View>

            <View style={styles.divimgtxt}>
              <View style={styles.divimgtxt1}>
                <Text style={{ color: 'black', fontSize: 16 }}>{postList.displayName}</Text>
              </View>
              <View style={styles.divimgtxt2}>
                <View style={{ flexDirection: 'row', height: '60%', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: 'black' }}>  {postList.postTime.toDate().toISOString()}</Text>
                
                  <Icon name="globe" size={14} color="#900" style={{ paddingLeft: 10 }} />
                </View>
              </View>
            </View>

          </View>

          {/* post body */}
          <ViewMoreText
            numberOfLines={1}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            textStyle={{ textAlign: 'left',paddingLeft:10, color: 'black' }}

          >
            <Text>
              {postList.post}
            </Text>
          </ViewMoreText>


          {/* image here */}
          <View style={styles.divimgview}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: postList.postImg }}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
          </View>

          {/* like & comment section */}
          <View style={styles.bottomLikeCommentViewbar}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="thumbs-up-outline" size={14} style={{ color: 'gray' }} />
              <Text style={{ color: 'black', paddingLeft: 10 }}>{postList.like}</Text>
            </View>
            <View>
              <Text style={{ color: 'black' }}>{this.state.allCmnt} Comment</Text>

            </View>
          </View>

          <View style={styles.bottombar}>
            <TouchableOpacity onPress={() => this.likePress(this.state.postId[index])}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={this.state.likebtn} size={16} style={{ color: 'gray' }} />
                <Text style={{ color: 'black' }}>Like</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.commentPress}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={this.state.cmntbtn} size={16} style={{ color: 'gray' }} />
                <Text style={{ color: 'black' }}>Comment</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>)}

      </>



    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: 'white',
    height: 600,
    width: '100%',
    marginTop: 5,
    // alignItems: 'center',

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
    height: 30,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  divimgview: {
    height: 400,
    width: '100%',
    padding: 10,

  },
  bottombar: {
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: 'grey',
    borderTopWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,

  },
  bottomLikeCommentViewbar: {
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',


  },


})

