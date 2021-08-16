import React, { Component } from 'react';
import { Keyboard, FlatList, Button, Alert, Image, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, ImageBackground, } from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat, Send, InputToolbar, Actions,Day,Footer } from 'react-native-gifted-chat';
import { Linking } from 'expo'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const avatar = require('../assets/notification1.png')
const user = {
  _id: 1,
  name: 'snkr',
}

const friend = {
  _id: 2,
  name: 'Ria',
  avatar: avatar
}

export default class ChatScreen extends Component {

  constructor(props) {

    super(props);


    const { navigate } = this.props.navigation;
    this.state = {
      messages: [],
      send: false,
      fund: false,
      attachment: false,
      step: 0,
      typingText: null,
      isTyping: false,
      image: null,
      location: null
    }

  }


  componentDidMount() {

  }

  renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      containerStyle={{ backgroundColor: 'pink' }}
      wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
      textStyle={{ color: 'crimson', fontWeight: '900' }}
    >
      <Text>testttttttiiiiiiinnnnnnnnggggggggg</Text>
    </SystemMessage>
  );

  // renderDay() {
  //   if (this.props.currentMessage && this.props.currentMessage.createdAt) {
  //     const { containerStyle, onMessageLayout, ...props } = this.props
  //     if (this.props.renderDay) {
  //       return this.props.renderDay(props)
  //     }
  //     return <Day {...props} />
  //   }
  //   return null
  // }
  // Getting permission 


  async getPermissionAsync(permission) {
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


  async getLocationAsync(onSend) {
    if (await this.getPermissionAsync(Permissions.LOCATION)) {
      const location = await Location.getCurrentPositionAsync({})
      if (location) {
        this.onSend([{ location: location.coords }])
      }
    }
  }


  // picking Image


  async pickImageAsync(onSend) {
    if (await this.getPermissionAsync(Permissions.CAMERA_ROLL)) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      if (!result.cancelled) {
        this.onSend([{ image: result.uri }])
        return result.uri
      }
    }
  }


  // taking picture using camera


  async takePictureAsync(onSend) {
    if (await this.getPermissionAsync(Permissions.CAMERA)) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      if (!result.cancelled) {
        this.onSend([{ image: result.uri }])
        return result.uri
      }
    }
  }


  // Opening map


  // openMapAsync = async () => {
  //   if (Platform.OS === 'web') {
  //     alert('Opening the map is not supported.')
  //     return
  //   }
  //   const { currentMessage: { location = {} } = {} } = this.props

  //   const url = Platform.select({
  //     ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
  //     default: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
  //   })

  //   try {
  //     const supported = await Linking.canOpenURL(url)
  //     if (supported) {
  //       return Linking.openURL(url)
  //     }
  //     alert('Opening the map is not supported.')
  //   } catch ({ message }) {
  //     alert(message)
  //   }
  // }



  // rendering transaction view


  renderFund = () => {
    Keyboard.dismiss()
    this.setState({ fund: !this.state.fund })
    this.setState({ attachment: false })
  }

  // rendering attachment view

  renderattachment = () => {
    Keyboard.dismiss()
    this.setState({ attachment: !this.state.attachment })
    this.setState({ fund: false })
  }


  // sendbutton in chat


  // sendButton = props => {
  //   this.setState({ send: true })
  // }


  // sending msg in chat

  onChangeMessageText(text) {
    console.log('text: ', text)
    if (text.length > 0) {
      this.setState({ messageText: text, send: true })
    }

  }
  // onSend = (messages = []) => {
  //   const step = this.state.step + 1

  //   this.setState((previousState) => {
  //     const sentMessages = [{ ...messages[0], sent: true, received: true }]
  //     return {
  //       messages: GiftedChat.append(
  //         previousState.messages,
  //         sentMessages,
  //         Platform.OS !== 'web',
  //       ),
  //       step,
  //     }
  //   })
  // }


  renderSend = props => {
    return (
      <Send
        {...props}
        // disabled={!props.text}
        containerStyle={{
          width: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 4,
        }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../assets/send.png')}
        />
      </Send>
    )
  }
  // rendering bubble in chat

  renderBubble = props => {
    return (
      <Bubble {...props}
        textStyle={{
          right: { color: 'white', },
          left: { color: 'white', }
        }}
        wrapperStyle={{ left: { backgroundColor: '#08356D' }, right: { backgroundColor: '#3DBFBF' } }}
      />
    )
  }

  // rendering input tool bar in chat

  renderInputToolbar = props => {

    return (

      <View style={{ height: 60 }}>
        <View style={{ borderWidth: 0.5, borderColor: 'rgba(8, 53, 109, 0.3)' }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingTop: 12 }}>

          <TouchableOpacity
            onPress={() => this.renderFund()}
            style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={this.state.fund ? require('../assets/cross.png') : require('../assets/Blue_Plus.png')}
              style={{ height: 14, width: 14, tintColor: "#08356D" }}
            >
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.renderattachment()}
            style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
            <Image source={this.state.attachment ? require('../assets/cross.png') : require('../assets/attachment.png')}
              style={{ height: 16.2, width: 17.18, tintColor: "#08356D" }}
            >
            </Image>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: windowWidth * 0.71, height: 36, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(8, 53, 109, 0.3)', marginLeft: 8 }}>
            <TextInput
              ref={(input) => this.messageInputRef = input}
              onChangeText={text => this.onChangeMessageText(text)}
              value={this.state.messageText}
              style={{ width: windowWidth * 0.61, height: 36, paddingLeft: 15 }}></TextInput>

            {this.state.send == true ? (
              <TouchableOpacity
                onPress={() => this.onSend()}
                style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                <Image
                  source={require('../assets/send.png')}
                  style={{ height: 20, width: 20, tintColor: '#08356D', }}
                ></Image>
              </TouchableOpacity>
            ) : (<TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                source={require('../assets/microphone.png')}
                style={{ height: 20, width: 20, tintColor: '#08356D', }}
              ></Image>
            </TouchableOpacity>)}
          </View>
        </View>
      </View>
    )
  }



  onBack = () => {
    this.props.navigation.navigate('MessageScreen')
  }

  onSend = (message = []) => {
    console.log('on Send')
    console.log('messageText : ', this.state.messageText)
    this.setState({ messageText: '' })
    let msg = [
      {
        _id: 2,
        text: this.state.messageText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]
    //  GiftedChat.append(msg)
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, msg),
    }));
    //  this.setState({refresh: 1})
  }
  renderDay = (props) => {
    return(
      <View style={{alignItems:'center',justifyContent:'center'}}>
      
        <Text style={{fontSize:12,color:'rgba(8, 53, 109, 0.5)'}}>Today</Text>
        <Text style={{fontSize:12,color:'rgba(8, 53, 109, 0.5)', }}>You created group "{this.groupName}"</Text>
      {/* // </View> */}
      <Day {...props} textStyle={{paddingBottom:24}} nextMessage={false}>
      {/* <Text>hi this is snkr</Text> */}
    </Day>
    </View>
    )
   
  }
  renderFooter = (props) =>{
    if(this.state.messages == 0){
    return(
      <View style={{paddingBottom:48,alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:12,color:'rgba(8, 53, 109, 0.5)'}}>Today</Text>
        <Text style={{fontSize:12,color:'rgba(8, 53, 109, 0.5)'}}>You created group "{this.groupName}"</Text>
      </View>
    )
    }else{
      return null
    }
  }

  render() {

    const groupData = this.props.route.params.groupMembers
    const groupDp = this.props.route.params.groupDp
    this.groupName = this.props.route.params.groupName
    // console.log(groupData,groupDp,groupName);


    return (
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>


        <View style={{
          paddingHorizontal: hp('2'), height: hp('12'), paddingTop: hp('5'), backgroundColor: '#08356D', flexDirection: 'row', alignItems: 'center', paddingBottom: 5,
        }}>

          <View style={{ backgroundColor: 'white', height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
            <TouchableOpacity
              onPress={() => this.onBack()}
            >
              <Image source={require('../assets/back.png')}
                style={{ height: 15, width: 20, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ paddingLeft: 12 }}>
            <Image style={{ width: 42, height: 40, borderRadius: 12 }}
              source={groupDp != null ? { uri: groupDp } : require('../assets/EmptyGroupIcon.png')}
            // source={require('../assets/notification1.png')}
            >

            </Image>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatInfoScreen', { groupDp: groupDp, groupName: groupName })}>
            <View style={{ paddingLeft: 12, paddingRight: 13, width: windowWidth * 0.53 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>
                  {this.groupName}
                </Text>
                <Image>

                </Image>
              </View>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
                {groupData.length} Members
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>Balance:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
              <LinearGradient
                style={{ width: 76, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                colors={['#3DBFBF', '#7BBEBE']}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, }}>$0</Text>
              </LinearGradient>

            </View>
          </View>

        </View>

        <View style={{ flex: 1 }}>

          <GiftedChat

            text={this.state.messageText}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            renderBubble={this.renderBubble}
            renderInputToolbar={this.renderInputToolbar}
            renderDay={this.renderDay}
            renderFooter={this.renderFooter}

            user={{
              _id: 1,
            }}
            bottomOffset={12}
          />

        </View>



        {this.state.fund && <View style={{ marginTop: 20, height: hp('15'), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly', paddingTop: 10, }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Text style={{ fontSize: 25, fontWeight: '900', color: '#08356D' }}>$</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Add Funds</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#08356D' }}>$/$</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Split Bill</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Image
                style={{ width: 17, height: 20 }}
                source={require('../assets/statement.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Statement</Text>
            </TouchableOpacity>
          </View>
        </View>}



        {this.state.attachment &&

          <View style={{ marginTop: 30, height: hp('15'), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => { this.takePictureAsync() }}
                style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <Image
                  style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                  source={require('../assets/camera.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { this.takePictureAsync() }}>
                <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Camera</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => this.pickImageAsync()}
                style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <Image
                  style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                  source={require('../assets/gallery.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.pickImageAsync()}>
                <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Gallery</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <Image
                  style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                  source={require('../assets/audio.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Audio</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => this.getLocationAsync()}
                style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#CED7E2', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <Image
                  style={{ width: 20, height: 20, tintColor: '#08356D', resizeMode: 'contain' }}
                  source={require('../assets/location.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.getLocationAsync()}>
                <Text style={{ fontWeight: '500', fontSize: 14, color: '#08356D', marginTop: 5 }}>Location</Text>
              </TouchableOpacity>
            </View>


          </View>}


      </View>
    );
  }
}


