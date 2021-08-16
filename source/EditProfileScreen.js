import React, { Component, Fragment, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Text, TouchableOpacity, View, ScrollView, TouchableHighlight, TextInput, Image, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000


export default class EditProfileScreen extends Component {


  profileImageUri = null

  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;

    this.state = {
      firstNameText: '',
      lastNameText: '',
      languageText: '',
      mobileNumberText: '',
      emailText: '',
      houseNoText: '',
      streetText: '',
      areaText: '',
      cityText: '',
      countryText: '',
      dobText: '',
      genderText: '',
      descriptionText: '',
      policiesText: ''
    }
  }

  componentDidMount() {

  }

  /* User Defined Methods */

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
    } else if (this.state.languageText.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter language.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    } else if (this.state.mobileNumberText.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter valid mobile number.',
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
    else if (this.state.houseNoText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter house number.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.streetText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter street.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.areaText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter area.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.cityText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter city.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.countryText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter country.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.dobText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter date of birth.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.genderText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter gender.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.descriptionText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter description.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.state.policiesText < 1) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter policies.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    else if (this.profileImageUri != null || this.profileImageUri != 'undefined' || this.profileImageUri !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please choose profile image.',
        visibilityTime: TOAST_TIME,
      });
      return false;
    }
    return true;
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
      this.profileImageUri = result.uri
      this.setState({ profileImageUri: result.uri })
    }
  };

  /* Button Action */
  onSave = () => {
    if (this.validateFields()) {
      this.props.navigation.navigate('ProfileScreen')
    }
  }

  onBack = () => {
    // console("profile")
    this.props.navigation.navigate('ProfileScreen')
  }

  setProfileImage() {
    if (this.profileImageUri != null && this.profileImageUri != 'undefined' && this.profileImageUri !== undefined) {
      return (
        <Image
          style={styles.profileImage}
          source={{ uri: this.profileImageUri }}
        />
      )
    } else {
      return (
        <Image
          style={styles.profileImage}
          source={require('../assets/group1.png')}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidView}
        >

          <ScrollView style={styles.scrollView}>

            <View style={styles.container1}>

              <TouchableOpacity
                style={styles.profileImageButton}
                onPress={() => this.pickImage()}
              >
                {this.setProfileImage()}
                <View style={styles.cameraView}>
                  <Image source={require('../assets/camera.png')}
                    style={styles.cameraIcon}></Image>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backButtonView}
              onPress={() => { this.onBack() }}
            >
              {/* <View > */}
                <Image source={require('../assets/back.png')}
                  style={styles.backIcon}></Image>
              {/* </View> */}
            </TouchableOpacity>

            <View style={styles.container2}>


              <TextInput
                ref={(input) => this.firstNameTextRef = input}
                style={styles.textInput}
                placeholder='Firstname'
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



              <TextInput
                ref={(input) => this.lastNameTextRef = input}
                style={styles.textInput}
                placeholder='Lastname'
                placeholder='Last Name'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ lastNameText: text })}
                value={this.state.lastNameText}
                onSubmitEditing={() => { this.languageTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>
              <TextInput
                ref={(input) => this.languageTextRef = input}
                style={styles.textInput}
                placeholder='Language'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ languageText: text })}
                value={this.state.languageText}
                onSubmitEditing={() => { this.mobileNumberTextRef.focus() }}
                returnKeyType={'next'}
              >
              </TextInput>

              <TextInput
                ref={(input) => this.mobileNumberTextRef = input}
                style={styles.textInput}
                placeholder='Mobile Number'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ mobileNumberText: text })}
                value={this.state.mobileNumberText}
                onSubmitEditing={() => { this.emailTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>

              <TextInput
                ref={(input) => this.emailTextRef = input}
                style={styles.textInput}
                placeholder='Email'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ emailText: text })}
                value={this.state.emailText}
                onSubmitEditing={() => { this.houseNoTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>


              <TextInput
                ref={(input) => this.houseNoTextRef = input}
                style={styles.textInput}
                placeholder='House No'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ houseNoText: text })}
                value={this.state.houseNoText}
                onSubmitEditing={() => { this.streetTextRef.focus() }}
                returnKeyType={'next'}
              >
              </TextInput>



              <TextInput
                ref={(input) => this.streetTextRef = input}
                style={styles.textInput}
                placeholder='Street/Road Name'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ streetText: text })}
                value={this.state.streetText}
                onSubmitEditing={() => { this.areaTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>
              <TextInput
                ref={(input) => this.areaTextRef = input}
                style={styles.textInput}
                placeholder='Area/Locality'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ areaText: text })}
                value={this.state.areaText}
                onSubmitEditing={() => { this.cityTextRef.focus() }}
                returnKeyType={'next'}
              >
              </TextInput>

              <TextInput
                ref={(input) => this.cityTextRef = input}

                style={styles.textInput}
                placeholder='City'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ cityText: text })}
                value={this.state.cityText}
                onSubmitEditing={() => { this.countryTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>

              <TextInput
                ref={(input) => this.countryTextRef = input}

                style={styles.textInput}
                placeholder='Country'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ countryText: text })}
                value={this.state.countryText}
                onSubmitEditing={() => { this.dobTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>

              <TextInput
                ref={(input) => this.dobTextRef = input}

                style={styles.textInput}
                placeholder='Date of Birth'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ dobText: text })}
                value={this.state.dobText}
                onSubmitEditing={() => { this.genderTextRef.focus() }}
                returnKeyType={'next'}

              >
              </TextInput>



              <TextInput
                ref={(input) => this.genderTextRef = input}

                style={styles.textInput}
                placeholder='Gender'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ genderText: text })}
                value={this.state.genderText}
                onSubmitEditing={() => { this.descriptionTextRef.focus() }}
                returnKeyType={'next'}
              >

              </TextInput>
              <TextInput
                ref={(input) => this.descriptionTextRef = input}

                style={styles.textInput}
                placeholder='Description'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ descriptionText: text })}
                value={this.state.descriptionText}
                onSubmitEditing={() => { this.policiesTextRef.focus() }}
                returnKeyType={'next'}
              >
              </TextInput>

              <TextInput
                ref={(input) => this.policiesTextRef = input}

                style={styles.textInput}
                placeholder='Policies'
                autoFocus={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={text => this.setState({ policiesText: text })}
                value={this.state.policiesText}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType={'done'}
              >
              </TextInput>

              <View>
                <TouchableOpacity
                  onPress={() => this.onSave()}
                  style={styles.savebuttonView}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>

            </View>

          </ScrollView >
        </KeyboardAvoidingView>
        <Toast ref={(ref) => Toast.setRef(ref)} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
     flex: 1 
  },
  keyboardAvoidView:{
    flex:1
  },
  scrollView:{ 
    flex: 1, 
    backgroundColor: 'white', 
  },
  container1:{
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: windowHeight*0.08, 
  },
  profileImage:{
    // height:windowHeight*0.172,
    // width:windowWidth*0.373,
    // resizeMode:'contain',
     height: 140, 
     width: 140, 
     
     borderRadius: 70 
  },
  profileImageButton:{
    alignItems: 'center' 
  },
  cameraView:{
     height: windowHeight*0.05, 
     width: windowWidth*0.1, 
     borderRadius: 20, 
     backgroundColor: '#D8D8D8', 
     alignItems: 'center', 
     justifyContent: 'center', 
     bottom: windowHeight*0.024
  },
  cameraIcon:{
     height: windowHeight*0.024,
     width: windowWidth*0.053
  },
  backButtonView:{
     position: 'absolute', 
     left: windowWidth*0.053,
     top: windowHeight*0.0739,
     height: windowHeight*0.05, 
     width: windowWidth*0.1, 
  },
  backIcon:{
     height: windowHeight*0.03, 
     width: windowWidth*0.06, 
     tintColor:'#08356D'
  },
  container2:{
    marginHorizontal:windowWidth*0.053,
    paddingTop: windowHeight*0.024
  },
  textInput:{
      alignItems: 'center', 
      justifyContent: 'center', 
      height: windowHeight*0.05,
       marginBottom: windowHeight*0.024,
       paddingLeft: windowWidth*0.04,
       borderWidth: 0.5, 
      borderColor: 'gray',
  },
  savebuttonView:{
     marginBottom: windowHeight*0.05,
    //  width: 330, 
     height: windowHeight*0.055,
     backgroundColor: '#08356D', 
     alignItems: 'center', 
     justifyContent: 'center' 
  },
  saveText:{
    color: 'white', 
    fontSize: 18, 
    fontWeight: '500' 
  },
})
