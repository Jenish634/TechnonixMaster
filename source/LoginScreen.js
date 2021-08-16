import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, TouchableHighlight, TextInput, Image, Platform, Dimensions, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

export default class LoginScreen extends Component {

expo
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;

    this.state = {
      phoneText: '',
      passwordText: '',
    };
  }

  componentDidMount() {

  }

  /* User Defined Methods */
  validateFields = () => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (this.state.phoneText.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Tx Finance',
        text2: 'Please enter mobile number.',
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

  /* Button Action  */
  onSignUp = () => {
    console.log('sign up called')
    this.props.navigation.navigate('SignUpScreen')
  }

  onSignIn = () => {
    if (this.validateFields()) {
      this.storeData('KMobileNumber', this.state.phoneText)
      this.storeData('KPassword', this.state.passwordText)
      this.props.navigation.navigate('ProfileScreen')
    }
  }

  render() {

    return (
      <View style={styles.baseContainer}>


        <View style={styles.container1}>
          <Text style={styles.logo}>
            Tx Finance
          </Text>
          {/* <Image></Image> */}
        </View>


        <View style={styles.container2}>

          <Text style={styles.loginText}>
            Login to your Account
          </Text>

          {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:30,}}> */}
          <TextInput
            ref={x => (this.phoneRef = x)}
            style={styles.textInput}
            keyboardType="phone-pad"
            placeholder='Mobile Number'
            autoFocus={false}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={text => this.setState({ phoneText: text })}
            value={this.state.phoneText}
            onBlur={this.onBlur}
          >
          </TextInput>
          {/* </View> */}

          {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:40}}> */}
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            autoFocus={false}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => this.setState({ passwordText: text })}
            value={this.state.passwordText}
            onBlur={this.onBlur}
            returnKeyType={'done'}
          >

          </TextInput>
          {/* </View> */}

          <View>
            <TouchableOpacity style={styles.signinButton}
              onPress={() => this.onSignIn()}
            >
              <Text style={styles.signinText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgotView}>
            <TouchableOpacity >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container3}>
          <View style={styles.accountView}>
            <Text style={styles.accountText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => this.onSignUp()}
            >
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white', 
    flex: 1
  },
  container1:{ 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: windowHeight * 0.08 
  },
  logo:{
    fontSize: 35, 
    color: '#08356D', 
    fontWeight: 'bold' 
  },
  container2:{
    flex: 2, 
    paddingHorizontal: windowWidth * 0.11, 
  },
  loginText:{
    fontSize: 22, 
    fontWeight: '500', 
    paddingTop: windowHeight * 0.03, 
    paddingBottom: windowHeight * 0.03, 
    color: '#08356D'
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
  signinButton:{
    //  width: windowWidth * 0.77, 
     height: windowHeight*0.055, 
     backgroundColor: '#08356D', 
     alignItems: 'center', 
     justifyContent: 'center' 
  },
  signinText:{
   fontWeight: '500', 
   color: 'white', 
   fontSize: 18 
  },
  forgotView:{
    alignItems: 'flex-end', 
    paddingTop: windowHeight * 0.02 
  },
  forgotText:{ 
    color: "#08356D", 
    fontSize: 16 
  },
  container3:{
    flex: 1, 
    alignItems: 'center', 
    flexDirection: 'column-reverse', 
    marginBottom: windowHeight*0.05
  },
  accountView:{
    flexDirection: 'row' 
  },
  accountText:{
    fontSize: 18, 
    color: 'gray'
  },
  signupText:{
    color: "#08356D", 
    fontSize: 18
  }
})