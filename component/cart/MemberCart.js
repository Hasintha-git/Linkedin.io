import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default class MemberCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userImg: 'https://usergenerator.canekzapata.net/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg',
            name:'Hasintha Diyaneth',
            WhatToDo:'Intern at Epic Technology',
            workPlace:'Epic Lanka',
            userCount:0,
            userList: [],
            userId: [],
        };
    }

    async componentDidMount() {
        await firestore()
            .collection('user')
            .orderBy('updateTime')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                this.setState({
                    userCount: querySnapshot.size
                })
                let users = []
                let userId = []
                querySnapshot.forEach(documentSnapshot => {
                    userId.push(documentSnapshot.id)
                    users.push(documentSnapshot.data())
                });

                this.setState({
                    userId: userId,
                })
                this.setState({
                    userList: users,
                })

            }).then(error => {
                console.log(error);
            })

        console.log(this.state.userList);
    }

    render() {
        return (
            <>
            {this.state.userList.map((userList, index) => <View style={styles.container} key={this.state.userId[index]} > 

                <View style={styles.imgSection}>
                    <View style={styles.cover}></View>
                    <View style={styles.profile}>
                        <Image
                            style={{ width: '100%', height: '100%', borderRadius: 50 }}
                            source={{ uri: userList.profileImg }}
                        />
                    </View>
                </View>

                <View style={styles.nameBox}>
                    <Text style={styles.name}>{userList.displayName}</Text>

 
                    <Text style={styles.whatTodo}>{userList.jobTitle} at {userList.jobCompany}</Text>
                        
                

                    <Text style={styles.work}>{userList.jobCompany}</Text>
                </View>

                <View style={styles.btnSection}>
                    <Button style={styles.btnConnect} mode='outlined'
                    >
                        <Text style={styles.txt}>Connect</Text>
                    </Button>
                </View>

            </View>)}
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 250,
        width: 160,
        shadowColor: "#000",
        borderWidth: 0.0,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.41,

        elevation: 2,
        display: 'flex'
        // alignItems: 'center',
    },
    cover: {
        width: '100%',
        height: 50,
        backgroundColor: 'grey',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        top: 0,
        position: 'absolute'
    },
    imgSection: {
        width: '100%',
        height: 100,

        justifyContent: 'center',
        alignItems: 'center'
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'absolute',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.41,

        elevation: 2,
    },
    name: {
        color: 'black',
        fontSize: 14
    },
    whatTodo: {
        color: 'grey',
        fontSize: 13,
        textAlign:'center'
    },
    work: {
        color: 'grey',
        fontSize: 11,
        paddingTop: 10
    },
    nameBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        overflow:'hidden'
    },
    btnConnect: {
        width: 120,
        height: 37,
        borderRadius: 25,
        borderColor: '#0a66c2',
        justifyContent: 'center'
    },
    txt: {
        color: '#0a66c2',
        fontFamily: 'lucida grande',
        fontSize: 12
    },
    btnSection: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position:'absolute',
        bottom:10
    }

})
