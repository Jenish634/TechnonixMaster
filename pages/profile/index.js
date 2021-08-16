import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions, Platform

} from 'react-native';
import _ from 'lodash';
import { Button } from "react-native-elements";
import style from '../account/style';
import { Feather } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as ImagePicker from "expo-image-picker";
import nativeLoadingOverlaySpinner from '../../core_units/components/native-loading-overlay-spinner';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { BackHandler } from 'react-native';
// import {Picker} from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome, Ionicons } from "@expo/vector-icons";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

const ProfileScreen = (props) => {
  const [photourl, setPhotoURL] = useState(null)
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState('');
  const [language, setLanguage] = useState('');
  const [city, setCity] = useState("");
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('male');
  const [bio, setBio] = useState('');
  const [policies, setPolicies] = useState('');
  const [taxState, setTaxState] = useState('');
  const [taxStateArray, setTaxStateArray] = useState([]);
  const [profileDetails, setProfileDetails] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState();



  const toggleSwitch = () => {
    setPasswordHideShow(!passwordHideShow)
  }
  useEffect(() => {

    getprofile()
    cameraPermission()
    cameraGalleryPermission()
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);
  const getprofile = () => {
    if (_.size(_.get(props, 'userProfile.data', [])) > 0) {
      let details = _.last(_.get(props, 'userProfile.data'))

      setProfileDetails(details);
      getPreviousDatas(details)
    } else {

    }

  }



  useEffect(() => {

    // Anything in here is fired on component mount.
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);

  const handleBackPress = async () => {
    const user_profile_details = _.get(props, 'userProfile.data', []);
    switch (Actions.currentScene) {
      case 'profile':

        _.size(user_profile_details) > 0 ? Actions.pop() : exitNotification();
        break;

    }

    return true;
  }
  const exitNotification = () => {
    global.utils.notification.nativeAlert({
      title: 'Quit',
      message: 'Do you really want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: () => BackHandler.exitApp() }
      ],
      options: { cancelable: false }
    });
  };

  const cameraPermission = () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }
  const cameraGalleryPermission = () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }
  const formSubmit = () => {

    validateForm(() => {

      props.nativeLoadingOverlaySpinner.show();
      let profile_data = {
        mobile: phone,
        firstname: firstName,
        lastname: lastName,
        email: email,
        location: address,
        language: language,
        gender: gender,
        description: bio,
        country: country,
        city: city,
        birthday: dob,
        streetaddress: address,
        policies: policies,
        photoUrl: photourl
      }
      if (_.get(profileDetails, '_id')) {
        profile_data.id = _.get(profileDetails, '_id')
      }
      props.profileUpdate({
        body: profile_data,
        callback: (reponse, data) => {
          if (reponse == false) {
            toastMessage(_.get(data, 'error', 'Error'))
            if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
              props.nativeLoadingOverlaySpinner.close();
            }
          } else if (reponse == true) {
            Actions.Dashboard({});
            props.profile({
              callback: (reponse, data) => {

              }
            })
            // imageUpload(_.get(data,'data._id'))
            // global.utils.notification.nativeAlert({
            //     title: 'Success',
            //     message: 'Profile updated successfully.',
            //     buttons:   [
            //         { text: 'OK' , onPress:()=>{
            //             Actions.AccountLoginScreen()
            //         } }
            //       ],
            //     options: { cancelable: false }
            // });
          }
          // if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          //   props.nativeLoadingOverlaySpinner.close();
          // }
        }
      });
    })


  }

  //image Upload
  const imageUpload = (id) => {
    if (!_.isEmpty(image) && image !== null && _.get(profileDetails, 'photo') !== image) {
      var photo = {
        uri: image,
        type: 'image/jpg',
        name: 'photo.jpg',
      };
      var form = new FormData();
      form.append("image", photo)

      var settings = {
        "url": "https://api.imgbb.com/1/upload?key=199d9aa70b1242fbd11e336d07006597",
        "method": "post",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      props.nativeLoadingOverlaySpinner.show();
      axios(settings).then((response) => {
        console.log('response response', _.get(response, 'data.data.display_url'));
        props.updatePhoto({
          body: { photoUrl: _.get(response, 'data.data.display_url') },
          params: { id },
          callback: (response, data) => {
            console.log('response, data', response, data);
            if (response) {
              Actions.Dashboard({});
              props.profile({
                callback: (reponse, data) => {

                }
              })
            }

            if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
              props.nativeLoadingOverlaySpinner.close();
            }
          }
        });

      }).catch((error) => {
        if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
          props.nativeLoadingOverlaySpinner.close();
        }
        console.log('error error', error);
      })



    } else {
      if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
        props.nativeLoadingOverlaySpinner.close();
      }
      Actions.Dashboard({});
      props.profile({
        callback: (reponse, data) => {

        }
      })
    }
  }

  const validateForm = (callback) => {

    if (firstName == '') {
      commonAlret('Please enter the first name!')
    } else if (lastName == '') {
      commonAlret('Please enter the lastname!')
    } else if (email == null || email == '') {
      commonAlret('Please enter the email!')
    } else if (dob == null) {
      commonAlret('Please enter the password!')
    } else if (gender == '') {
      commonAlret('Please enter the gender!')
    } else if (address == '') {
      commonAlret('Please enter the address!')
    } else if (language == null || language == '') {
      commonAlret('Please enter the language!')
    } else if (city == null || city == '') {
      commonAlret('Please enter the city!')
    } else if (country == null || country == '') {
      commonAlret('Please enter the country!')
    } else if (bio == null || bio == '') {
      commonAlret('Please enter the bio!')
    } else if (phone == '') {
      commonAlret('Please enter the mobile number!')
    }
    // else if(policies==''){
    //   toastMessage('Please insert your policies!')
    // }
    // else if(image==null){
    //   commonAlret('Please insert your image!')
    // }
    else {
      callback()
    }
  }
  const commonAlret = (message) => {
    global.utils.notification.nativeAlert({
      title: 'Error',
      message: message,
      buttons: [
        { text: 'OK' }
      ],
      options: { cancelable: false }
    });
  }

  const toastMessage = (text) => {

    Toast.show({
      type: 'error',
      text1: 'Tx Finance',
      text2: `${text}`,
      visibilityTime: TOAST_TIME,
    });
  }



  /**Image function */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      var photo = {
        uri: result.uri,
        type: 'image/jpg',
        name: 'photo.jpg',
      };
      var form = new FormData();
      form.append("image", photo)
      if (_.get(result, 'uri')) {


        var settings = {
          "url": "https://api.imgbb.com/1/upload?key=199d9aa70b1242fbd11e336d07006597",
          "method": "post",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };
        props.nativeLoadingOverlaySpinner.show();
        axios(settings).then((response) => {
          setPhotoURL(_.get(response, 'data.data.display_url'))
          if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
            props.nativeLoadingOverlaySpinner.close();
          }
        }).catch((error) => {
          if (_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()) {
            props.nativeLoadingOverlaySpinner.close();
          }

        })
      }
    }
  }

  const dateSelectList = () => {
    if (_.isEmpty(dob) && !_.isEmpty(_.get(profileDetails, 'birthday')) && !_.isEqual(_.get(profileDetails, 'birthday'), null)) {
      return <View style={{ backgroundColor: 'white', alignItems: 'flex-start', justifyContent: 'flex-start', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray', }} ><Text style={{ marginTop: 10 }}>{moment(_.get(profileDetails, 'birthday')).format("DD.MM.YYYY") ? moment(_.get(profileDetails, 'birthday')).format("DD.MM.YYYY") : '-'}</Text></View>
    } else if (!_.isEmpty(dob) && !_.isEqual(dob, null)) {
      return <View style={{ backgroundColor: 'white', alignItems: 'flex-start', justifyContent: 'flex-start', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray', }} ><Text style={{ marginTop: 10 }}>{dob}</Text></View>
    } else {
      return <View style={{ backgroundColor: 'white', alignItems: 'flex-start', justifyContent: 'flex-start', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray', }} ><Text style={{ marginTop: 10 }}>Select Date</Text></View>
    }
  }
  /**Getting Profile Previous Data */
  const getPreviousDatas = (profile) => {
    console.log('profile',profile);
    console.log(profile);
    setCity(_.get(profile, 'city'))
    setCountry(_.get(profile, 'country'))
    setFirstName(_.get(profile, 'firstname'))
    setLastName(_.get(profile, 'lastname'))
    setDob(moment(_.get(profile, 'birthday'), 'DD.MM.YYYY').format("DD.MM.YYYY"))
    setGender(_.get(profile, 'gender'))
    setBio(_.get(profile, 'description'))
    setEmail(_.get(profile, 'email'))
    setLanguage(_.get(profile, 'language'))
    setPolicies(_.get(profile, 'policies'))
    setAddress(_.get(profile, 'location'))
    setPhone(_.get(profile, 'mobile'))
    if (_.get(profile, 'photoUrl') != 'no-photo.jpg') {
      setImage(_.get(profile, 'photoUrl'))
    }



  }
  const handleConfirm = (date, type) => {
    let setdate = moment(date).format('DD.MM.YYYY')
    setDob(setdate)
    // setDob(moment(date).format("DD.MM.YYYY"))
    hideDatePicker();
  };

  /**Date picker functions */
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  /**Photo function */
  function imageFunction() {
    return (
      <View >
        <View style={style.ImageUploadContainer}>
          {!_.isEmpty(image) ? (
            <TouchableOpacity onPress={() => pickImage()}>
              <Image
                style={style.FormGuestImage}
                source={{ uri: image }}
              /></TouchableOpacity>
          ) : (<TouchableOpacity onPress={() => pickImage()}>
            <Image
              style={style.FormGuestImage}
              source={require('../../assets/images/user-profile.jpeg')}
            /></TouchableOpacity>
          )}
        </View>
      </View>
    )
  }


  const   onBack = () => {
    props.navigation.goBack()
  }
  const render = () => {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, minHeight: Math.round(Dimensions.get('screen').height) - (Math.round(Dimensions.get('screen').height) - Math.round(Dimensions.get('window').height)) - 200 }}>
        <View style={{ flexDirection: 'row', marginTop: hp('5%'), marginLeft: wp('5%') }}>
          <TouchableOpacity
            onPress={() => { onBack() }}
          >
            <View style={{
              height: 30,
              width: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5
            }}>
              <Ionicons style={{ marginTop: 0 }} name="arrow-back" size={28} color={"black"} />
            </View>
          </TouchableOpacity>
          <Text style={{ colro: '#0a356d', marginLeft: 10, fontSize: 24, fontWeight: '600' }}>
            Edit Profile
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <View style={{ flex: 1 }}>

              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 70, }}>

                <TouchableOpacity
                  onPress={() => pickImage()}
                  style={{ alignItems: 'center' }}
                >
                  <Image
                    style={style.FormGuestImage}
                    // source={require('../../assets/images/user-profile.jpeg')}
                    // // source={image !== null || image !== undefined ? { uri: image } : require('../../assets/images/user-profile.jpeg')}
                    source={!_.isEmpty(image) ? { uri: image } : require('../../assets/images/user-profile.jpeg')}
                  />
                  {/* {imageFunction()} */}
                  <View style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: '#D8D8D8', alignItems: 'center', justifyContent: 'center', bottom: 20 }}>
                    <Image source={require('../../assets/images/camera.png')}
                      style={{
                        height: windowHeight * 0.024,
                        width: windowWidth * 0.053
                      }}></Image>
                  </View>
                </TouchableOpacity>
              </View>


              <View style={{ marginLeft: 20, marginRight: 20, paddingTop: 30 }}>


                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Firstname'
                  defaultValue={_.capitalize(_.get(profileDetails, 'firstname'))}
                  onChangeText={(e) => setFirstName(e)}

                >
                </TextInput>



                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Lastname'
                  onChangeText={(e) => setLastName(e)}
                  defaultValue={_.capitalize(_.get(profileDetails, 'lastname'))}
                >

                </TextInput>
                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Language'
                  defaultValue={_.capitalize(_.get(profileDetails, 'language'))}
                  onChangeText={(e) => setLanguage(e)}
                >
                </TextInput>

                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Mobile Number'
                  defaultValue={_.capitalize(_.get(profileDetails, 'mobile'))}
                  onChangeText={(e) => setPhone(e)}
                >

                </TextInput>

                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Email'
                  onChangeText={(e) => setEmail(e)}
                  defaultValue={_.capitalize(_.get(profileDetails, 'email'))}
                >

                </TextInput>


                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Area/Locality'
                  defaultValue={_.capitalize(_.get(profileDetails, 'location'))}
                  onChangeText={(e) => setAddress(e)}
                >
                </TextInput>

                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='City'
                  onChangeText={(e) => setCity(e)}
                  defaultValue={_.capitalize(_.get(profileDetails, 'city'))}
                >

                </TextInput>

                <TextInput
                  style={{
                    alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  }}
                  placeholder='Country'
                  onChangeText={(e) => setCountry(e)}
                  defaultValue={_.capitalize(_.get(profileDetails, 'country'))}
                >

                </TextInput>


                <TouchableOpacity onPress={showDatePicker}
                  style={{
                    height: 40, marginBottom: 20,
                  }}
                >
                  {dateSelectList()}
                </TouchableOpacity>
                <DateTimePickerModal
                  // style={{
                  //   alignItems: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
                  // }}
                  // date = {moment(dob).toDate()}
                  maximumDate={new Date()}
                  placeholder='Date of Birth'
                  headerTextIOS={'Date of Birth'}
                  isVisible={isDatePickerVisible}
                  value={dob}
                  mode={"date"}
                  onConfirm={(e) => handleConfirm(e, 'date')}
                  onCancel={() => hideDatePicker('date')}

                />
                <View
                  style={{
                    alignItems: 'center', justifyContent: 'center',
                    height: 40, marginBottom: 20, borderWidth: 0.5, paddingLeft: 10, borderColor: 'gray',
                  }}
                >
                  <RNPickerSelect

                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                    value={gender}
                    fixAndroidTouchableBug={true}
                    placeholder={{
                      label: 'Gender',

                      value: null,
                      color: '#686868',
                    }}
                    items={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                      { label: 'Others', value: 'others' },
                      { label: 'Prefer not to say', value: 'prefer_not_to_say' },
                    ]}
                  />
                  {/* <Picker
                    selectedValue={gender}
                    style={{   
                      height: 40, marginBottom: 20, borderWidth: 0.5, paddingLeft: 10, borderColor: 'gray',
                   }}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                  // defaultValue = {_.capitalize(_.get(profileDetails, 'gender'))}
                  >
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Others" value="others" />
                    <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
                  </Picker> */}
                </View>

                <TextInput
                  style={Platform.OS === "ios" ? {
                    height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray', paddingTop: 10
                  } : {
                    height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray'
                  }}
                  placeholder='Description'

                  multiline={true}
                  defaultValue={_.capitalize(_.get(profileDetails, 'description'))}
                  onChangeText={(e) => setBio(e)}


                >
                </TextInput>

                {/* <TextInput
              style={{
                alignItems: 'center', justifyContent: 'center', height: 40, marginBottom: 20, paddingLeft: 15, borderWidth: 0.5, borderColor: 'gray',
              }}
              placeholder='Policies'
              multiline={true}
              defaultValue={_.capitalize(_.get(profileDetails, 'policies'))}
              onChangeText={(e) => setPolicies(e)}
            >
  
            </TextInput> */}




                <View>
                  <TouchableOpacity
                    onPress={() => formSubmit()} disabled={_.get(props, 'loading', false)}
                    style={{ marginBottom: 40, width: responsiveWidth(90), height: 45, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Save</Text>
                  </TouchableOpacity>
                </View>

              </View>

              <Toast ref={(ref) => Toast.setRef(ref)} />

            </View>
          </ScrollView>
        </KeyboardAvoidingView >
      </View>
    );
  };

  return render();
};

const mapStateToProps = state => {
  return {
    loading: _.get(state, 'app.account.mobileLoginLoadingInProgress', false),
    userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile`, {})
  }
}

const mapDispatchToProps = dispatch => ({
  profileUpdate: details =>
    dispatch(global.redux.action.account.postProfile(details)),
  profile: details =>
    dispatch(global.redux.action.account.profile(details)),
  updatePhoto: details =>
    dispatch(global.redux.action.account.updatePhoto(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ProfileScreen));
