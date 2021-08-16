import React, { Component, useEffect, useRef, useState } from 'react';
import { Keyboard, FlatList, Alert, Image, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback  } from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat } from 'react-native-gifted-chat';
import { Camera } from 'expo-camera';
import { Linking } from 'expo'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import _ from 'lodash';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { Actions } from 'react-native-router-flux';
import { io } from 'socket.io-client'
import moment from 'moment';
import BottomSheetStyle from "./BottomSheet-style";
import AddFundStyle from "./AddFunds";
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import RBSheet from 'react-native-raw-bottom-sheet'
import { Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from '@react-native-community/slider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const socket = io('https://txfinance.herokuapp.com', { path: '/api/v1/groupmessages' })
const socketWallet = io('https://txfinance.herokuapp.com', { path: '/api/v1/wallet' })
const ChatScreen = (props) => {
  const refRBSheet = useRef();
  const refSplitBill = useRef();
  const refSplitBillPay = useRef();
  const [groupDetails, setGroupDetails] = useState({})
  const [send, setsend] = useState(false)
  const [messageText, setmessageText] = useState('')
  const [fund, setfund] = useState(false)
  const [attachment, setattachment] = useState(false)
  const [cameraPermission, setcameraPermission] = useState(null)
  const [cameratype, setcameratype] = useState(Camera.Constants.Type.back)
  const [messages, setMesssage] = useState([])
  const [chatBalance, setChatBalance] = useState(0)
  const [chatAddFundBalance, setChatAddFundBalance] = useState(0)
  const [addFundBsClose, setaddFundBsClose] = useState(
    false
  )
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [renderFlatlist, setRenderFlatlist] = useState(false)
  const [amount, amountChange] = useState(0)
  const [fundData, setFundData] = useState(
    ['Personal', 'Shared']
  );

  const dummyData = [
    {
      image: require('../../../assets/images/notification1.png')
    },
    {
      image: require('../../../assets/images/notification2.png')
    },
    {
      image: require('../../../assets/images/notification3.png')
    },
    {
      image: require('../../../assets/images/notification4.png')
    },
  ]
  useEffect(() => {

     socket.on('broadcast', (data) => {
      let details = _.get(data, 'groupmessage', {})
          if (details && _.get(details, 'senderId') == _.get(props, 'userProfile._id')) {
            details['user'] = { _id: _.get(props, 'userProfile._id') }
            details['_id'] = _.uniqueId("uniqIdFormate_")
           
          }else{
            if (_.get(details,'text') && `${_.get(details,'text')}`.indexOf('added the Fund')) {
              details['text'] = _.replace(_.get(details,'text'),'You',headerTitle(_.pick(details, ['firstname', 'lastname'])))
            
              
            
            }
          }
    
          setMesssage(old => [details, ...old])
          setmessageText('')
    
        });
    socketWallet.on('walletbroadcast', (data) => {
      getWalletValue({ id: _.get(props, 'groupId') })

    });
    if (_.get(props, 'groupId')) {
      getGroup({ id: _.get(props, 'groupId') })
      getWalletValue({ id: _.get(props, 'groupId') })

    }

  }, [])

  const initialChatMessage =(details)=>{
    if (_.get(props, 'created')==true) {
      let detailsss = {
        conversationId: _.get(details, '_id'),
        senderId: _.get(props, 'userProfile._id'),
        text: `have created the group "${_.get(details, 'groupId.groupname')}"`,
        groupId: _.get(props, 'groupId'),
        createdAt: moment.utc(new Date()),
        firstname: _.get(props, 'userProfile.firstname'),
        lastname: _.get(props, 'userProfile.lastname')

      }
      
      socket.emit('groupmessage', detailsss, (data) => {
        getUserMessages({ id: _.get(details, 'groupId._id') })
        getWalletValue({ id: _.get(props, 'groupId') })


      })
    }

  }

  const getWalletValue = (id) => {
    props.getWallet({
      params: id,
      callback: (res, data) => {
        
if (_.size(_.get(data, 'msg')) > 0) {
          let amountMap = _.get(data, 'msg', []).map(user => parseFloat(user.amount));
          setChatBalance(_.sum(amountMap))
        }

      }
    })

  }
  const handleConfirm = (date, type) => {
    // let setdate = moment(date).format('DD.MM.YYYY')
    // setDob(setdate)
    // setDob(moment(date).format("DD.MM.YYYY"))
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleTimeConfirm = (date, type) => {
    // let setdate = moment(date).format('DD.MM.YYYY')
    // setDob(setdate)
    // setDob(moment(date).format("DD.MM.YYYY"))
    hideTimePicker();
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const sendMessage = (body) => {

    if (messageText !== '') {
      let details = {
        conversationId: _.get(groupDetails, '_id'),
        senderId: _.get(props, 'userProfile._id'),
        text: messageText,
        groupId: _.get(props, 'groupId'),
        createdAt: moment.utc(new Date()),
        firstname: _.get(props, 'userProfile.firstname'),
        lastname: _.get(props, 'userProfile.lastname')

      }
      socket.emit('groupmessage', details, (data) => {
        getUserMessages({ id: _.get(groupDetails, 'groupId._id') })


      })

    }

  }

  const getPermissionAsync = async (permission) => {
    const { status } = await Permissions.askAsync(permission)
    if (status !== 'granted') {
      const permissionName = permission.toLowerCase().replace('_', ' ')
      Alert.alert(
        'Cannot be done 😞',
        `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
        [
          {
            text: "Let's go!",
            onPress: () => Linking.openURL('app-settings:'),
          },
          { text: 'Nevermind', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: true },
      )

      return false
    }
    return true
  }
  const searchContacts = () => {
    setRenderFlatlist(true)
  }
  const splitBill = () => {
    // setMesssage("SPLITBILL")
    refSplitBill.current?.close()
  }
  const getGroup = (body, type) => {
    props.nativeLoadingOverlaySpinner.show();

    props.getGroup({
      body,
      callback: (response, data) => {
        
        setGroupDetails(_.get(data, 'data[0]', {}))
        getUserMessages({ id: _.get(data, 'data[0].groupId._id') })
        initialChatMessage(_.get(data, 'data[0]', {}))
        if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
          props.nativeLoadingOverlaySpinner.close();
        }

      }
    }
    );
  }

  // Getting location

  const getLocationAsync = async (onSend) => {
    if (await getPermissionAsync(Permissions.LOCATION)) {
      const location = await Location.getCurrentPositionAsync({})
      if (location) {
        onSend([{ location: location.coords }])
      }
    }
  }
  const headerTitle = (details) => {
    return _.startCase(_.get(details, 'firstname')) + ' ' + _.startCase(_.get(details, 'lastname'))
  }
  const getUserMessages = (body, type) => {
    props.nativeLoadingOverlaySpinner.show();
    props.getUserMessages({
      body,
      callback: (response, data) => {
        if (response) {
          let datas = []

          _.map(_.get(data, 'msg', []), (details, index) => {
            console.log('details',details);
            if (_.get(details, 'senderId._id') == _.get(props, 'userProfile._id')) {
              details.user = { _id: _.get(props, 'userProfile._id'), name: headerTitle(_.get(details, 'senderId')) }
              let text = `${_.get(details,'text')}`.split('- ')
              console.log('text',text);
              if (_.isArray(text) && _.size(text)>1) {
                details.text = `$ ${parseFloat(text[1])}`
                details.fundAmount =parseFloat(text[1])
              }
              if (`${_.get(details,'text')}`.indexOf('created the group') > -1) {
                details.text = `You ${_.get(details,'text')}`
              }
              
              datas.push({ ...details })
            } else {
              details.user = { _id: _.get(details, 'senderId._id'), name: headerTitle(_.get(details, 'senderId')) }
              let text = `${_.get(details,'text')}`.split('- ')
              if (_.isArray(text) && _.size(text)>1) {
                details.text = `$ ${parseFloat(text[1])}`
                details.fundAmount =parseFloat(text[1])
              }
              if (`${_.get(details,'text')}`.indexOf('created the group') > -1) {
                details.text = `${headerTitle(_.get(details, 'senderId'))} ${_.get(details,'text')}`
              }
              if (`${_.get(details,'text')}`.indexOf('added the Fund') > -1) {
                details.text = _.replace(_.get(details,'text'),'You',headerTitle(_.get(details, 'senderId')))
              }
              datas.push({ ...details })
            }

          })
          setMesssage(_.reverse(datas))

        }
        if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
          props.nativeLoadingOverlaySpinner.close();
        }
      }
    }
    );
  }
  // picking Image

  const pickImageAsync = async (onSend) => {
    if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      if (!result.cancelled) {
        onSend([{ image: result.uri }])
        return result.uri
      }
    }
  }

  // taking picture using camera

  const takePictureAsync = async (onSend) => {
    if (await getPermissionAsync(Permissions.CAMERA)) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      if (!result.cancelled) {
        onSend([{ image: result.uri }])
        return result.uri
      }
    }
  }

  // rendering transaction view

  const renderFund = () => {
    Keyboard.dismiss()
    setfund(!fund)
    setattachment(false)

  }

  // rendering attachment view

  const renderattachment = () => {
    Keyboard.dismiss()
    setfund(false)
    setattachment(!attachment)
  }

  // Message Input Typing
  const onChangeMessageText = (text) => {

    if (text.length > 0) {
      setmessageText(text)
      setsend(true)

    } else {
      setmessageText(text)
      setsend(false)
    }

  }


  // rendering bubble in chat

  const renderBubble = props => {
    // return (
    //   <View style={{
    //     width: 208,
    //     height: 134,
    //     borderRadius: 15,
    //     paddingVertical: 12,
    //     paddingLeft: 16,
    //     paddingRight: 13,
    //     backgroundColor: 'white',
    //     shadowColor: "#000",
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    //   }}
    //   >
    //     <View style={{ flex: 1, paddingBottom: 6 }}>
    //       <Text style={{ fontWeight: '700', fontSize: 12 }}>Requested for "Cake"</Text>
    //     </View>
    //     <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
    //       <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
    //         <Text style={{ fontWeight: '400', fontSize: 18 }}>$ </Text>
    //         <Text style={{ fontWeight: '400', fontSize: 24 }}>56.25</Text>
    //       </View>
    //       <View style={{ flex: 1, alignItems: 'flex-end' }}>
    //         <TouchableOpacity
    //           onPress={() => refSplitBillPay.current.open()}
    //           style={{ width: 66, height: 28, borderRadius: 15, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center' }}>
    //           <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>Pay</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 2 }}>
    //       <View style={{ flex: 1, alignItems: 'center', }}>
    //         <FlatList
    //           horizontal={true}
    //           showsHorizontalScrollIndicator={false}
    //           data={dummyData}
    //           keyExtractor={(item, index) => item + index}
    //           renderItem={({ item, index }) => {
    //             return (
    //               <View style={{ flex: 1, opacity: 0.5, alignItems: 'center', justifyContent: 'center' }}>
    //                 <Image
    //                   style={{ height: 24, width: 24, borderRadius: 5, resizeMode: 'contain', }}
    //                   source={item.image}></Image>
    //               </View>
    //             )
    //           }}
    //         />
    //       </View>
    //       <View style={{ flex: 1, alignItems: 'flex-end' }}>
    //         <TouchableOpacity style={{ width: 66, height: 28, borderColor: 'rgba(8, 53, 109, 0.5)', borderWidth: 1, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
    //           <Text style={{ fontSize: 12, fontWeight: '700', color: '#08356D' }}>Decline</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
    //       <View style={{ flex: 2, right: 10 }}>
    //         <Slider
    //           style={{ width: 142, height: 10 }}
    //           minimumValue={0}
    //           maximumValue={4}
    //           minimumTrackTintColor="#26BFBF"
    //           maximumTrackTintColor="rgba(142, 142, 142, 0.3)"
    //           thumbImage={require('../../../assets/images/dollarbag3x.png')}
    //         />
    //       </View>
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Text style={{ fontSize: 6, fontWeight: '700' }}>0 of 4 paid</Text>
    //       </View>
    //     </View>
    //     <View style={{ flex: 1, flexDirection: 'row', paddingTop: 7 }}>
    //       <Image
    //         style={{ height: 9, width: 9, paddingLeft: 3 }}
    //         source={require('../../../assets/images/greentick3x.png')}>
    //       </Image>
    //       <Text style={{ color: "#228B22", paddingLeft: 3, fontSize: 6, fontWeight: '600' }}>Paid </Text>
    //       <Text style={{ fontSize: 6, fontWeight: '600' }}>. Due by 14/04/2021 at 2.00pm</Text>
    //     </View>
    //   </View>
    // )
    // }
    return (<Bubble {...props}
      textStyle={{
        right: { color: 'white', },
        left: { color: 'white', }
      }}
      wrapperStyle={{ left: { backgroundColor: _.get(props,'currentMessage.fundAmount')? '#0a356d': '#08356D',
      borderRadius:_.get(props,'currentMessage.fundAmount')?0:15 }, 
      right: { backgroundColor: _.get(props,'currentMessage.fundAmount')? '#0a356d': '#3DBFBF' ,
      borderRadius:_.get(props,'currentMessage.fundAmount')?0:15} }}
    />)
  }


  // rendering input tool bar in chat

  const renderInputToolbar = props => {

    return (

      <View style={{ height: 46 }}>
        <View style={{ borderWidth: 0.5, borderColor: 'rgba(8, 53, 109, 0.3)' }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingTop: 12 }}>

          <TouchableOpacity
            onPress={() => renderFund()}
            style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={fund ? require('../../../assets/images/cross.png') : require('../../../assets/images/Blue_Plus.png')}
              style={{ height: 14, width: 14, tintColor: "#08356D", resizeMode: 'contain' }}
            >
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => renderattachment()}
            style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
            <Image source={attachment ? require('../../../assets/images/cross.png') : require('../../../assets/images/attachment.png')}
              style={{ height: 16.2, width: 17.18, tintColor: "#08356D", resizeMode: 'contain' }}
            >
            </Image>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: windowWidth * 0.74, height: 36, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(8, 53, 109, 0.3)', marginLeft: 8 }}>
            <TextInput
              value={messageText}
              onChangeText={text => onChangeMessageText(text)}
              style={{ width: windowWidth * 0.64, height: 36, paddingLeft: 15 }}></TextInput>

            {send == true &&
              <TouchableOpacity
                onPress={() => sendMessage()}
                style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                <Image
                  source={require('../../../assets/images/send.png')}
                  style={{ height: 20, width: 20, tintColor: '#08356D', }}
                ></Image>
              </TouchableOpacity>}

            {/* <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <Image
                  source={require('../../../assets/images/microphone.png')}
                  style={{ height: 20, width: 20, tintColor: '#08356D', }}
                ></Image>
              </TouchableOpacity> */}
          </View>
        </View>
      </View>
    )
  }



  const onBack = () => {
    Actions.chatsList()
  }

  const onSend = (message = []) => {
    setMessageText('')
    let msg = [
      {
        _id: 2,
        text: messageText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]
    //  GiftedChat.append(msg)
    setMessages(previousState => GiftedChat.append(previousState.messages, msg));

  }
  const toastMessage = () => {
    Alert.alert(
      '',
      `Coming Soon...`,
      [
        {
          text: "Okay",
          
        },
      ],
      { cancelable: true },
    )
    
    // Toast.show({
    //   type: 'info',
    //   text1: 'Coming Soon👋',
    //   visibilityTime: 2000,
    // });
  }

  const addAmountValue = () => {
    let balance = parseFloat(chatBalance) + parseFloat(chatAddFundBalance)
    if (balance <= 999) {


      // setChatBalance(balance)
      let details = {
        groupId: _.get(props, 'groupId'),
        senderId: _.get(props, 'userProfile._id'),
        amount: chatAddFundBalance
      }
      socketWallet.emit('groupwallet', details, (data) => {
        
        

      })
      let detailsss = {
        conversationId: _.get(groupDetails, '_id'),
        senderId: _.get(props, 'userProfile._id'),
        text: `You added the Fund - ${chatAddFundBalance}`,
        groupId: _.get(props, 'groupId'),
        createdAt: moment.utc(new Date()),
        firstname: _.get(props, 'userProfile.firstname'),
        lastname: _.get(props, 'userProfile.lastname')

      }
      
      socket.emit('groupmessage', detailsss, (data) => {
        getUserMessages({ id: _.get(groupDetails, 'groupId._id') })
        getWalletValue({ id: _.get(props, 'groupId') })


      })
      // props.nativeLoadingOverlaySpinner.show();
      // props.postWallet({
      //   body,
      //   callback: (res, data) => {
      //     if (res == true) {
      //       getWalletValue({ id: _.get(props, 'groupId') })
      //       refRBSheet.current?.close()
      //       setfund(false)
      //     }
      //     if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
      //       props.nativeLoadingOverlaySpinner.close();
      //     }
      //   }
      // })



      refRBSheet.current?.close()
    } else {
      Alert.alert(
        'Warning',
        'Maximum wallet amount 999',
        [
          {
            text: "Okay",

          },
        ],
        { cancelable: true },
      )
    }
  }

  const render = () => {
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}> 
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>

        <View style={{ paddingHorizontal: hp('2'), height: hp('12'), paddingTop: hp('5'), backgroundColor: '#08356D', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>

          <View style={{ backgroundColor: 'white', height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
            <TouchableOpacity
              onPress={() => onBack()}
            >
              <Image source={require('../../../assets/images/back.png')}
                style={{ height: 15, width: 20, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 12 }}>
            <Image style={{ width: 42, height: 40, borderRadius: 15 }}
              //  source={require('../../../assets/images/group-profile1.png')}
              source={_.get(groupDetails, 'groupId.groupUrl') != 'no-phor.jpg' ? { uri: _.get(groupDetails, 'groupId.groupUrl') } : require('../../../assets/images/group-profile1.png')}
            >

            </Image>
          </View>
          <View style={{ paddingLeft: 12, paddingRight: 13, width: windowWidth * 0.53 }}>
            <TouchableOpacity onPress={() => Actions.groupInfo({ groupId: _.get(props, 'groupId'), title: _.startCase(_.get(groupDetails, 'groupId.groupname', '')) })}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>
                  {_.startCase(_.get(groupDetails, 'groupId.groupname', ''))}
                </Text>
                <Image>

                </Image>
              </View>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
                {_.size(_.compact(_.get(groupDetails, 'members', [])))} Members
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginBottom: 7 }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>Balance:</Text>
            <LinearGradient
              style={{ width: 76, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
              colors={['#3DBFBF', '#7BBEBE']}>
              <Text style={{ color: 'white', fontWeight: '600', fontSize: hp('2.46'), }}>${chatBalance}</Text>
            </LinearGradient>
          </View>

        </View>

        <View style={{ flex: 1, marginBottom: 18 }}>


          <GiftedChat
          key={_.get(props, 'groupId')}
      
            renderUsernameOnMessage={true}
            renderAvatar={null}
            text={messageText}
            messages={messages}
            onSend={messages => onSend(messages)}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            user={{
              _id: _.get(props, 'userProfile._id'),
            }}
            bottomOffset={12}
          />
          <Camera type={cameratype} />
        </View>
        {fund && <View style={{ marginTop: 20, height: hp('15'), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly', paddingTop: 10, }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Text style={{ fontSize: 25, fontWeight: '900', color: '#08356D' }}>$</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Add Funds</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => refSplitBill.current.open()}
              style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#08356D' }}>$/$</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refSplitBill.current.open()}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Split Bill</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => toastMessage()}
              style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 17, height: 20 }}
                source={require('../../../assets/images/statement.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toastMessage()}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Statement</Text>
            </TouchableOpacity>
          </View>
        </View>}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              height: hp('67.74'),
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              minHeight: 67.74/100 * Math.round(Dimensions.get('window').height)
            },
          }}
        >
          <TouchableOpacity onPress={() => refRBSheet.current.close()}
            style={BottomSheetStyle.closeBs}
            activeOpacity={0.75}
            // onPress={onClose}
            hitSlop={BottomSheetStyle.hitSlot}
          >
            <Image
              source={require('../../../assets/images/crosscopy.png')}
              style={BottomSheetStyle.crossIcon}
            />
          </TouchableOpacity>
          <Title style={BottomSheetStyle.header}>Add Funds</Title>
          <View style={AddFundStyle.container1a}>

            <View style={AddFundStyle.addFund}>
              <Text style={AddFundStyle.amount}>From</Text>
              <ModalDropdown
                options={fundData}
                style={AddFundStyle.modalDropDown}
                showsVerticalScrollIndicator={false}
                defaultValue="Make a Selection"
                textStyle={{
                  left: 10,
                }}
                textStyle={AddFundStyle.dropDownPlaceholder}
                dropdownTextStyle={AddFundStyle.dropDownText}

              />

            </View>
            <View style={AddFundStyle.margin}>
              <Text style={AddFundStyle.amount}>Amount</Text>
              <TextInput
                keyboardType='numeric'
                style={AddFundStyle.textInput}
                placeholder="$0.00"
                onChangeText={setChatAddFundBalance}
                value={amount}
              />
            </View>
          </View>
          <View style={AddFundStyle.container2a}>
            <Button
              buttonStyle={BottomSheetStyle.button}
            title={'Add Funds'}
            onPress={() => addAmountValue()}
          // disabled={disabled}
          /></View>
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </RBSheet>
 {/* // RB Sheet for Split Bill  */}


 <RBSheet
          ref={refSplitBill}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              height: '82%',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              minHeight: 82/100 * Math.round(Dimensions.get('window').height)

            },
          }}
        >

          <TouchableOpacity onPress={() => refSplitBill.current.close()}
            style={BottomSheetStyle.closeBs}
            activeOpacity={0.75}
            // onPress={onClose}
            hitSlop={BottomSheetStyle.hitSlot}
          >

            <Image
              source={require('../../../assets/images/crosscopy.png')}
              style={BottomSheetStyle.crossIcon}
            />

          </TouchableOpacity>

          <Title style={BottomSheetStyle.header}>Split Bill</Title>

          <View style={{ flex: 2, marginLeft: wp('5.33'),marginTop: hp('1.48')}}>

            <View >

              <Text style={AddFundStyle.amount}>Bill Name</Text>

              <TextInput
                style={AddFundStyle.textInput}
                placeholder="Bill Name"
              />

            </View>

            <View style={AddFundStyle.margin}>

              <Text style={AddFundStyle.amount}>Amount</Text>

              <TextInput
                keyboardType='numeric'
                style={AddFundStyle.textInput}
                placeholder="$0.00"
              />

            </View>

            <View style={AddFundStyle.margin}>

              <Text style={AddFundStyle.amount}>Split Bill With:</Text>

              <TextInput
                style={AddFundStyle.textInput}
                placeholder="Search Contact"
                onChangeText={() => searchContacts()}
              />

            </View>

            {renderFlatlist &&
               <View style={{ width: '90%', paddingTop: 5, paddingHorizontal: wp('1.86') }}>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={dummyData}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ flex: 1, marginRight: hp('1.48') }}>
                        <Image
                          style={{ height: 32, width: 32, borderRadius: 7, resizeMode: 'contain', }}
                          source={item.image}></Image>
                        <Image
                          style={{ height: 11.67, width: 11.67, position: 'absolute', left: 24 }}
                          source={require('../../../assets/images/x-circle3x.png')}>

                        </Image>

                      </View>
                    )
                  }}
                />
              </View>}

            <View style={AddFundStyle.margin}>

              <Text style={AddFundStyle.amount}>Split Percentage</Text>

              <ModalDropdown
                options={fundData}
                style={AddFundStyle.modalDropDown}
                defaultValue="Equal"
                textStyle={AddFundStyle.dropDownPlaceholder}
                dropdownTextStyle={AddFundStyle.dropDownText}
                // onSelect={AddFundDataChange}
                dropdownStyle={AddFundStyle.dropDownContainer}
              />

            </View>

            <View style={AddFundStyle.margin}>

              <Text style={AddFundStyle.amount}>
                Due by:
              </Text>

              <View style={{ flexDirection: 'row',}}>

                <TouchableOpacity onPress={() => showDatePicker()}
                style={{
                  height: hp('5.91'),
                  width: wp('38.66'),
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#08356D',
                  marginRight: wp('3.2'),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: wp('4.26'), fontWeight: '400' }}>14/04/2021</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => showTimePicker()}
                  style={{
                    height: hp('5.91'),
                    width: wp('29.06'),
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#08356D',
                    marginLeft: wp('2.66'),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>

                  <Text style={{ fontSize: wp('4.26'), fontWeight: '400' }}>02:00</Text>
                    <Text style={{ fontSize: wp('4.26'), fontWeight: '400', color: '#08356D' }}> PM</Text>

                  </View>

                </TouchableOpacity>

              </View>

              <DateTimePickerModal
                maximumDate={new Date()}
                placeholder='Date of Birth'
                headerTextIOS={'Date of Birth'}
                isVisible={isDatePickerVisible}
                mode={"date"}
                onConfirm={(e) => handleConfirm(e, 'date')}
                onCancel={() => hideDatePicker('date')}
              />

              <DateTimePickerModal
                maximumDate={new Date()}
                placeholder='Date of Birth'
                headerTextIOS={'Date of Birth'}
                isVisible={isTimePickerVisible}
                mode={"time"}
                onConfirm={(e) => handleTimeConfirm(e, 'time')}
                onCancel={() => hideTimePicker('time')}
              />

            </View>

          </View>

          <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignSelf: 'center'
          }}>
            <Button
              buttonStyle={BottomSheetStyle.button}
              title={'Split Bill'}
              onPress={() => splitBill()}
            />
          </View>

        </RBSheet>



        {/* // RB Sheet for Split Bill Pay  */}


        <RBSheet
          ref={refSplitBillPay}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              height: hp('67.74'),
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              minHeight: 67.74/100 * Math.round(Dimensions.get('window').height)
            },
          }}
        >
          <TouchableOpacity onPress={() => refSplitBillPay.current.close()}
            style={BottomSheetStyle.closeBs}
            activeOpacity={0.75}
            // onPress={onClose}
            hitSlop={BottomSheetStyle.hitSlot}
          >
            <Image
              source={require('../../../assets/images/crosscopy.png')}
              style={BottomSheetStyle.crossIcon}
            />
          </TouchableOpacity>

          <Title style={BottomSheetStyle.header}>Pay Bill</Title>

          <View style={{ flex: 1, marginTop: 6, marginLeft: wp('5.33'), }}>
            <View>
              <Text style={{ fontWeight: '500', fontSize: wp('3.73') }}>Your assigned share of the total bill is $5</Text>

            </View>


            <View style={AddFundStyle.addFund}>

              <Text style={AddFundStyle.amount}>From</Text>




              <ModalDropdown
                options={fundData}
                style={AddFundStyle.modalDropDown}
                defaultValue="Make a Selection"
                textStyle={AddFundStyle.dropDownPlaceholder}
                dropdownTextStyle={AddFundStyle.dropDownText}
                // onSelect={AddFundDataChange}
                dropdownStyle={AddFundStyle.dropDownContainer}
              />

            </View>
            <View style={AddFundStyle.margin}>
              <Text style={AddFundStyle.amount}>Amount</Text>
              <TextInput
                keyboardType='numeric'
                style={AddFundStyle.textInput}
                placeholder="$0.00"
              // onChangeText={setChatAddFundBalance}
              // value={amount}
              />
            </View>
          </View>
          <View style={BottomSheetStyle.container}>

            <Button
              buttonStyle={BottomSheetStyle.button}
              title={'Pay'}
            // onPress={() => addAmountValue()}
            // disabled={disabled}
            />
          </View>
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </RBSheet>

        {attachment && <View style={{ marginTop: 30, height: hp('15'), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>

          {/* <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => { takePictureAsync() }}
              style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                source={require('../../../assets/images/camera.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { takePictureAsync() }}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D',marginTop: 5 }}>Camera</Text>
            </TouchableOpacity>
          </View> */}

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => pickImageAsync()}
              style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                source={require('../../../assets/images/gallery.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImageAsync()}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                source={require('../../../assets/images/audio.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D',marginTop: 5 }}>Audio</Text>
            </TouchableOpacity>
          </View> */}

          {/* <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => getLocationAsync()}
              style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                source={require('../../../assets/images/location.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => getLocationAsync()}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D',marginTop: 5 }}>Location</Text>
            </TouchableOpacity>
          </View> */}


        </View>}
        <Toast ref={(ref) => Toast.setRef(ref)} />

      </View></TouchableWithoutFeedback>
    );
  }
  return render()
}
const mapStateToProps = (state) => {
  return {
    userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {})

  }
};
const mapDispatchToProps = dispatch => ({
  getGroup: details => dispatch(global.redux.action.group.getGroupConversation(details)),
  getUserMessages: details => dispatch(global.redux.action.group.getUserMessage(details)),
  sendMessage: details => dispatch(global.redux.action.group.sendMessage(details)),
  getWallet: details => dispatch(global.redux.action.group.getWallet(details)),
  postWallet: details => dispatch(global.redux.action.group.postWallet(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ChatScreen));

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

