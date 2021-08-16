import React, { useEffect, useState } from 'react';
import { View, Text,Image,KeyboardAvoidingView,SafeAreaView, ScrollView,Dimensions,CheckBox,Modal,Platform } from 'react-native';
import _ from 'lodash';
import style from '../style';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import Toast from 'react-native-toast-message';
import { BackHandler } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import CountryPicker from 'react-native-country-picker-modal'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000
const RegisterScreen = (props) => {
const [passwordHideShow, setPasswordHideShow] = useState(true)
const [firstName, setFirstName] = useState(null)
const [lastName, setLastName] = useState(null)
const [mobile, setMobile] = useState(null)
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const [confirmpassword, setConfirmPassword] = useState(null)
const [isSelected, setSelection] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [countryModalVisible, setCountryModalVisible] = useState(false);
const [countryDetailsVisible, setCountryDetailsVisible] = useState({});
  const toggleSwitch = () => {
    setPasswordHideShow(!passwordHideShow)
  }

 
  const close=()=>{
    setModalVisible(false);
};

  const formSubmit =()=>{
      
    validateForm(()=>{
      if (password===confirmpassword) {
        
      

    props.nativeLoadingOverlaySpinner.show();
        props.register({
        body:{
            phone:mobile,
          password:password,
          firstname:firstName,
          lastname:lastName,
          email:email,
          policies:isSelected,
          code:`${_.get(countryDetailsVisible,'callingCode[0]')}${mobile}`

        },
        callback: (reponse,data)=>{
   if (reponse==false) {
    toastMessage(_.get(data,'error','Error'))
   }else if(reponse==true){
    Actions.AccountLoginScreen()
    global.utils.notification.nativeAlert({
        title: 'Success',
        message: 'You have successfully registered.',
        buttons:   [
            { text: 'OK' , onPress:()=>{
                Actions.AccountLoginScreen()
            } }
          ],
        options: { cancelable: false }
    });
   }
          if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
            props.nativeLoadingOverlaySpinner.close();
          }
        }
    });

  }else{
    toastMessage('Your password and confirmation password do not match.')
  }
    })
    
   
  
  }
  
  const validateForm =(callback)=>{
  
    if (firstName==null) {
      toastMessage('Please enter the first name!')
      }else if(lastName==null){
        toastMessage('Please enter the lastname!')
      }else if (mobile==null) {
        toastMessage('Please enter the mobile number!')
    }else if (countryDetailsVisible=={} || _.isEmpty(countryDetailsVisible)) {
      toastMessage('Please select the country code!')
  }else if (email==null) {
      toastMessage('Please enter the email!')
      }else if(password==null){
        toastMessage('Please enter the password!')
    }else if(confirmpassword==null){
      toastMessage('Please enter the confirm password!')
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
  
   const modalUI=()=>{
    return(

      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}>

      <View style={style.centeredView}>
          <View style={style.modalView}>


              <View style={style.FormGroup}>
                  <TouchableOpacity style={{
                      alignContent: 'flex-end',
                      textAlign: 'right',
                      alignItems: 'flex-end',
                      right: 0,
                      marginRight: 2

                  }} onPress={() => setModalVisible(false)
                  }>
                      <Icon style={{
                          alignContent: 'flex-end',
                          textAlign: 'right',
                          alignItems: 'flex-end',
                          fontSize: 25, color: "#000",
                          fontFamily: 'RobotoBold'
                      }} name='close' /></TouchableOpacity>
                  <Text style={{color:'#000000',width: '100%',
	fontSize: responsiveFontSize(2.5),}}>
                  Teams Policies:
</Text><Text style={style.FormLabel}>
Manage the team templates that your end users see by creating templates policies in the admin center. Within each template policy, you can designate which templates are shown or hidden. Assign different users to different template policies so that your users view only the subset of team templates specified.
</Text>
</View></View></View></Modal>
    );
};
   const toastMessage =(text)=>{
    Toast.show({
      type: 'error',
      text1: 'Tx Finance',
      text2: `${text}`,
      visibilityTime: TOAST_TIME,
    });
   }

   const onChangeCountryCode =(code)=>{
     console.log('code',code);
setCountryDetailsVisible(code)
setCountryModalVisible(false)
   }
    const render=()=>{
        return (
          <View style={{ flex: 1, backgroundColor: 'white'}}>

<KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: windowHeight * 0.063, }}>
            <Image style={{ height: 100, width:150}} source={require('../../../assets/5.png')} />
            {/* <Text style={{ fontSize: 35, color: '#08356D', fontWeight: 'bold' }}>
              Tx Finance
            </Text> */}
            {/* <Image></Image> */}
          </View>
  
  
          <View style={{ flex: 1, marginTop: windowHeight * 0.04, marginLeft: 20, marginRight: 20 }}>
          {modalUI()}
            <Text style={{ fontSize: 23, fontWeight: '500', paddingBottom: windowHeight * 0.032, color: '#08356D' }}>
              Create your Account
            </Text>
  
            {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:30,}}> */}
            <TextInput
              style={{
                height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              placeholder='First Name'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(e) => setFirstName(e)}
              returnKeyType={'next'}
              
  
            >
            </TextInput>
            {/* </View> */}
  
            {/* <View style={{borderColor:'gray',width:330,height:50,borderWidth:0.2,marginBottom:40}}> */}
            <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              placeholder='Last Name'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(e) => setLastName(e)}
              returnKeyType={'next'}
            >
  
            </TextInput>
            <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              placeholder='Email'
              autoFocus={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(e) => setEmail(e)}
              keyboardType='email-address'
              returnKeyType={'next'}
            >
            </TextInput>
           <TouchableOpacity onPress={()=>setCountryModalVisible(true)}>
           <View style={{
                alignItems: 'flex-start', justifyContent: 'flex-start', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',color:'gray'
              }}>
              <Text
              
              style={{marginTop:8,color: _.get(countryDetailsVisible,'name')?'black' :'gray'}}
            >
             {_.get(countryDetailsVisible,'name','Select Country Code')} {_.get(countryDetailsVisible,'callingCode[0]')&&`(+${_.get(countryDetailsVisible,'callingCode[0]')})`}
           </Text>
           </View>
           </TouchableOpacity>
          {countryModalVisible==true&& <CountryPicker
            onClose={()=>setCountryModalVisible(false)}
            withAlphaFilter={true}
            withCallingCode={true}
            withCountryNameButton={true}
            withCallingCodeButton={true}
            withFilter={true}
            withFlagButton={false}
            
            
            onSelect={(value)=>onChangeCountryCode(value)}
        visible={countryModalVisible}
      />}
      
            <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: windowHeight * 0.03, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              placeholder='Mobile Number'
              autoFocus={false}
              autoCapitalize={'none'}
              keyboardType='phone-pad'
              autoCorrect={false}
              onChangeText={(e) => setMobile(e)}
              returnKeyType={'next'}
            >
  
            </TextInput>
  
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
            <View style={{flexDirection: "row",
    marginBottom: 20,alignItems:'center'}}>
      <View>
      {Platform.OS === 'ios' ? 
      (
        <TouchableOpacity 
        onPress={()=>setSelection(!isSelected)}
        style={!isSelected ? {height:18,width:18,borderRadius:2, borderWidth:2,borderColor:'#13426F',} : {height:18,width:18,borderRadius:2, borderWidth:2,backgroundColor:'#13426F',borderColor:'#13426F',alignItems:'center',justifyContent:'center',padding:2}}>
          {isSelected && <Image source={require('../../../assets/images/tick.png')}
          style={{resizeMode:'contain',tintColor:'white',height:13,width:13}}
          />
            }
        </TouchableOpacity>
      )
       : 
       (<CheckBox
       value={isSelected}
       tintColors={{ true: '#08356D'}}
       onValueChange={setSelection}
       style={{ alignSelf: "center"}}
       
     />)
      }
       
      </View>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Text style={{ margin: 8,fontStyle:'italic',color:'grey'}}>Accept Policies</Text>
        </TouchableOpacity>
      </View>
  
            {/* </View> */}
  
            <View>
              <TouchableOpacity
                onPress={()=>formSubmit()} disabled={_.get(props,'loading',false)|| isSelected==false}
                style={{ height: 45, backgroundColor:isSelected? '#08356D':'grey', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
  
            <View style={{ flex: 1, alignItems: 'center', marginBottom: 40, justifyContent: 'flex-end',marginTop:20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, color: 'gray' }}>Already a member? </Text>
                <TouchableOpacity
                  disabled={_.get(props,'loading',false)} onPress={()=>Actions.AccountLoginScreen()}
                >
                  <Text style={{ color: "#08356D", fontSize: 18 }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
          <Toast ref={(ref) => Toast.setRef(ref)} /></View>);
    };

    return render();
};

const mapStateToProps = state => {
    return {
    loading:_.get(state,'app.account.mobileLoginLoadingInProgress',false)
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    register: details =>
         dispatch(global.redux.action.account.register(details))
  });
  export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(RegisterScreen));
