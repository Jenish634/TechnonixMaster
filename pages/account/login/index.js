import React, { useEffect, useState } from 'react';
import { View, Text,Image } from 'react-native';
import _ from 'lodash';
import style from '../style';
import { TouchableOpacity,Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import { BackHandler } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

const LoginScreen = (props) => {
const [passwordHideShow, setPasswordHideShow] = useState(true)
const [mobile, setMobile] = useState(null)
const [password, setPassword] = useState(null)



  const toggleSwitch = () => {
    setPasswordHideShow(!passwordHideShow)
  }

  useEffect(() => {
    // Anything in here is fired on component mount.
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>  BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);

  const handleBackPress = async() => {
    switch (Actions.currentScene) {
        case 'AccountLoginScreen':
            exitNotification();
        // default: Actions.pop(); break;
    }

    return true;
}
  const exitNotification=()=>{
    global.utils.notification.nativeAlert({
        title: 'Quit',
        message: 'Do you really want to exit the app?',
        buttons:   [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            { text: 'OK', onPress: () => BackHandler.exitApp() }
          ],
        options: { cancelable: false }
    });
};
  

const formSubmit =()=>{
  validateForm(()=>{
    props.nativeLoadingOverlaySpinner.show();
    props.mobileLogin({
      body:{
        phone:mobile,
        password:password
      },
      callback: (reponse,data)=>{
        console.log('checjreponse,data',password);
if (reponse==false) {
  commonAlret(data)
}
        if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          props.nativeLoadingOverlaySpinner.close();
        }
      }
  });
  })
 

}

const validateForm =(callback)=>{

  if (mobile==null) {
    toastMessage('Please enter the mobile number!')
  }else if(password==null){
    toastMessage('Please enter the password!')
  }else{
    callback()
  }
}
 const commonAlret = (message)=>{
  global.utils.notification.nativeAlert({
    title: 'Error',
    message: message,
    buttons:   [
        { text: 'OK' }
      ],
    options: { cancelable: false }
});
 }
 
 const toastMessage =(text)=>{
  Toast.show({
    type: 'error',
    text1: 'Tx Finance',
    text2: `${text}`,
    visibilityTime: TOAST_TIME,
  });
 }

    const render=()=>{
        return (<View style={{ backgroundColor: 'white', flex: 1, }}>


          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: windowHeight * 0.08 }}>
           <Image style={{ height: 200, width:200,marginTop:120}} source={require('../../../assets/5.png')} />
            {/* <Text style={{ fontSize: 35, color: '#08356D', fontWeight: 'bold' }}>
              Tx Finance
            </Text> */}
            {/* <Image></Image> */}
          </View>
  
  
          <View style={{ flex: 2, paddingHorizontal: windowWidth * 0.11, }}>
  
            <Text style={{ fontSize: 22, fontWeight: '500', paddingTop: windowHeight * 0.03, paddingBottom: windowHeight * 0.03, color: '#08356D' }}>
              {/* Login to your Account */}
            </Text>
  
            {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:30,}}> */}
            <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              keyboardType="phone-pad"
              placeholder='Mobile Number'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(e) => setMobile(e)}
              
            >
            </TextInput>
            {/* </View> */}
  
            {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:40}}> */}
            <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              placeholder='Password'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(e) => setPassword(e)}
              returnKeyType={'done'}
            >
  
            </TextInput>
            {/* </View> */}
  
            <View>
              <TouchableOpacity style={{ width: windowWidth * 0.77, height: 45, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center' }}
                onPress={()=>formSubmit()} disabled={_.get(props,'loading',false)}
              >
                <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'flex-end', paddingTop: windowHeight * 0.02 }}>
              <TouchableOpacity onPress={()=>Actions.AccountForgotScreen()}>
                <Text style={{ color: "#08356D", fontSize: 16 }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column-reverse', marginBottom: 40 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, color: 'gray' }}>Don't have an account? </Text>
              <TouchableOpacity
               disabled={_.get(props,'loading',false)} onPress={()=>Actions.AccountRegisterScreen()} 
              >
                <Text style={{ color: "#08356D", fontSize: 18 }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>);
    };

    return render();
};
const mapStateToProps = state => {
  return {
  loading:_.get(state,'app.account.mobileLoginLoadingInProgress',false)
  }
}

const mapDispatchToProps = dispatch => ({
  mobileLogin: details =>
       dispatch(global.redux.action.account.mobileLogin(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(LoginScreen));


