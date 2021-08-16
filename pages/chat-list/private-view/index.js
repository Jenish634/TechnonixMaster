import React, { Component, useEffect, useState } from 'react';
import { FlatList, Button, Alert, Image, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, ImageBackground, } from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat } from 'react-native-gifted-chat';
import { Camera } from 'expo-camera';
import { Linking } from 'expo'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import _ from 'lodash';
import {io} from 'socket.io-client'
import appConfig from "../../../core_units/config/env-variables";
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const socket =io('https://txfinance.herokuapp.com');
const PrivateChat =(props)=> {
  const [messages, setMesssage] = useState([])
    const [nickname, setnickname] = useState('text')
    const [conversationDetails, setConversationDetails] = useState({})
const [messagesList, setmessagesList] = useState([])
const [send, setsend] = useState(false)
const [fund, setfund] = useState(false)
const [attachment, setattachment] = useState(false)
const [cameraPermission, setcameraPermission] = useState(null)
const [cameratype, setcameratype] = useState(Camera.Constants.Type.back)
const [messageText, setmessageText] = useState('')

useEffect(() => {
  socket.on('my broadcast', (data) => {
    console.log('my broadcast',data);
    let details =_.get(data,'message',{})
    if (details && _.get(details,'senderId')==_.get(props,'userProfile._id')) {
      details['user']={_id:_.get(props,'userProfile._id')}
      details['_id']=_.uniqueId("uniqIdFormate_")
     }
     
     setMesssage(old=>[details,...old])
     setmessageText('')
    
  });
  if (_.get(props,'conversationParams.id')) {
      setConversationDetails(_.get(props,'conversationParams.detailsConversation',{}))
      getUserMessages({id:_.get(props,'conversationParams.id')})
  }else if (_.get(props,'conversationParams')) {
    let details ={..._.get(props,'conversationParams',{})}
    delete details.name
      getConversation(details)
      // createConversation(_.get(props,'conversationParams'));    
  }

  

}, []);
const  getConversation = (body,type) => {
  props.nativeLoadingOverlaySpinner.show();
  
      props.getConversation({
          body,
          callback: (response, data) => {
            
              if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                  props.nativeLoadingOverlaySpinner.close();
                }
                
              if (response) {
if (_.size(_.get(data,'msg',[]))==0) {
   createConversation(_.get(props,'conversationParams'))
   setMesssage([])
}else if(_.size(_.get(data,'msg',[]))>0){
  setConversationDetails(_.get(data,'msg[0]',{}))
  getUserMessages({id:_.get(data,'msg[0]._id')})
}
                  
              }
          }
      }
      );
  }

  const  getUserMessages = (body,type) => {
      props.nativeLoadingOverlaySpinner.show();
      
          props.getUserMessages({
              body,
              callback: (response, data) => {
                
               if (response) {
                    
                    let datas =[]
                     
                      _.map(_.get(data,'msg',[]),(details,index)=>{
                        if (_.get(details,'senderId')==_.get(props,'userProfile._id')) {
                          details.user={_id:_.get(props,'userProfile._id')}
                          datas.push(details) 
                        }else{
                          details.user={_id:_.get(details,'senderId')}
                          datas.push(details) 
                        }

                      })
                      setMesssage(_.reverse(datas))
                      
                  }
                  if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                    props.nativeLoadingOverlaySpinner.close();
                  }
              }
          }
          );
      }
const  createConversation = (body) => {
  props.nativeLoadingOverlaySpinner.show();
      props.createConversation({
          body,
          callback: (response, data) => {
              if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                  props.nativeLoadingOverlaySpinner.close();
                }
                
              if (response) {
                  setConversationDetails(_.get(data, 'msg', {}))
              }
          }
      }
      );
  }

  const  sendMessage = (body) => {
    
      if (messageText!=='') {
          let details ={
              conversationId:_.get(conversationDetails,'_id'),
              senderId:_.get(props,'userProfile._id'),
              text:messageText,
              createdAt: moment.utc(new Date())

          }
          
          socket.emit('message', details,(data)=>{
          
            getUserMessages({id:_.get(conversationDetails,'_id')})
            
     
          })
          // props.nativeLoadingOverlaySpinner.show();
          // props.sendMessage({
          //     body:details,
          //     callback: (response, data) => {
          //       console.log(response, data);
          //         if (response) {
          //            
          //             setmessageText('')
          //         }
          //         if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          //           props.nativeLoadingOverlaySpinner.close();
          //         }
          //     }
          // }
          // );
      }
     
      }

          
  

  const getPermissionAsync = async(permission) =>{
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


  // Getting location

  const getLocationAsync = async(onSend)=> {
    if (await getPermissionAsync(Permissions.LOCATION)) {
      const location = await Location.getCurrentPositionAsync({})
      if (location) {
        onSend([{ location: location.coords }])
      }
    }
  }

  // picking Image

  const pickImageAsync= async(onSend)=> {
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

  const takePictureAsync = async(onSend)=> {
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
    setfund(!fund)
    setattachment(false)
    
  }

  // rendering attachment view

 const renderattachment = () => {
  setattachment(!attachment)
  setfund(false)
    
  }

  
 const onChangeMessageText = (text) =>{
    
    if (text.length > 0) {
      setmessageText(text)
      setsend(true)
      
    }else{
      setmessageText(text)
      setsend(false)
    }

  }

  // rendering bubble in chat

 const renderBubble = props => {
   

    return (<Bubble  {...props} 
      textStyle={{
        right: { color: 'white', },
        left: { color: 'white', }
      }}
      wrapperStyle={{ left: { backgroundColor: '#08356D' }, right: { backgroundColor: '#3DBFBF' } }}
    />)
  }

  // rendering input tool bar in chat

  const renderInputToolbar = props => {

    return (

      <View style={{ height: 46 }}>
        <View style={{ borderWidth: 0.5, borderColor: 'rgba(8, 53, 109, 0.3)' }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingTop: 12 }}>

          {/* <TouchableOpacity
            onPress={() => renderFund()}
            style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../assets/images/Blue_Plus.png')}
              style={{ height: 14, width: 14 }}
            >
            </Image>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => renderattachment()}
            style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
            <Image source={require('../../../assets/images/attachment.png')}
              style={{ height: 16.2, width: 17.18 }}
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
              </TouchableOpacity>
             }
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
    setmessageText('')
    
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
    setmessagesList(premessage=>GiftedChat.append(previousState, msg))
    
   
  }
  const headerTitle =(details)=>{
    return _.startCase(_.get(details,'firstname'))+ ' '+ _.startCase(_.get(details,'lastname'))
}
const  render = ()=> {
    
return (
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
              source={require('../../../assets/images/user-profile.jpeg')}
              // source={{uri:_.get(props,'conversationParams.name.photo')}}
            >

            </Image>
          </View>

          <View style={{ paddingLeft: 12, paddingRight: 13, width: windowWidth * 0.53 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>
              {headerTitle(_.get(props,'conversationParams.name'))}
              </Text>
              <Image>

              </Image>
            </View>
            {/* <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
              9 Members
            </Text> */}
          </View>

          {/* <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>Balance:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#27BFBF' }}> */}
              {/* <Image source={require('../../../assets/images/gradient.png')}
                style={{  height: hp('5'), width: hp('9'), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              </Image> */}
              {/* <Text style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, color: 'white', fontWeight: '600', fontSize: 18, }}>$0</Text>
            </View>
          </View> */}

        </View>

        <View style={{ flex: 1 ,marginBottom:18}}>


          <GiftedChat
          renderAvatar={null}
            messages={messages}
            onSend={messagesList => onSend(messagesList)}
            renderBubble={(details)=>renderBubble(details)}
            renderInputToolbar={renderInputToolbar}
            user={{
              _id: _.get(props,'userProfile._id'),
            }}
            
          />
          <Camera type={cameratype} />
        </View>
        {fund && <View style={{marginTop: 20, height: hp('15'), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly', paddingTop: 10, }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Text style={{ fontSize: 25, fontWeight: '900', color: '#08356D' }}>$</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Add Funds</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#08356D' }}>$/$</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Split Bill</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 17, height: 20 }}
                source={require('../../../assets/images/statement.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D', marginTop: 5 }}>Statement</Text>
            </TouchableOpacity>
          </View>
        </View>}


        {attachment && <View style={{marginTop: 30, height: hp('14'), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>

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
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#08356D',marginTop: 5 }}>Gallery</Text>
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


      </View>
    );
  }
  return render()
}

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

const mapStateToProps = (state) => {
  return {
      userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {})

  }
};
const mapDispatchToProps = dispatch => ({
  createConversation: details => dispatch(global.redux.action.chats.createConversation(details)),
  getConversation: details => dispatch(global.redux.action.chats.conversationCheck(details)),
  getUserMessages: details => dispatch(global.redux.action.chats.getUserMessage(details)),
  sendMessage: details => dispatch(global.redux.action.chats.sendMessage(details)),
  delete: details => dispatch(global.redux.action.chats.delete(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(PrivateChat));