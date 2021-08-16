import React, { Component } from 'react';
import { FlatList, Button, Alert, Image, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
// import * as LocalAuthentication from 'expo-local-authentication';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class MessageScreen extends Component {

    groupArray = [
        {
            group_name: 'Create New Group',
            group_image: ''
        },
        {
            group_name: 'Family',
            group_image: require('../assets/group1.png')
        },
        {
            group_name: 'House in Warri',
            group_image: require('../assets/group2.png')
        },
        {
            group_name: '2021 Reunion',
            group_image: require('../assets/group3.png')
        }

    ]

    notificationArray = [
        {
            name: 'Valerie',
            image: require('../assets/notification1.png'),
            message: "i'd send you $90 for the clothes",
            count: 2,
            time: '3:16pm'
        },
        {
            name: 'Victor',
            image: require('../assets/notification2.png'),
            message: "i'd send you $90 for the clothes",
            count: 1,
            time: '2:57pm'
        },
        {
            name: 'Yemi',
            image: require('../assets/notification3.png'),
            message: "i'd send you $90 for the clothes",
            count: 0,
            time: 'Yesterday'
        },
        {
            name: 'Wale',
            image: require('../assets/notification4.png'),
            message: "i'd send you $90 for the clothes",
            count: 0,
            time: 'Yesterday'
        },
        {
            name: 'Yomi',
            image: require('../assets/notification5.png'),
            message: "i'd send you $90 for the clothes",
            count: 0,
            time: 'Yesterday'
        },


    ]


    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;

        this.state = {
            searchText: '',
            isBiometricSupported: ''
        }
    }

    async componentDidMount() {

        this.checkDeviceForHardware();
        this.checkForBiometrics();

        if (!this.state.scanned) {
            this.handleAuthentication();
        }


    }

    filterList = (text) => {
        console.log(text)
        this.state.searchText = text
    };
    createGroup = () => {
        this.props.navigation.navigate('AddParticipantScreen')
    }
    groupCollectionDesign(item, index) {
        console.log("index : ", index)
        if (index == 0) {
            return (
                <View style={styles.createGroupView}>
                    <TouchableOpacity onPress={() => this.createGroup()}>
                        <View style={styles.createGroupSubView}>
                            <Image style={styles.createGroupIcon}
                                source={require('../assets/3Friends.png')}></Image>
                        </View>
                        <Text style={styles.createGroupText}
                            numberOfLines={2}
                        >{item.group_name}</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{}}>

                    <Image style={styles.groupIcon}
                        source={item.group_image}></Image>
                    <Image style={styles.notificationIcon}
                        source={require('../assets/dollar-icon.png')}></Image>
                    <Text style={styles.groupnameText}
                        numberOfLines={2}
                    >{item.group_name}</Text>
                </View>
            )
        }
    }

    notificationCountDesign(item) {
        if (item.count > 0) {
            return (
                <View style={styles.notificationCountView}>
                    <Text style={styles.notificationCountText}>{item.count}</Text>
                </View>
            )
        }
    }

    // checkDeviceForHardware = async () => {
    //     let compatible = await LocalAuthentication.hasHardwareAsync();
    //     if (compatible) {
    //         console.log('Compatible Device!');
    //     }
    //     else console.log('Current device does not have the necessary hardware!')
    // };
    // checkForBiometrics = async () => {
    //     let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    //     if (!biometricRecords) {
    //         console.log('No Biometrics Found')
    //     } else {
    //         console.log('Biometrics Found')
    //     }
    // };
    // handleAuthentication = async () => {

    //     let result = await LocalAuthentication.authenticateAsync();
    //     if (result.success) {
    //         this.setState({ scanned: true });
    //         console.log('Authentication success')
    //     }
    //     else console.log('Authentication Failed')
    // }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.baseContainer}>

                <View style={styles.container1}>
                    <Text style={styles.screennameText}>Messages</Text>
                    <View style={styles.bellIconView}>
                        {/* <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}> */}
                            <Image style={styles.bellIcon}
                                source={require('../assets/notification.png')}></Image>
                        {/* </View> */}
                    </View>
                </View>
                <View style={styles.container2}>
                    <View style={styles.container2a}>
                        <SearchBar
                            style={styles.searchBar}
                            fontSize={17}
                            darkMode='true'
                            fontColor="white"
                            iconColor="white"
                            shadowColor="transparent"
                            cancelIconColor="white"
                            backgroundColor="transparent"
                            placeholder="Search"
                            placeholderTextColor='rgba(255, 255, 255, 0.65)'
                            onChangeText={(text) => this.filterList(text)}
                            onSearchPress={() => console.log("Search Icon is pressed")}
                            onClearPress={() => this.filterList("")}
                            onPress={() => alert("onPress")}
                        />
                    </View>
                    <View style={styles.container2b}>
                        <Image style={styles.editIcon}
                            source={require('../assets/edit-icon.png')}></Image>
                    </View>
                    <View>
                    </View>
                </View>
                <View style={styles.groupTextView}>
                    <Text style={styles.groupText}>Groups</Text>
                    <View style={styles.viewAllView}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </View>
                </View>
                <View style={styles.container3}>
                    <FlatList
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={this.groupArray}
                        renderItem={({ item, index }) =>
                            <View style={styles.flatlistView1}>
                                {this.groupCollectionDesign(item, index)}
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.container4}>
                    <View style={styles.container4a}>
                        <View style={styles.lineView}></View>
                    </View>
                    <View style={styles.contianer4b}>
                        <FlatList
                            vertical
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={this.notificationArray}
                            renderItem={({ item, index }) =>
                                <View style={styles.flatlistView2}>

                                    <View style={styles.messageView}>
                                        <Image style={styles.profileImage}
                                            source={item.image}></Image>
                                        <View style={styles.messageSubView}>
                                            <View style={styles.profileNameView}>
                                                <Text style={styles.profileName}>{item.name}</Text>
                                                <View style={styles.messageTimeView}>
                                                    <Text style={{ color: (item.time == 'Yesterday') ? '#989898' : '#08356D' }, styles.timeText}>{item.time}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.messageTextView}>
                                                <Text style={styles.messageText}>{item.message}</Text>

                                                {this.notificationCountDesign(item)}
                                            </View>

                                        </View>
                                    </View>
                                    <View style={styles.messageSeparator}></View>
                                </View>
                            }
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>

            </View >
        );
    }
}
// , fontFamily: 'SFProText-Regular'

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        backgroundColor: '#0a356d'
    },
    container1: {
        marginTop: windowHeight * 0.115,
        marginLeft: windowWidth * 0.042,
        flexDirection: 'row',
        alignItems: 'center',
    },
    screennameText: {
        color: 'white',
        fontSize: 36,
        fontWeight: '700'
    },
    bellIconView: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: windowWidth * 0.045,
    },
    bellIcon: {
        marginTop:5,
        height: 30,
        width: 30,
        resizeMode: 'contain',
     
    },
    container2: {
        marginTop: 10,
        marginLeft: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container2a: {
        marginRight: 10
    },
    searchBar: {
        backgroundColor: '#18549e',
        color: 'white',
        height: 40,
        fontSize: 27
    },
    container2b: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 20
    },
    editIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    groupTextView: {
        marginTop: 15,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    viewAllView: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 20
    },
    viewAllText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    },
    container3: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 12
    },
    flatlistView1: {
        height: 110,
        width: 88,
        borderRadius: 15
    },
    createGroupView: {
        top: 0,
        right: 10,
        left: 0,
        bottom: 0,
    },
    createGroupSubView: {
        backgroundColor: '#18549e',
        height: 68,
        width: 68,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createGroupIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    createGroupText: {
        marginTop: 6,
        textAlign: 'center',
        color: 'white',
        fontSize: 13,
        width: 70,
        fontWeight: '500'
    },
    groupIcon: {
        height: 68,
        width: 68,
        resizeMode: 'contain'
    },
    notificationIcon: {
        position: 'absolute',
        top: 0,
        right: 10,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        borderRadius: 7
    },
    groupnameText: {
        marginTop: 6,
        width: 68,
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    container4: {
        marginTop: 20,
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    container4a: {
        marginTop: 11,
        height: 5,
        alignItems: 'center'
    },
    lineView: {
        backgroundColor: '#DCDCDC',
        width: 60,
        height: 5,
        borderRadius: 2
    },
    contianer4b: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    flatlistView2: {
        height: 69
    },
    messageView: {
        marginTop: 12,
        flexDirection: 'row'
    },
    profileImage: {
        height: 45,
        width: 48.16,
        resizeMode: 'contain'
    },
    messageSubView: {
        flex: 1
    },
    profileNameView: {
        flexDirection: 'row'
    },
    profileName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600'
    },
    messageTimeView: {
        justifyContent: 'center'
    },
    timeText: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '400'
    },
    messageTextView: {
        flex: 1,
        marginTop: 3,
        marginLeft: 10,
        flexDirection: 'row'
    },
    messageText: {
        flex: 1,
        color: '#8C8C8C',
        fontSize: 12
    },
    notificationCountView: {
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#08356D',
        borderRadius: 12
    },
    notificationCountText: {
        paddingLeft: 8,
        paddingRight: 8,
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    },
    messageSeparator: {
        marginLeft: 58,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#C4C4C4'
    }

})