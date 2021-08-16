import React, { Component, Fragment, useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View, ScrollView, TouchableHighlight, TextInput, Dimensions,StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

var _self = null

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;

    this.state = {
      firstNameText: '',
      lastNameText: '',
      emailText: '',
      mobileNumberText: '',
      passwordText: '',
      keyboardOffset: 0,
    }
    _self = this
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
      keyboardOffset: 40,
    })
  }

  _keyboardDidHide() {
    _self.setState({
      keyboardOffset: 0,
    })
  }
  /* User Defined Methods */
  validateFields = () => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (this.state.firstNameText.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter first name.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    } else if (this.state.lastNameText.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter last name.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    } else if (this.state.emailText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter email.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    } else if (reg.test(this.state.emailText) === false) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter valid email.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.mobileNumberText.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter valid mobile number.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    } else if (this.state.passwordText.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter password.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    } else if (this.state.passwordText.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Password must be atleast 4 characters.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    return true;
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {

    }
  }
  onSignIn = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  onSignUp = () => {
    if (this.validateFields()) {
      this.storeData('KMobileNumber', this.state.mobileNumberText)
      this.storeData('KPassword', this.state.passwordText)
      this.props.navigation.navigate('ProfileScreen')
    }
  }

  render() {

    return (

      <View style={styles.baseContainer}>

        {/* <View style={{bottom: this.state.keyboardOffset}}> */}

          <View style={styles.container1}>
            <Text style={styles.logo}>
              Tx Finance
            </Text>
            {/* <Image></Image> */}
          </View>


          <View style={styles.container2}>

            <Text style={styles.createAccountText}>
              Create your Account
            </Text>

            {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:30,}}> */}
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}

              onChangeText={text => this.setState({ firstNameText: text })}
              value={this.state.firstNameText}
              onSubmitEditing={() => { this.lastNameTextRef.focus(); }}
              blurOnSubmit={false}
              returnKeyType={'next'}

            >
            </TextInput>
            {/* </View> */}

            {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:40}}> */}
            <TextInput
              ref={(input) => { this.lastNameTextRef = input }}
              style={styles.textInput}
              placeholder='Last Name'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => this.setState({ lastNameText: text })}
              value={this.state.lastNameText}
              onSubmitEditing={() => { this.emailTextRef.focus() }}
              returnKeyType={'next'}
            >

            </TextInput>
            <TextInput
              ref={(input) => { this.emailTextRef = input }}
              style={styles.textInput}
              placeholder='Email'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => this.setState({ emailText: text })}
              value={this.state.emailText}
              keyboardType='email-address'
              onSubmitEditing={() => this.mobileNumberTextRef.focus()}
              returnKeyType={'next'}
            >
            </TextInput>

            <TextInput
              ref={(input) => this.mobileNumberTextRef = input}
              style={styles.textInput}
              placeholder='Mobile Number'
              autoFocus={false}
              autoCapitalize={'none'}
              keyboardType='phone-pad'
              autoCorrect={false}
              onChangeText={text => this.setState({ mobileNumberText: text })}
              value={this.state.mobileNumberText}
              onSubmitEditing={() => this.passwordTextRef.focus()}
              returnKeyType={'next'}
            >

            </TextInput>

            <TextInput
              ref={(input) => this.passwordTextRef = input}
              style={styles.textInput}
              placeholder='Password'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={text => this.setState({ passwordText: text })}
              value={this.state.passwordText}
              returnKeyType={'done'}
              onSubmitEditing={Keyboard.dismiss}
            >

            </TextInput>


            {/* </View> */}

            <View>
              <TouchableOpacity
                onPress={() => this.onSignUp()}
                style={styles.signupButton}>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.container3}>
              <View style={styles.accountView}>
                <Text style={styles.accountText}>Already a member? </Text>
                <TouchableOpacity
                  onPress={() => this.onSignIn()}
                >
                  <Text style={styles.signinText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        {/* </View> */}
        <Toast ref={(ref) => Toast.setRef(ref)} />

      </View>


    );
  }

}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1, 
    backgroundColor: 'white', 
  },
  container1:{ 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: windowHeight * 0.063, 
    
  },
  logo:{
    fontSize: 35, 
    color: '#08356D', 
    fontWeight: 'bold' 
  },
  container2:{
    flex: 1, 
    marginTop: windowHeight * 0.04, 
    marginHorizontal:windowWidth*0.053
  },
  createAccountText:{
   fontSize: 23, 
   fontWeight: '500', 
   paddingBottom: windowHeight * 0.032, 
   color: '#08356D', 
   height: 40
  },
  textInput:{
    alignItems: 'center',
    justifyContent: 'center', 
    height: windowHeight*0.05, 
    marginBottom: windowHeight * 0.03, 
    paddingLeft: windowWidth*0.04, 
    borderWidth: 0.5, 
    borderColor: 'gray',
  },
  signupButton:{
    height: windowHeight*0.055, 
    backgroundColor: '#08356D', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  signupText:{
   fontWeight: '500', 
   color: 'white', 
   fontSize: 18 
  },
  container3:{
    flex: 1, 
    alignItems: 'center', 
    marginBottom: windowHeight*0.05, 
    justifyContent: 'flex-end',
  },
  accountView:{
    flexDirection: 'row' 
  },
  accountText:{
    fontSize: 18, 
    color: 'gray' 
  },
  signinText:{
    color: "#08356D", 
    fontSize: 18
  }
})