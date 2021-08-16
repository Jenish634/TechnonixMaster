import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
    Dimensions
} from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { connect } from 'react-redux';
import _, { filter, isEmpty } from 'lodash';
import moment from 'moment';
import { RefreshControl } from "react-native";
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import style from "./style";
import { FontAwesome, Feather, MaterialIcons,Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
let groupArray = [
    {
        "groupId": {
            "groupname": "Create New Group",

        },
        createId:'12'
    },


]
const anchorY = 300
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChatListScreen = (props) => {
    const [chatList, setchatList] = useState([])
    const [searchChatList, setSearchchatList] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [groupList, setGroupList] = useState([])
    const [searchgroupList, setSearchGroupList] = useState([])
    const [isShowPopOverView, setisShowPopOverView] = useState(false)
    const [deleteChatId, setdeleteChatId] = useState('')

    //Initial Load    
    useEffect(() => {

        loadchatList({ senderId: _.get(props, 'userProfile._id') });
        loadGroupList({ id: _.get(props, 'userProfile._id') })


    }, []);

    //Refresh pull-down
    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadchatList()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const getUserMessages = (body, values) => {
        props.nativeLoadingOverlaySpinner.show();
        props.getUserMessages({
            body,
            callback: (response, data) => {


                if (_.get(values, 'recever._id') == _.get(props, 'userProfile._id')) {
                    values.recever = { ..._.get(values, 'sender') }
                }
                let details = { ...values, messages: _.last(_.get(data, 'msg', [])) }

                if (response) {

                    if (_.size(_.get(data, 'msg', [])) > 0) {
                        setSearchchatList(oldArray => _.uniqBy([...oldArray, details], '_id'))
                        setchatList(oldArray => _.uniqBy([...oldArray, details], '_id'));
                    }



                }
                if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    props.nativeLoadingOverlaySpinner.close();
                }
            }
        }
        );
    }


    const addLatestMessageToConverstion = (chats) => {
        let conversationMessages = []
        chats.map((values, index) => {
            getUserMessages({ id: _.get(values, '_id') }, values)

        })

        // setchatList(conversationMessages)

    }

    //chat list
    function loadchatList(body) {
        props.nativeLoadingOverlaySpinner.show();
        props.list({
            params:body,
            callback: (response, data) => {
                console.log(response, data);
                if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    props.nativeLoadingOverlaySpinner.close();
                }
                if (response) {
                    let datas = []
                    if (_.size(_.get(data, 'msg', [])) > 0) {
                        _.map(_.get(data, 'msg', []), (values, index) => {
                            console.log('values', values);
                            if (_.get(values, 'lastText')) {
                                datas.push(values)
                            }

                        })
                        setchatList(datas)
                        setSearchchatList(datas)
                        addLatestMessageToConverstion(datas)
                    }
                }
            }
        }
        );
    }

    //chat list
    function loadGroupList(body) {
        props.nativeLoadingOverlaySpinner.show();
        props.groupList({
            params:{...body},
            callback: (response, data) => {
                console.log('response, data', response, data);

                if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    props.nativeLoadingOverlaySpinner.close();
                }
                if (response) {
                    setGroupList([...groupArray, ..._.get(data, 'data', [])])
                    setSearchGroupList([...groupArray, ..._.get(data, 'data', [])])
                    // setchatList(_.get(data, 'msg', []))
                    // addLatestMessageToConverstion(_.get(data,'msg'))
                }
            }
        }
        );
    }

    //Image view
    const imageView = (image) => {
        if (image !== 'no-photo.jpg') {
            return <Image
                style={style.SubscriptionProductInfoImg}
                source={{ uri: image }}
            />
        } else {
            return <Image
                style={style.SubscriptionProductInfoImg}
                source={require("../../../assets/images/user-profile.jpeg")}
            />
        }

    }


    const headerTitle = (details) => {
        return _.startCase(_.get(details, 'recever.firstname')) + ' ' + _.startCase(_.get(details, 'recever.lastname'))
    }
    //chat history

    const groupCollectionDesign = (item, index) => {
        if (index == 0 && _.get(item,'createId')=='12') {
            return (
                <TouchableOpacity onPress={() => Actions.AddParticipantScreen()}>
                    <View key={index} style={{ top: 0, right: 10, left: 0, bottom: 0, }}>
                        <View style={{ backgroundColor: '#18549e', height: 68, width: 68, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }}
                                source={require('../../../assets/images/3Friends.png')}></Image>
                        </View>
                        <Text style={{ marginTop: 6, textAlign: 'center', color: 'white', fontSize: 13.5, width: 68, fontWeight: '500' }}
                            numberOfLines={2}
                        >{_.startCase(_.get(item, 'groupId.groupname', ''))}</Text>
                    </View></TouchableOpacity>
            )
        } else {
            return (<TouchableOpacity onPress={() => Actions.groupChatScreen({ groupId: _.get(item, 'groupId._id') })}>
                <View key={index} style={{ top: 0, right: 10, left: 0, bottom: 0, }}>
                    <View style={{ backgroundColor: '#18549e', height: 68, width: 68, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ position: 'absolute',left: 0, right: 0, top: 0, bottom: 0, height: 68, width: 68, resizeMode: 'stretch', borderRadius: 40 }}
                            source={_.get(item, 'groupId.groupUrl') != 'no-phor.jpg' ? { uri: _.get(item, 'groupId.groupUrl', '') } : require('../../../assets/images/group-profile1.png')}>

                        </Image>
                    </View>
                    <Image style={{ position: 'absolute', top: 0, right: 10, height: 20, width: 20, resizeMode: 'stretch', borderRadius: 7 }}
                        source={require('../../../assets/images/dollar-icon.png')}></Image>
                    <Text style={{ marginTop: 6, width: 68, textAlign: 'center', color: 'white', fontSize: 15, fontWeight: '500' }}
                        numberOfLines={2}
                    >{_.startCase(_.get(item, 'groupId.groupname', ''))}</Text>
                </View>
            </TouchableOpacity>
            )
        }

    }

    const notificationCountDesign = (item, index) => {
        if (item.count > 0) {
            return (
                <View key={index} style={{ height: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#08356D', borderRadius: 12 }}>
                    <Text style={{ paddingLeft: 8, paddingRight: 8, color: 'white', fontSize: 12, fontWeight: '400' }}>{item.count}</Text>
                </View>
            )
        }
    }

    const deleteChat = (id) => {
        props.nativeLoadingOverlaySpinner.show();
        props.delete({
            params: { id },
            callback: (res, data) => {
                if (res == true) {
                    setisShowPopOverView(false)
                    setdeleteChatId('')
                    loadchatList({ senderId: _.get(props, 'userProfile._id') });
                }
                if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
                    props.nativeLoadingOverlaySpinner.close();
                }
            }
        })

    }
    const showPopOverView = () => {
        if (isShowPopOverView) {
            return (
                <View
                    style={{
                        // marginTop: 23,
                        alignItems: 'center',
                        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
                        backgroundColor: "rgba(33, 33, 33, 0.7)",
                    }}>
                    {/* <TouchableOpacity
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent' }}>
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent' }}
                        >

                        </View>
                    </TouchableOpacity> */}

                    <View style={{ alignItems: 'center' }}>
                        {/* {0 < windowHeight * 0.8 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../../assets/images/triangleArrow.png')}
                                    style={style.anchorArrow}></Image>
                            </View>) : null
                        } */}
                        <View style={style.anchorRowHolderView}>
                            <TouchableOpacity onPress={() => deleteChat(deleteChatId)}
                                style={style.anchorRowView}>
                                <Text style={{}}>Delete</Text>
                                <View style={style.anchorLineView}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setisShowPopOverView(false)}
                                style={style.anchorRowView}>
                                <Text style={{}}>Cancel</Text>
                                <View style={style.anchorLineView}></View>
                            </TouchableOpacity>

                        </View>

                        {0 > windowHeight * 0.8 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../../../assets/images/triangleDown.png')}
                                    style={style.anchorArrow}></Image>
                            </View>
                        ) :
                            null
                        }
                    </View>
                </View>
            )
        }
    }

    const isshowModal = (id) => {
        console.log('id', id);
        setisShowPopOverView(true)
        setdeleteChatId(id)
    }

    function LogoTitle(item) {

        return (
            <View style={{ flexDirection: 'row', marginLeft: 200 }}>
                <Image
                    style={{
                        height: 45,
                        width: 45,
                        resizeMode: "cover",
                        borderRadius: 100,
                        marginLeft: responsiveWidth(-6),
                        marginTop: responsiveWidth(2)



                    }}
                    source={_.get(item, 'recever.photoUrl') != 'no-photo.jpg' ? { uri: _.get(item, 'recever.photoUrl') } : require('../../../assets/images/user-profile.jpeg')}
                />
                <Text style={{ marginTop: responsiveWidth(5.5), fontWeight: 'bold', color: 'white', fontSize: 20 }}> {headerTitle(item)}</Text>
            </View>
        );
    }

    const filterChatProfile = (text) => {
        let filter_data = [...chatList]
        console.log('chat List', filter_data);
        const filter = _.filter(filter_data, (list) => {
            console.log('list chat', list);
            return _.lowerCase(`${_.get(list, 'recever.firstname') + ' ' + _.get(list, 'recever.lastname')}`).includes(_.lowerCase(text))

        })
        console.log('chat List filter', filter);
        (_.size(filter) == 0 || text == '') ? setchatList(searchChatList) : filter && setchatList(filter)
    }

    const filterGroupProfile = (text) => {
        let filter_data = [...groupList]
        filter_data.shift()
        const filter = _.filter(filter_data, (list, index) => {
            console.log('Group List data,', list);
            return _.lowerCase(`${_.get(list, 'groupId.groupname')}`).includes(_.lowerCase(text))
        })
        console.log('Group List filter', filter);
        (_.size(filter) == 0 || text == '') ? setGroupList(searchgroupList) : filter && setGroupList(filter)
    }

    const filterMessages = (value) => {

        filterChatProfile(value)
        filterGroupProfile(value)

    }
 const   onBack = () => {
        props.navigation.goBack()
      }
    //Manage chat view
    const managechatView = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#0a356d' ,minHeight: Math.round(Dimensions.get('screen').height) - (Math.round(Dimensions.get('screen').height)-Math.round(Dimensions.get('window').height)) -200 }}>

                <View style={{ marginTop:  windowHeight * 0.06, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
              onPress={() => { onBack() }}
            >
              <View style={{ backgroundColor: 'transparent',
                     height: 30,
                     width: 30,
                     alignItems: 'center',
                     justifyContent: 'center',
                     borderRadius: 5}}>
                <Ionicons style={{marginTop:5}} name="arrow-back" size={28} color={"white"} />
              </View>
            </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 22, fontWeight: '500',marginLeft:18 }}>Messages</Text>
                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                    <Image style={{ height: 25, width: 25, resizeMode: 'contain' }}
                        source={require('../../../assets/images/bell_icon.png')}></Image>
                </View>
            </View>
                <View style={{ marginTop: 10, marginLeft: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        marginRight: 20, flex: 12,
                        flexDirection: 'row',
                        backgroundColor: '#18549e', borderRadius: 15, marginLeft: 25
                    }}>
                        <Feather style={{ padding: 10, marginRight: 10, borderRadius: 20 }} name="search" size={24} color="white" />
                        <TextInput
                            style={{
                                backgroundColor: '#18549e', color: 'white', height: 40, fontSize: 18, flex: 3,
                                marginRight: 10,
                                borderRadius: 15
                            }}
                            onChangeText={(e) => filterMessages(e)}
                            placeholderTextColor='white'
                            placeholder="Search"

                        />
                        {/* <MaterialIcons style={{padding: 10,borderRadius:20,textAlign:'right',fontWeight:'600'}} name="clear" size={24} color="white" /> */}

                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                        <Image style={{ height: 25, width: 25, resizeMode: 'contain' }}
                            source={require('../../../assets/images/edit-icon.png')}></Image>
                    </View>
                    <View>
                    </View>
                </View>
                <View style={{ marginTop: 15, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Groups</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: '400' }}>View All</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 12 }}>
                    <FlatList
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={groupList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <View key={index} style={{ height: 110, width: 88, borderRadius: 15 }}>

                                {groupCollectionDesign(item, index)}
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {_.size(chatList) > 0 ? <View style={{ marginTop: 20, flex: 1, backgroundColor: 'white', borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                    <View style={{ marginTop: 11, height: 5, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#DCDCDC', width: 60, height: 5, borderRadius: 2 }}></View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                        <FlatList
                            vertical
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={chatList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>

                                <TouchableOpacity key={index} onLongPress={() => isshowModal(_.get(item, '_id'))} onPress={() =>
                                    Actions.privateChat({
                                        conversationParams:
                                            { id: _.get(item, '_id'), detailsConversation: item, name: _.get(item, 'recever') },
                                        title: LogoTitle(item)
                                    })}>
                                    <View style={{ height: 69 }}>

                                        <View style={{ marginTop: 12, flexDirection: 'row' }}>
                                            <Image style={{ height: 45, width: 48.16, resizeMode: 'contain', borderRadius: 65 }}
                                                source={_.get(item, 'recever.photoUrl') != 'no-photo.jpg' ? { uri: _.get(item, 'recever.photoUrl') } : require('../../../assets/images/user-profile.jpeg')}
                                            ></Image>
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ flex: 1, marginLeft: 10, fontSize: 16, fontWeight: '600' }}>{headerTitle(item)}</Text>
                                                    <View style={{ justifyContent: 'center' }}>
                                                        <Text style={{ marginLeft: 10, color: (_.get(item, 'time') == 'Yesterday') ? '#989898' : '#08356D', fontSize: 12, fontWeight: '400' }}>
                                                            {moment(_.get(item, 'messages.createdAt')).format('hh:mm A')}</Text>
                                                    </View>
                                                </View>
                                                {_.get(item, 'lastText') &&
                                                    <View style={{ flex: 1, marginTop: 3, marginLeft: 10, flexDirection: 'row' }}>
                                                        <Text style={{ flex: 1, color: '#8C8C8C', fontSize: 12 }}>{_.get(item, 'lastText')}</Text>

                                                        {/* {item.count>1&& notificationCountDesign(item,index)} */}
                                                    </View>}

                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 58, position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: '#C4C4C4' }}></View>
                                    </View>
                                </TouchableOpacity>
                            }
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View> : _.get(props, 'listLoading') == false ? <View style={{ flex: 1, marginTop: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <Text style={{ textAlign: 'center', marginTop: responsiveWidth(54), fontWeight: 'bold', fontSize: 18 }}>No Messages</Text>
                </View> : <View style={{ flex: 1, marginTop: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

                </View>}
                {showPopOverView()}
            </View >
        );
    }

    const render = () => {
        return (managechatView())
    }
    return render()
}
const mapStateToProps = (state) => {

    return {
        userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {}),
        listLoading: _.get(state, `app.${global.redux.actionTypes.chats.name}.userConversationListLoadingInProgress`, false)

    }
};
const mapDispatchToProps = dispatch => ({
    list: details => dispatch(global.redux.action.chats.getUserConversation(details)),
    groupList: details => dispatch(global.redux.action.group.list(details)),
    getUserMessages: details => dispatch(global.redux.action.chats.getUserMessage(details)),
    delete: details => dispatch(global.redux.action.chats.deleteConversation(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ChatListScreen));
