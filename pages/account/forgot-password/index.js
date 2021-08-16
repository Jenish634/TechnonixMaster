import React, { useEffect, useState } from 'react';
import { View, Text,Image,KeyboardAvoidingView,ScrollView,Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';
import _ from 'lodash';

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
const [mobile, setMobile] = useState('7010053680')
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const [otpOption, setOtpOption] = useState('phone')


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
    console.log({
      [otpOption]:otpOption=='phone'?`91${mobile}`:email,
      
     });
    props.nativeLoadingOverlaySpinner.show();
    props[otpOption=='phone'?'mobileForgotpassword':'emailForgotpassword']({
      body:{
       [otpOption]:otpOption=='phone'?`${mobile}`:email,
       
      },
      callback: (reponse,data)=>{
        console.log('mobileForgotpassword', reponse,data);
if (reponse==false && _.get(data,'data')) {
  toastMessage(_.get(data,'data'))
}else if (reponse==true && _.get(data,'data')) {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: _.get(data,'data'),
    visibilityTime: TOAST_TIME,
  });
  setTimeout(() => {
    Actions.AccountOTPScreen({otpOption,otpName:otpOption=='phone'?`${mobile}`:email})  
  }, 100);
  

}
        if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          props.nativeLoadingOverlaySpinner.close();
        }
      }
  });
  })
  // Actions.AccountOTPScreen()

}

const validateForm =(callback)=>{
if (otpOption =='email') {
  if (!email || email==null) {
    toastMessage('Please enter the Email!')
  }else{
    callback()
  }
}else{
  if (!mobile || mobile==null) {
    toastMessage('Please enter the mobile number!')
  }else{
    callback()
  }
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
    text1: 'Error',
    text2: `${text}`,
    visibilityTime: TOAST_TIME,
  });
 }

 
    const render=()=>{
        return (<View style={{ backgroundColor: 'white', flex: 1, }}>
          <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
<View style={{alignItems: 'center', justifyContent: 'center', paddingTop: windowHeight * 0.08 }}>
           <Image style={{ height: 200, width:200}} source={require('../../../assets/5.png')} />
          </View>
  
  
          <View style={{ flex: 2, paddingHorizontal: windowWidth * 0.11, }}>
  
            <Text style={{ fontSize: 22, fontWeight: '500', paddingTop: windowHeight * 0.03, paddingBottom: windowHeight * 0.03, color: '#08356D' }}>
              Select your OTP Option:
            </Text>
  <RadioButton.Group
          onValueChange={value1 => setOtpOption(value1)}
          value={otpOption}
        >
          <View style={{flexDirection:'row'}}>
            <RadioButton value="phone" />
            <Text style={{marginTop:7}}>Mobile</Text>
            
          </View>
          <View style={{flexDirection:'row'}}>
          <RadioButton value="email" />
            <Text style={{marginTop:7}}>Email</Text>
            
          </View>
        </RadioButton.Group>
           {otpOption=='phone'&& <TextInput
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
            </TextInput>}
            {otpOption=='email'&& <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              textContentType='emailAddress'
              keyboardType="email-address"
              placeholder='Email'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(e) => setEmail(e)}
              
            >
            </TextInput>}
            
            
            {/* </View> */}
  
            <View>
              <TouchableOpacity  style={{ width: windowWidth * 0.77, height: 45, backgroundColor: otpOption==''?'#dddddd': '#08356D', alignItems: 'center', justifyContent: 'center' }}
                onPress={()=>formSubmit()} disabled={_.get(props,'loading',false)|| otpOption==''}
              >
                <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>Send</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
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
       dispatch(global.redux.action.account.mobileLogin(details)),
       mobileForgotpassword: details =>
       dispatch(global.redux.action.account.mobileForgotpassword(details)),
       emailForgotpassword: details =>
       dispatch(global.redux.action.account.emailForgotpassword(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(LoginScreen));


