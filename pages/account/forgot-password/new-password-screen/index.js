import React, { useEffect, useState } from 'react';
import { View, Text,Image } from 'react-native';
import _ from 'lodash';
import { TouchableOpacity,Dimensions,KeyboardAvoidingView,ScrollView,Platform  } from 'react-native';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import nativeLoadingOverlaySpinner from '../../../../core_units/components/native-loading-overlay-spinner';
import { BackHandler } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

const LoginScreen = (props) => {
const [passwordHideShow, setPasswordHideShow] = useState(true)
const [mobile, setMobile] = useState(null)
const [password, setPassword] = useState(null)
const [confirmpassword, setConfirmPassword] = useState(null)


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
  if (password === confirmpassword) {
    
  
  validateForm(()=>{
    props.nativeLoadingOverlaySpinner.show();
    props.resetpassword({
      params:{resettoken:_.get(props,'resettoken')},
      body:{
        password:password
      },
      callback: (reponse,data)=>{
        console.log('resetpassword', reponse,data,password);
if (reponse==false) {
  // commonAlret(data)
}else if(reponse==true){
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: 'Your password reset successfully.',
    visibilityTime: TOAST_TIME,
  });
setTimeout(() => {
  Actions.AccountLoginScreen()
}, 100);
}
        if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          props.nativeLoadingOverlaySpinner.close();
        }
      }
  });
  })
}else{
  toastMessage('Your password and confirmation password do not match.')
}

}

const validateForm =(callback)=>{

  if (!password || password==null) {
    toastMessage('Please enter the password!')
  }else if(!confirmpassword || confirmpassword==null){
    toastMessage('Please enter the confirm password!')
  }else{
    callback()
  }
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

<KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ backgroundColor: 'white', }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: windowHeight * 0.08 }}>
           <Image style={{ height: 200, width:200}} source={require('../../../../assets/5.png')} />
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
              placeholder='Password'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={(e) => setPassword(e)}
              returnKeyType={'next'}
            >
  
            </TextInput>
            <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              
              placeholder='Confirm Password'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={(e) => setConfirmPassword(e)}
              returnKeyType={'next'}
            >
  
            </TextInput>
  
            <View>
              <TouchableOpacity style={{ width: windowWidth * 0.77, height: 45, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center' }}
                onPress={()=>formSubmit()} disabled={_.get(props,'loading',false)}
              >
                <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>Submit</Text>
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
       resetpassword: details =>
       dispatch(global.redux.action.account.resetpassword(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(LoginScreen));


