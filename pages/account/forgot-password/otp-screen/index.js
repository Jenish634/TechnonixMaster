import React, { useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet, KeyboardAvoidingView,ScrollView,Platform } from 'react-native';
import _ from 'lodash';
import { TouchableOpacity,Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import nativeLoadingOverlaySpinner from '../../../../core_units/components/native-loading-overlay-spinner';
import { BackHandler } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

const LoginScreen = (props) => {


  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [design, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });






const [passwordHideShow, setPasswordHideShow] = useState(true)
const [mobile, setMobile] = useState(null)
const [password, setPassword] = useState(null)
const [otp, setOTP] = useState(null)



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
    props.otpVerify({
      body:{
       otp
      },
      callback: (reponse,data)=>{
        console.log('otpVerify', reponse,data);
if (reponse==false) {
  toastMessage(_.get(data,'msg'))
}else if(reponse==true){
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: _.get(data,'msg'),
    visibilityTime: TOAST_TIME,
  });
  setTimeout(() => {
    Actions.AccountNewPasswordScreen({resettoken:_.get(data,'resettoken')})
  }, 100);
}
        if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          props.nativeLoadingOverlaySpinner.close();
        }
      }
  });
  })
  

}

const validateForm =(callback)=>{

  if (!otp || otp==null || `${otp}`.length<3) {
    toastMessage('Please enter the OTP!')
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
    text1: 'Error',
    text2: `${text}`,
    visibilityTime: TOAST_TIME,
  });
 }

    const render=()=>{
        return (<View style={{ backgroundColor: '', flex: 1, }}>
<KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>

          <View style={{  alignItems: 'center', justifyContent: 'center', paddingTop: windowHeight * 0.08 }}>
           <Image style={{ height: 200, width:200}} source={require('../../../../assets/5.png')} />
            {/* <Text style={{ fontSize: 35, color: '#08356D', fontWeight: 'bold' }}>
              Tx Finance
            </Text> */}
            {/* <Image></Image> */}
          </View>
  
  
          <View style={{ flex: 2, paddingHorizontal: windowWidth * 0.07, }}>
  
            <Text style={{ fontSize: 22, fontWeight: '500', paddingTop: windowHeight * 0.03, paddingBottom: windowHeight * 0.03, color: '#08356D' }}>
            OTP Verification

            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500', paddingTop: windowHeight * 0.001, paddingBottom: windowHeight * 0.03, color: '#08356D' }}>
            Enter the OTP you recevied to {_.get(props,'otpName')}

            </Text>
            <View style={{flexDirection:'row',marginBottom:33,justifyContent:'center'}}>



            <CodeField
        ref={ref}
        {...design}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={otp}
        onChangeText={setOTP}
        cellCount={4}
        rootStyle={{flex:1, alignItems:'center',justifyContent:'space-evenly'}}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
            {/* <OtpInputs
            style={{flexDirection:'row',justifyContent:'center'}}
            autofillFromClipboard={false}
          handleChange={(code) => setOTP(code)}
          numberOfInputs={4}
          inputContainerStyles={{backgroundColor:'white',borderColor:'#dddddd',borderWidth:1,marginLeft:5,marginRight:2,justifyContent:'center',width:50,height:50}}
          inputStyles={{textAlign:'center',fontSize:20}}
        /> */}
        </View>
  <View>
              <TouchableOpacity style={{ width: windowWidth * 0.77, height: 45,marginLeft:23, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center' }}
                onPress={()=>formSubmit()} disabled={_.get(props,'loading',false)}
              >
                <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>Verify & Proceed</Text>
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
       otpVerify: details =>
       dispatch(global.redux.action.account.otpVerify(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(LoginScreen));


const styles = StyleSheet.create({
  root: {flex: 1, padding: 20,},
  title: {fontSize: 30},
  codeFieldRoot: {},
  cell: {
    width: 55,
    height: 55,
    // marginRight:10,
    // lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: '#E9E9E9',
    textAlign: 'center',
    padding:12
    // justifyContent:'center'
  },
  focusCell: {
    borderColor: '#000',
  },
});