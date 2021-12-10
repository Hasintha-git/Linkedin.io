import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    View, FlatList, TouchableOpacity, 
    Image, SafeAreaView } from 'react-native';
import ic_menu from '../../asserts/img/linkedin.png'
import Drawer from 'react-native-drawer'
console.disableYellowBox = true;

const menu = [
    { 'title': 'Home' },
    { 'title': 'Wishlist' },
    { 'title': 'Avout us' },
    { 'title': 'Contact us' },
    { 'title': 'Log out' }
]

export default class DrawerSider extends Component {

    constructor(props) {
        super(props)

    }

    renderDrawer() {
        //SlideMenu
        return (
            <View style={styles.menuContainer}>
                <FlatList
                    style={{ flex: 1.0 }}
                    data={menu}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}>
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    }

    openDrawer() {
        this.drawer.open()
    }

    closeDrawer() {
        this.drawer.close()
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaStyle}>
                <View style={styles.mainContainer}>
                    <Drawer
                        ref={(ref) => this.drawer = ref}
                        content={this.renderDrawer()}
                        type='static'
                        tapToClose={true}
                        openDrawerOffset={0.35}
                        styles={drawerStyles}>
                        {/* //Main View */}
                        <View style={styles.headerContainer}>
                            <View style={styles.menuButton}>
                                <TouchableOpacity
                                    onPress={this.openDrawer.bind(this)}>
                                    <Text>Click me</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerTitle}>DRAWER</Text>
                            <View style={styles.menuButton} />
                        </View>
                    </Drawer>
                </View>
            </SafeAreaView>
        );
    }
}

const drawerStyles = {
    drawer: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    main: {
        flex: 1.0,
        backgroundColor: 'white'
    }
}

const styles = {
    mainContainer: {
        flex: 1.0,
        backgroundColor: 'white'
    },
    safeAreaStyle: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    headerContainer: {
        height: 44,
        flexDirection: 'row',
        justifyContect: 'center',
        backgroundColor: '#3B5998',
    },
    headerTitle: {
        flex: 1.0,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white'
    },
    menuButton: {
        marginLeft: 8,
        marginRight: 8,
        alignSelf: 'center',
        tintColor: 'white'
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    menuTitleContainer: {
        alignItem:'center',
        height: 60,
        width:'100%',
        flexDirection:'row',
    },
    menuTitle: {
        width:'100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf:'center',
    }
}