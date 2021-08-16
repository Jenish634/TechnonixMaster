import React, { Component, useEffect, useState, useRef } from 'react';
import { TouchableNativeFeedback, Pressable, Keyboard, KeyboardAvoidingView, findNodeHandle, NativeModules, Text, FlatList, TouchableOpacity, View, ScrollView, TouchableHighlight, SectionList, StyleSheet, Image, Modal, ImageBackground, Dimensions, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var _self = null

export default class ChatInfoScreen extends Component {

    anchorY = 300

    constructor(props) {
        super(props)
        this.state = {

            isShowPopOverView: false,
            // pageX:0,
            pageY: 0,
            flatlistItem: null,
            flatlistIndex: null,
            keyboardOffset: 0,
            editModal: false,
            participant: {},
            profileImageUri:this.props.route.params.groupDp,
            pickerImage:this.props.route.params.groupDp,
            groupName: this.props.route.params.groupName,
            Data: [
                {
                    profileName: 'You',
                    profileDescription: 'Hey there! ',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Super Admin'
                },
                {
                    profileName: 'Daniel Higgins Jr.',
                    profileDescription: 'Available',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
                {
                    profileName: 'Hank M. Zakroff',
                    profileDescription: 'Busy',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
                {
                    profileName: 'Kate Bell',
                    profileDescription: 'Cant talk right now!',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
                {
                    profileName: 'David Taylor',
                    profileDescription: 'Hey there! ',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
                {
                    profileName: 'John Appleseed',
                    profileDescription: 'Available',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
                {
                    profileName: 'Hank M. Zakroff',
                    profileDescription: 'Busy',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
                {
                    profileName: 'Kate Bell',
                    profileDescription: 'Cant talk right now!',
                    profileImage: require('../assets/WA.png'),
                    adminType: 'Admin'
                },
            ]
        }
    }

    componentDidMount() {
        _self = this

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(event) {
        console.log("height: ", event.endCoordinates.height)
        _self.setState({
            keyboardOffset: 100,
        })
    }

    _keyboardDidHide() {
        _self.setState({
            keyboardOffset: 0,
        })
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            // this.profileImageUri = result.uri
            this.setState({ pickerImage: result.uri })
        }
    };
    makeSuperAdmin = (item) => {
        if (this.state.Data[0].adminType === 'Super Admin') {
            const dummy = this.state.Data
            const indexof = dummy.indexOf(item)
            dummy[indexof].adminType = 'Super Admin'
            dummy[0].adminType = 'Admin'
            this.setState({ Data: dummy })
        }
    }
    changeAdmin = (item) => {
        console.log(item);

    }

    onBack = () => {
        this.props.navigation.goBack()
    }


    _onLongPressButton(evt, item, index) {
        console.log(evt.nativeEvent);
        console.log(item);
        console.log(index);
        this.setState({ flatlistItem: item, flatlistIndex: index })
        this.setState({ pageX: evt.nativeEvent.pageX - 40, pageY: evt.nativeEvent.pageY })
        this.setState({ isShowPopOverView: true })





        // console.log(this.state.pageX);
        // console.log(this.state.pageY);
        // alert('You long-pressed the button!')
        // console.log(`x coord = ${evt.nativeEvent.locationX}`);
        // console.log(`y coord = ${evt.nativeEvent.locationY}`);
        // let locationY = evt.nativeEvent.locationY
        // // console.log('anchorYPostion : ', this.anchorYPostion)

        // this.flatListViewRef.measure((fx, fy, width, height, px, py) => {
        //     console.log('Component width is: ' + width)
        //     console.log('Component height is: ' + height)
        //     console.log('X offset to frame: ' + fx)
        //     console.log('Y offset to frame: ' + fy)
        //     console.log('X offset to page: ' + px)
        //     console.log('Y offset to page: ' + py)

        //     this.anchorY = py + locationY
        //     console.log('this.anchorY: ' + this.anchorY)

        // }
        // // )

    }

    onAnchorMainClicked = () => {
        console.log('onAnchorMainClicked')
        this.setState({ isShowPopOverView: false })
    }
    onSuperAdmin = () => {
        if (this.state.Data[0].adminType === 'Super Admin') {
            const dummy = this.state.Data
            const item = this.state.flatlistItem
            const indexof = dummy.indexOf(item)
            dummy[indexof].adminType = 'Super Admin'
            dummy[0].adminType = 'Admin'
            this.setState({ Data: dummy })
            this.setState({ isShowPopOverView: false })
        }

    }
    onAdmin = () => {
        console.log('onAdmin')

    }
    removeFromGroup = () => {
        const indexof = this.state.flatlistIndex
        const data = this.state.Data
        data.splice(indexof, 1)
        this.setState({ Data: data })
        this.setState({ isShowPopOverView: false })
    }
    onSaveModal = () => {
        if(this.state.editGroupName.length > 0){
        this.setState({groupName:this.state.editGroupName != null ? this.state.editGroupName : this.state.groupName,editModal: false,profileImageUri:this.state.pickerImage})
    }else{
        console.log("dfgkjdfgkjfgdhjkfgkhj");
    }
    }
    showPopOverView() {
        if (this.state.isShowPopOverView) {
            return (
                <View
                    style={{

                        alignItems: 'center',
                        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
                        backgroundColor: "rgba(33, 33, 33, 0.7)",
                    }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent' }}
                        onPress={() => this.onAnchorMainClicked()}
                    >
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent' }}
                        >

                        </View>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', top: this.state.pageY < windowHeight * 0.8 ? this.state.pageY : this.state.pageY - 127, width: '50%', backgroundColor: 'transparent' }}>
                        
                        {this.state.pageY < windowHeight * 0.8 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../assets/triangleArrow.png')}
                                    style={styles.anchorArrow}></Image>
                            </View>) : null
                        }

                        <View style={styles.anchorRowHolderView}>
                            {this.state.Data[0].adminType === 'Super Admin' ? (
                                <TouchableOpacity
                                    onPress={() => this.onSuperAdmin()}
                                    style={styles.anchorRowView}>
                                    <Text style={{}}>Make super admin</Text>
                                    <View style={styles.anchorLineView}></View>
                                </TouchableOpacity>
                            ) : null}


                            <TouchableOpacity
                                onPress={() => this.onAdmin()}
                                style={styles.anchorRowView}>
                                <Text style={{}}>Make  admin</Text>
                                <View style={styles.anchorLineView}></View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.removeFromGroup(index)}
                                style={styles.anchorRowView}>

                                <Text style={{}}>Remove from group</Text>
                                <View style={styles.anchorLineView}></View>
                            </TouchableOpacity>

                        </View>

                        {this.state.pageY > windowHeight * 0.8 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../assets/triangleDown.png')}
                                    style={styles.anchorArrow}></Image>
                            </View>
                        ) :
                            null
                        }
                    </View>
                </View>
            )
        }
    }

    render() {
        

        return (
            <View style={styles.baseContainer}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        style={styles.groupDp}
                        source={this.state.profileImageUri != null ? {uri:this.state.profileImageUri} : require('../assets/EmptyGroupIcon.png')}>

                        <View style={styles.container1a}>
                            <TouchableOpacity
                                onPress={() => { this.onBack() }}

                            >
                                <View style={styles.backButtonView}>
                                    <Image source={require('../assets/back_square_arrow.png')}
                                        style={styles.backIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.groupTitleView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.groupTitle}>
                                    {this.state.groupName}
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({ editModal: true })}>
                                    <Image
                                        style={{ tintColor: 'white', height: 20, width: 20, marginRight: 20 }}
                                        source={require('../assets/Edit.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                    {/* </View> */}


                    <View
                        style={styles.container2}>
                        <View>
                            <View style={styles.mediaView}>
                                <Text style={styles.mediaText}>Media</Text>
                                <Text style={styles.mediaCount}>12</Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.Data}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View>
                                            <Image
                                                style={styles.media}
                                                source={item.profileImage}></Image>
                                        </View>
                                    )
                                }}
                            />

                        </View>
                        <View style={styles.participantsView}>
                            <Text style={styles.participantsText}>{this.state.Data.length} participants</Text>
                        </View>


                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddParticipantScreen')}
                            style={styles.addParticipantsView}>
                            <View style={styles.addParticipants}>
                                <Image
                                    style={styles.addParticipantsIcon}
                                    source={require('../assets/Addparticipant.png')}></Image>
                            </View>
                            <Text style={styles.addParticipantsText}>Add participants</Text>
                        </TouchableOpacity>

                        <View style={styles.separator}>

                        </View>
                        <View
                            ref={(ref) => this.flatListViewRef = ref}
                        >
                            <FlatList
                                // onLayout={event => {
                                //     const layout = event.nativeEvent.layout;
                                //     console.log('height:', layout.height);
                                //     console.log('width:', layout.width);
                                //     console.log('x:', layout.x);
                                //     console.log('y:', layout.y);
                                // }}

                                data={this.state.Data}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => {
                                    console.log(this.state.Data);
                                    return (
                                        <TouchableHighlight
                                            // onPress={(evt) => this.handlePress(evt) } 
                                            disabled={item.adminType == 'Super Admin' || item.profileName == 'You' ? true : false}
                                            onLongPress={(evt) => this._onLongPressButton(evt, item, index)} underlayColor="white">

                                            <View
                                                // onLayout={(event) => {
                                                //     let { x, y, width, height } = event.nativeEvent.layout;
                                                //     console.log('y ::', y)
                                                // }}
                                                style={styles.itemView}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                    <View>
                                                        <Image
                                                            style={styles.itemProfileImage}
                                                            source={item.profileImage}></Image>
                                                    </View>

                                                    <View style={styles.itemTextView}>

                                                        <Text style={styles.itemProfileName}>
                                                            {item.profileName}
                                                        </Text>


                                                        <Text style={styles.itemDescription}>
                                                            {item.profileDescription}
                                                        </Text>
                                                    </View>

                                                    <View style={styles.itemAdmintypeView}>
                                                        <Text style={styles.itemadminType}>{item.adminType}</Text>
                                                    </View>

                                                </View>
                                            </View>

                                        </TouchableHighlight>
                                    )
                                }}
                            />

                        </View>


                    </View>

                    <View
                        style={styles.container3}>
                        <View style={styles.separator} />

                        <View style={styles.iconView}>
                            <Image
                                style={styles.exiticon}
                                source={require('../assets/Exitgroup.png')}>

                            </Image>
                            <Text style={styles.exitgroupText}>Exit Group</Text>
                        </View>
                        <View style={styles.iconView}>
                            <Image
                                style={styles.exiticon}
                                source={require('../assets/Dislike.png')}>

                            </Image>
                            <Text style={styles.exitgroupText}>Report Group</Text>
                        </View>

                    </View>
                </ScrollView>

                <Modal visible={this.state.editModal} transparent={true} onRequestClose={() => this.setState({ editModal: false })}>

                    <TouchableOpacity activeOpacity={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(33, 33, 33, 0.7)", }} onPress={() => this.setState({ editModal: false })}  >
                        <View style={{ width: "70%", marginBottom: this.state.keyboardOffset, borderRadius: 10, paddingHorizontal: 15,  backgroundColor: "white", }}>
                            <TouchableOpacity 
                            onPress={() => this.setState({ editModal: false })}
                            style={{alignItems:'flex-end'}}>
                                <Image source={require('../assets/cross.png')}
                                    style={{ tintColor: '#08356D', height: 25, width: 25, resizeMode: 'contain',top:10 }}
                                ></Image>
                            </TouchableOpacity>
                            <View style={{alignItems: 'center', justifyContent: 'center',}}>
                            <TouchableOpacity
                                style={styles.profileImageButton}
                                onPress={() => this.pickImage()}>
                                <Image style={{ height: 140, width: 140, borderRadius: 70 }}
                                    source={this.state.pickerImage !=null ? {uri:this.state.pickerImage} : require('../assets/EmptyGroupIcon.png')}>
                                </Image>
                                <View style={styles.cameraView}>
                                    <Image source={require('../assets/camera.png')}
                                        style={styles.cameraIcon}></Image>
                                </View>
                            </TouchableOpacity>
                            <TextInput style={{ color: '#08356D', borderBottomWidth: 1, width: '85%', borderRadius: 20, paddingLeft: 15, borderColor: '#D1D1D1', fontSize: 16, height: 35, marginBottom: 15 }}
                                textAlign={'center'}
                                defaultValue= {this.state.groupName}
                                onChangeText={(text) => this.setState({ editGroupName: text })}
                            >

                            </TextInput>

                            <TouchableOpacity 
                            onPress={() => this.onSaveModal()}
                            style={{ backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center',borderRadius:5, paddingVertical: 5, marginBottom: 20,paddingHorizontal:20 }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                </Modal>

                {this.showPopOverView()}
                {/* <Modal visible={this.state.isContextMenu} transparent={true} onRequestClose={() => this.setState({ isContextMenu: false })}> */}
                {/* <TouchableOpacity onPress={() => this.onAnchorMainClicked()}> */}

                {/* </TouchableOpacity> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    baseContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    groupDp: {
        height: windowHeight * 0.25,
        resizeMode: "cover",
    },
    container1: {

    },
    container1a: {
        marginLeft: windowWidth * 0.053,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight * 0.06,
    },
    backButtonView: {
        backgroundColor: 'transparent',
        height: 30,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    backIcon: {
        height: 15,
        width: 20,
        resizeMode: 'contain'
    },
    groupTitleView: {
        justifyContent: 'flex-end',
        flex: 1,
        marginLeft: windowWidth * 0.053,
        paddingBottom: 10
    },
    groupTitle: {
        color: 'white',
        fontWeight: '700',
        fontSize: 27
    },
    mediaView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: windowHeight * 0.001
    },
    mediaText: {
        color: '#08356D',
        fontSize: 16
    },
    mediaCount: {
        color: 'gray'
    },
    media: {
        marginTop: 5,
        height: windowHeight * 0.086,
        width: windowHeight * 0.086,
        marginRight: 5,
    },
    participantsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: windowHeight * 0.01,
        paddingTop: windowHeight * 0.015
    },
    participantsText: {
        color: '#08356D',
        fontSize: 16
    },
    searchIcon: {
        height: 25,
        width: 25,
        tintColor: '#08356D',
    },
    addParticipantsView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addParticipants: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: '#08356D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addParticipantsIcon: {
        tintColor: 'white',
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    addParticipantsText: {
        paddingLeft: 10,
        fontSize: 16
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#D1D1D1',
        paddingTop: 7,
        paddingBottom: 2,
    },
    itemView: {
        paddingTop: 10,
        paddingBottom: 5
    },
    itemProfileImage: {
        height: 50,
        width: 50,
        borderRadius: 30
    },
    itemTextView: {
        paddingLeft: 10,
        flex: 1
    },
    itemProfileName: {
        fontSize: 17,
        fontWeight: '400'
    },
    itemDescription: {
        fontSize: 14,
        color: 'gray',
        paddingTop: 3
    },
    itemAdmintypeView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#08356D',
        borderWidth: 1,
        padding: 5,
        height: 30,
        borderRadius: 7,
    },
    itemadminType: {
        color: '#08356D'
    },
    container2: {
        marginHorizontal: windowWidth * 0.053,
        paddingTop: windowHeight * 0.019,
    },
    container3: {
        flex: 1,
        marginHorizontal: windowWidth * 0.053,
        marginBottom: windowHeight * 0.061
    },
    iconView: {
        flexDirection: 'row',
        paddingTop: windowHeight * 0.019,
        alignItems: 'center',
    },
    exiticon: {
        height: 20,
        width: 20,
        tintColor: '#D61112',
        resizeMode: 'contain',
    },
    exitgroupText: {
        color: '#D61112',
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: windowWidth * 0.053,
    },
    profileImageButton: {
        alignItems: 'center',
        marginTop: 20
    },
    cameraView: {
        height: windowHeight * 0.05,
        width: windowWidth * 0.1,
        borderRadius: 20,
        backgroundColor: '#D8D8D8',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: windowHeight * 0.024
    },
    cameraIcon: {
        height: windowHeight * 0.024,
        width: windowWidth * 0.053
    },
    anchorStyle: {
        backgroundColor: 'blue',
    },
    anchorLineView: {
        left: 0, 
        right: 0, 
        bottom: 0, 
        position: 'absolute', 
        height: 1, 
        backgroundColor: '#f2f2f2'
    },
    anchorArrow: {
        width: 25,
        height: 25,
    },
    anchorRowView: { 
        marginHorizontal: 10, 
        paddingVertical: 12, 
        backgroundColor: 'white' 
    },
    anchorRowHolderView: {
        marginTop: -5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 0.4
    },
    anchorHeadView: { 
        marginHorizontal: 20, 
        marginTop: 200, 
        width: '50%', 
        backgroundColor: 'transparent' }
})



