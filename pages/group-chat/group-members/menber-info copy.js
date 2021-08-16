import React, { Component, useEffect, useState, useRef } from 'react';
import { TouchableNativeFeedback, Pressable, Keyboard, Alert, KeyboardAvoidingView, findNodeHandle, NativeModules, Text, FlatList, TouchableOpacity, View, ScrollView, TouchableHighlight, SectionList, StyleSheet, Image, Modal, ImageBackground, Dimensions, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import _, { filter, isEmpty } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { FontAwesome5, Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var _self = null

class ChatInfoScreen extends Component {

    anchorY = 300

    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            groupDetails: {},
            detailChangeUpdate: {},
            groupViewDetails: {},
            contactsList: [],
            isShowPopOverView: false,
            // pageX:0,
            pageY: 0,
            flatlistItem: null,
            flatlistIndex: null,
            keyboardOffset: 0,
            editModal: false,
            participant: {},
            profileImageUri: "https://www.whatsappimages.in/wp-content/uploads/2020/12/Friends-Whatsapp-Group-Dp-Images-37-680x350.jpg",
            editGroupName: "Mum's Birthday",
            Data: [

            ],
            photourl: 'no-phor.jpg'
        }
    }

    componentDidMount() {
        if (_.get(this.props, 'groupId')) {
            this.getGroup({ id: _.get(this.props, 'groupId') })
        }
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

    setContactDetails = (details) => {
        if (_.get(details, '_id')) {
            this.setState({
                groupViewDetails: details,
                groupName: _.get(details, 'groupId.groupname')

            })
            let data = []
            let arr = _.times(10, (i) => i + 1);
            console.log('arr', arr);
            _.map(arr, (values, index) => {

                if (_.get(details, `user${values}`)) {
                    data.push(_.get(details, `user${values}`))
                }

            })
            console.log(data);
            this.setState({
                contactsList: data
            })
        }
    }

    getGroup = (body, type) => {
        this.props.nativeLoadingOverlaySpinner.show();

        this.props.getGroup({
            body,
            callback: (response, data) => {
                this.setState({
                    groupDetails: _.get(data, 'data[0]', {})
                })
                this.setContactDetails(_.get(data, 'data[0]', {}))
                if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    this.props.nativeLoadingOverlaySpinner.close();
                }

            }
        }
        );
    }

    headerTitle = (details) => {
        return _.startCase(_.get(details, 'firstname')) + ' ' + _.startCase(_.get(details, 'lastname'))
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(event) {

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



        if (!result.cancelled) {
            this.profileImageUri = result.uri
            this.setState({ profileImageUri: result.uri })
            if (_.get(result, 'uri')) {
                var photo = {
                    uri: _.get(result, 'uri'),
                    type: 'image/jpg',
                    name: 'photo.jpg',
                };

                var form = new FormData();
                form.append("image", photo)


                var settings = {
                    "url": "https://api.imgbb.com/1/upload?key=199d9aa70b1242fbd11e336d07006597",
                    "method": "post",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
                this.props.nativeLoadingOverlaySpinner.show();
                axios(settings).then((response) => {
                    this.setState({
                        photourl: _.get(response, 'data.data.display_url')
                    })
                    // setPhotoURL(_.get(response,'data.data.display_url'))
                    if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                        props.nativeLoadingOverlaySpinner.close();
                    }
                }).catch((error) => {
                    if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                        this.props.nativeLoadingOverlaySpinner.close();
                    }

                })
            }
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


    onBack = () => {
        Actions.groupChatScreen({ groupId: _.get(this.props, 'groupId') })
    }


    _onLongPressButton(evt, item, index) {
        this.setState({ flatlistItem: item, flatlistIndex: index })
        this.setState({ pageX: evt.nativeEvent.pageX - 40, pageY: evt.nativeEvent.pageY })
        this.setState({ isShowPopOverView: true })







    }

    onAnchorMainClicked = () => {

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


    }
    removeFromGroup = () => {
        const indexof = this.state.flatlistIndex
        const data = this.state.Data
        data.splice(indexof, 1)
        this.setState({ Data: data })
        this.setState({ isShowPopOverView: false })
    }


    updateGroupWithname = (details, type) => {
        let body = {
            groupname: this.state.groupName,
            id: _.get(this.state.groupDetails, 'groupId._id'),
            admin: _.get(this.state.groupDetails, 'groupId.admin'),
            superAdmin: _.get(this.state.groupDetails, 'groupId.superAdmin'),
            groupUrl: this.state.photourl

        }

        this.props.nativeLoadingOverlaySpinner.show();
        this.props.create({
            body,
            callback: (reponse, data) => {

                if (reponse == true) {
                    this.setState({
                        editModal: false
                    })
                    if (response) {
                        this.getGroup({ id: _.get(data, 'data._id') })
                    }

                    if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                        this.props.nativeLoadingOverlaySpinner.close();
                    }
                    // this.imageUpload(_.get(data, 'data._id'))
                }
                if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    this.props.nativeLoadingOverlaySpinner.close();
                }
            }

        })
    }
    validateForm = (callback) => {

        if (groupTitle == '') {
            toastMessage('Please enter the group name!')
        } else {
            callback()
        }
    }
    toastMessage = (text) => {
        Toast.show({
            type: 'error',
            text1: 'Tx Finance',
            text2: `${text}`,
            visibilityTime: 2000,
        });
    }

    //image Upload
    imageUpload = (id) => {
        if (!_.isEmpty(this.state.profileImageUri) && this.state.profileImageUri !== null) {
            var photo = {
                uri: this.state.profileImageUri,
                type: 'image/jpg',
                name: 'photo.jpg',
            };

            var form = new FormData();
            form.append("image", photo)

            var settings = {
                "url": "https://api.imgbb.com/1/upload?key=199d9aa70b1242fbd11e336d07006597",
                "method": "post",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };
            this.props.nativeLoadingOverlaySpinner.show();
            axios(settings).then((response) => {
                console.log('response response', _.get(response, 'data.data.display_url'));
                this.props.updatePhoto({
                    body: { groupUrl: _.get(response, 'data.data.display_url') },
                    params: { id },
                    callback: (response, data) => {
                        this.setState({
                            editModal: false
                        })
                        if (response) {
                            this.getGroup({ id: id })
                        }

                        if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                            this.props.nativeLoadingOverlaySpinner.close();
                        }
                    }
                });

            }).catch((error) => {
                if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    this.props.nativeLoadingOverlaySpinner.close();
                }
                console.log('error error', error);
            })

            // let form = new FormData();
            // form.append("photo", photo);
            // this.props.nativeLoadingOverlaySpinner.show();
            // this.props.updatePhoto({
            //     body: form,
            //     params: { id },
            //     callback: (response, data) => {
            //         this.setState({
            //             editModal: false
            //         })
            //         if (response) {
            //             this.getGroup({ id: id })
            //         }

            //         if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
            //             this.props.nativeLoadingOverlaySpinner.close();
            //         }
            //     }
            // });
        }
    }
    removeGroupMember = (details, type) => {
        let body = {
            members: _.get(details, '_id')
        }

        this.props.nativeLoadingOverlaySpinner.show();
        this.props.delete({
            body,
            params: { id: _.get(this.state.groupDetails, 'groupId._id') },
            callback: (reponse, data) => {
                this.setState({
                    isShowPopOverView: false
                })
                if (reponse == false) {


                } else if (reponse == true) {
                    if (type == 'exit') {
                        Actions.chatsList({ title: 'Messages' })
                    } else {
                        this.getGroup({ id: _.get(this.state.groupDetails, 'groupId._id') })
                    }

                }
                if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    this.props.nativeLoadingOverlaySpinner.close();
                }
            }

        })
    }
    showPopOverView() {
        if (this.state.isShowPopOverView) {
            return (
                <View
                    style={{
                        marginTop: 23,
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

                    <View style={{ alignItems: 'center', top: this.state.pageY < windowHeight * 0.8 ? this.state.pageY : this.state.pageY - 127, width: '70%', backgroundColor: 'transparent' }}>

                        {/* {this.state.pageY < windowHeight * 0.8 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../../assets/images/triangleArrow.png')}
                                    style={styles.anchorArrow}></Image>
                            </View>) : null
                        } */}

                        <View style={styles.anchorRowHolderView}>
                            {_.get(this.props, 'userProfile._id') != _.get(this.state, 'groupViewDetails.groupId.admin') && _.get(this.state.detailChangeUpdate, '_id') != _.get(this.state, 'groupViewDetails.groupId.superAdmin') ? (
                                <TouchableOpacity
                                    onPress={() => this.updateGroup(this.state.detailChangeUpdate, 'super')}
                                    style={styles.anchorRowView}>
                                    <Text style={{}}>Make super admin</Text>
                                    <View style={styles.anchorLineView}></View>
                                </TouchableOpacity>
                            ) : null}


                            {_.get(this.props, 'userProfile._id') != _.get(this.state, 'groupViewDetails.groupId.admin') && <TouchableOpacity
                                onPress={() => this.updateGroup(this.state.detailChangeUpdate, 'admin')}
                                style={styles.anchorRowView}>
                                <Text style={{}}>Make admin</Text>
                                <View style={styles.anchorLineView}></View>
                            </TouchableOpacity>}
                            {_.get(this.state, 'groupViewDetails.groupId.admin') == _.get(this.props, 'userProfile._id') &&
                                <TouchableOpacity onPress={() => this.removeGroupMember(this.state.detailChangeUpdate)}
                                    style={styles.anchorRowView}>

                                    <Text style={{}}>Remove from group</Text>
                                    <View style={styles.anchorLineView}></View>
                                </TouchableOpacity>}

                        </View>

                        {this.state.pageY > windowHeight * 0.8 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../../assets/images/triangleDown.png')}
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


    updateGroup = (details, type) => {
        let body = {
            groupname: _.get(this.state.groupDetails, 'groupId.groupname'),
            id: _.get(this.state.groupDetails, 'groupId._id')

        }
        if (type == 'super') {
            body.superAdmin = _.get(details, '_id'),
                body.admin = _.get(this.state.groupDetails, 'groupId.admin')
        } else {

            body.superAdmin = _.get(this.state.groupDetails, 'groupId.superAdmin')
            body.admin = _.get(details, '_id')

        }

        this.props.nativeLoadingOverlaySpinner.show();
        this.props.create({
            body,
            callback: (reponse, data) => {
                if (reponse == true) {
                    this.getGroup({ id: _.get(data, 'data._id') })

                    if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                        this.props.nativeLoadingOverlaySpinner.close();
                    }
                }
            }

        })
        this.setState({ isShowPopOverView: false, })

    }
    changeAdmin = (details) => {
        this.setState({
            isShowPopOverView: true,
            detailChangeUpdate: details
        })
    }
    createThreeButtonAlert = () => {
        let name = _.get(this.props, 'userProfile._id') == _.get(this.state, 'groupViewDetails.groupId.superAdmin') ? "super admin" : 'admin'

        Alert.alert(
            "Exit Group",
            `You can't exit. Because you are the ${name} to assign someone as a ${name} then exit.`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    deleteChat = (id) => {
        this.props.nativeLoadingOverlaySpinner.show();
        this.props.deleteConversation({
            params: { id },
            callback: (res, data) => {
                if (res == true) {
                    Actions.chatsList({ title: 'Messages' })
                }
                if (_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    this.props.nativeLoadingOverlaySpinner.close();
                }
            }
        })

    }

    render() {

        return (
            <View style={styles.baseContainer}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        style={styles.groupDp}
                        source={_.get(this.state, 'groupViewDetails.groupId.groupUrl') != 'no-phor.jpg' ? { uri: _.get(this.state, 'groupViewDetails.groupId.groupUrl') } : { uri: this.state.profileImageUri }}>

                        <View style={styles.container1a}>
                            <TouchableOpacity
                                onPress={() => { this.onBack() }}

                            >
                                <View style={styles.backButtonView}>
                                    <Image source={require('../../../assets/images/back_square_arrow.png')}
                                        style={styles.backIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.groupTitleView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.groupTitle}>
                                    {_.get(this.state, 'groupViewDetails.groupId.groupname')}
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({ editModal: true })}>
                                    <Image
                                        style={{ tintColor: 'white', height: 20, width: 20, marginRight: 20 }}
                                        source={require('../../../assets/images/Edit.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground >


                    < View
                        style={styles.container2} >
                            <View style={styles.mediaView}>
                                <Text style={styles.mediaText}>Media</Text>
                                <Text style={styles.mediaCount}>0</Text>
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


                        <View style={styles.participantsView}>
                            <Text style={styles.participantsText}>{_.size(_.get(this, 'state.contactsList'))} participants</Text>
                        </View>


                        {
                            _.size(_.get(this, 'state.contactsList')) < 10 && _.get(this.props, 'userProfile._id') == _.get(this.state, 'groupViewDetails.groupId.admin')
                            && <TouchableOpacity
                                onPress={() => Actions.addMembergroup({ groupId: _.get(this.props, 'groupId') })}
                                style={styles.addParticipantsView}>
                                <View style={styles.addParticipants}>
                                    <Image
                                        style={styles.addParticipantsIcon}
                                        source={require('../../../assets/images/Addparticipant.png')}></Image>
                                </View>
                                <Text style={styles.addParticipantsText}>Add participants</Text>
                            </TouchableOpacity>
                        }

                        <View style={styles.separator}>

                        </View>
                        <View
                            ref={(ref) => this.flatListViewRef = ref}
                        >
                            <FlatList
                                data={this.state.contactsList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => {

                                    return (
                                        <TouchableHighlight
                                            // onPress={(evt) => this.handlePress(evt) } 
                                            underlayColor="white">
                                            {/* _.get(item,'_id') ==_.get(this.props,'userProfile._id') &&  _.get(item,'_id')!=_.get(this.state,'groupViewDetails.groupId.superAdmin') && _.get(item,'_id')!=_.get(this.state.groupViewDetails,'groupId.admin') && */}
                                            <TouchableOpacity onLongPress={() =>
                                                _.get(item, '_id') != _.get(this.props, 'userProfile._id') &&
                                                _.get(item, '_id') != _.get(this.state, 'groupViewDetails.groupId.superAdmin') &&
                                                _.get(item, '_id') != _.get(this.state, 'groupViewDetails.groupId.admin') &&
                                                (_.get(this.state, 'groupViewDetails.groupId.admin') == _.get(this.props, 'userProfile._id')
                                                    || _.get(this.state, 'groupViewDetails.groupId.superAdmin') == _.get(this.props, 'userProfile._id')
                                                ) &&
                                                this.changeAdmin(item)}>

                                                <View
                                                    style={styles.itemView}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                        <View>
                                                            <Image
                                                                style={styles.itemProfileImage}
                                                                source={_.get(item, 'photoUrl') != 'no-photo.jpg' ? { uri: _.get(item, 'photoUrl') } : require('../../../assets/images/user-profile.jpeg')}></Image>
                                                        </View>

                                                        <View style={styles.itemTextView}>

                                                            <Text style={styles.itemProfileName}>
                                                                {this.headerTitle(item)}
                                                            </Text>


                                                            <Text style={styles.itemDescription}>
                                                                {_.get(item, 'description', 'Busy')}
                                                            </Text>
                                                        </View>
                                                        {_.get(item, '_id') == _.get(this.state, 'groupViewDetails.groupId.superAdmin') &&
                                                            <View style={styles.itemAdmintypeView}>
                                                                <Text style={styles.itemadminType}>Super Admin</Text>
                                                            </View>}
                                                        {_.get(item, '_id') == _.get(this.state, 'groupViewDetails.groupId.admin') &&
                                                            <View style={styles.itemAdmintypeView}>
                                                                <Text style={styles.itemadminType}>Admin</Text>
                                                            </View>}

                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </TouchableHighlight>
                                    )
                                }}
                            />

                        </View>


                    <View
                        style={styles.container3}>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={() => (_.get(this.props, 'userProfile._id') == _.get(this.state, 'groupViewDetails.groupId.superAdmin')
                            || _.get(this.props, 'userProfile._id') == _.get(this.state, 'groupViewDetails.groupId.admin')
                        ) ? this.createThreeButtonAlert()
                            : this.removeGroupMember(_.get(this.props, 'userProfile'))}>

                            <View style={styles.iconView}>
                                <Image
                                    style={styles.exiticon}
                                    source={require('../../../assets/images/Exitgroup.png')}>

                                </Image>
                                <Text style={styles.exitgroupText}>Exit Group</Text>
                            </View>

                        </TouchableOpacity>{console.log(_.get(this.state, 'groupViewDetails'))}
                        {_.get(this.props, 'userProfile._id') == _.get(this.state, 'groupViewDetails.groupId.superAdmin') && <TouchableOpacity
                            onPress={() => this.deleteChat(_.get(this.state, 'groupViewDetails.groupId._id'))}>
                            <View style={styles.iconView}>
                                <AntDesign style={{
                                    height: 20, width: 20,
                                    resizeMode: 'contain'
                                }} name="delete" size={20} color='red' />
                                {/* <Image
                                    style={styles.exiticon}
                                    source={require('../../../assets/images/delete.png')}>

                                </Image> */}
                                <Text style={styles.exitgroupText}>Delete Group</Text>
                            </View>
                        </TouchableOpacity>}
                        <View style={styles.iconView}>
                            <Image
                                style={styles.exiticon}
                                source={require('../../../assets/images/Dislike.png')}>

                            </Image>
                            <Text style={styles.exitgroupText}>Report Group</Text>
                        </View>

                    </View>
                    </View>
                    
                </ScrollView >

                <Modal visible={this.state.editModal} transparent={true} onRequestClose={() => this.setState({ editModal: false })}>

                    <TouchableOpacity activeOpacity={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(33, 33, 33, 0.7)", }} onPress={() => this.setState({ editModal: false })}  >
                        <View style={{ width: "70%", marginBottom: this.state.keyboardOffset, borderRadius: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: "white", }}>

                            <TouchableOpacity
                                style={styles.profileImageButton}
                                onPress={() => this.pickImage()}>
                                <Image style={{ height: 140, width: 140, borderRadius: 70 }}
                                    source={{ uri: this.state.profileImageUri }}>
                                </Image>
                                <View style={styles.cameraView}>
                                    <Image source={require('../../../assets/images/camera.png')}
                                        style={styles.cameraIcon}></Image>
                                </View>
                            </TouchableOpacity>
                            <TextInput value={this.state.groupName} style={{ color: '#08356D', borderBottomWidth: 1, width: '85%', borderRadius: 20, marginBottom: 20, paddingLeft: 15, borderColor: '#D1D1D1', fontSize: 16, height: 35 }}
                                textAlign={'center'}
                                onChangeText={(text) => this.setState({ groupName: text })}
                            >

                            </TextInput>
                            <TouchableOpacity onPress={() => this.updateGroupWithname('update')}
                                style={styles.createButtonView}>
                                <Text style={styles.createText}>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </Modal>

                {this.showPopOverView()}
                {/* <Modal visible={this.state.isContextMenu} transparent={true} onRequestClose={() => this.setState({ isContextMenu: false })}> */}
                {/* <TouchableOpacity onPress={() => this.onAnchorMainClicked()}> */}

                {/* </TouchableOpacity> */}
            </View >
        );
    }
}

const mapStateToProps = (state) => {

    return {
        userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {}),
        listLoading: _.get(state, `app.${global.redux.actionTypes.contacts.name}.listLoadingInProgress`, false)

    }
};
const mapDispatchToProps = dispatch => ({
    list: details => dispatch(global.redux.action.contacts.list(details)),
    getGroup: details => dispatch(global.redux.action.group.getGroupConversation(details)),
    create: details => dispatch(global.redux.action.group.update(details)),
    delete: details => dispatch(global.redux.action.group.delete(details)),
    updatePhoto: details =>
        dispatch(global.redux.action.group.updatePhoto(details)),
    deleteConversation: details => dispatch(global.redux.action.group.deleteConversation(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ChatInfoScreen));

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
        paddingBottom: 10,
    },
    groupTitle: {
        color: 'white',
        fontWeight: '700',
        fontSize: 27,
        textShadowColor: 'rgba(0, 0, 0, 0.55)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10

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
        borderRadius: 12
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
        marginHorizontal: 50,
        paddingVertical: 12,
        backgroundColor: 'white'
    },
    anchorRowHolderView: {
        marginTop: 325,
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
        backgroundColor: 'transparent'
    },
    createButtonView: {
        marginHorizontal: windowWidth * 0.154,
        width: windowWidth * 0.7,
        height: windowHeight * 0.071,
        backgroundColor: '#08356D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    createText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
})