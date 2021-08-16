import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Picker,SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
const ProfileScreen = (props) => {
  const [profileDetails, setProfileDetails] = useState({});
  useEffect(() => {
    
    getprofile()
   
}, []);
  const getprofile =()=>{
    if (_.size(_.get(props,'userProfile.data',[]))>0) {
      let details = _.last(_.get(props,'userProfile.data'))
      setProfileDetails(details);
      
    }
    
  }
  const   onBack = () => {
    props.navigation.goBack()
  }
  return (


    <View style={{ flex: 1, backgroundColor: 'white' }}>

<ScrollView style={{ marginTop: 10, }}>
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
            Profile
          </Text>
        </View>

          <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            {console.log('profileDetails',profileDetails)}
            <Image style={{ height: 86, width: 86, resizeMode: 'contain' }}
              source={_.get(profileDetails,'photoUrl')!='no-photo.jpg'? {
                uri: _.get(profileDetails,'photoUrl')
              }:require('../../../assets/images/user-profile.jpeg')}></Image>
            <View style={{ flex: 1, marginLeft: 24 }}>
              <Text style={{ color: "#0a356d", fontSize: 24, fontWeight: '600' }}>{_.startCase(_.get(profileDetails,'firstname',''))+ ' '+ _.startCase(_.get(profileDetails,'lastname',''))}</Text>
              <View style={{ flex: 1, marginTop: 4, backgroundColor: "#0a356d", alignItems: 'center', justifyContent: 'center', marginTop: 5, marginBottom: 5, marginRight: 60 }}>
               <TouchableOpacity onPress={() => Actions.profile({ title: 'Profile'})}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>


          {/* Account design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>ACCOUNT</Text>

            {/* Cards design */}
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/card_icon.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Cards</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>

            {/* Analytics design */}
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/u_chart-line.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Analytics</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>

            {/* Security design */}
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/fi_lock.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Security</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>
            <View style={{ marginTop: 12, height: 1, backgroundColor: '#C4C4C4' }}></View>
          </View>


          {/* SUPPORT design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>SUPPORT</Text>

            {/* Cards design */}
            <TouchableOpacity onPress={()=>Actions.report({title:'Report'})}>
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/fi_flag.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Report a problem</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>
            </TouchableOpacity>

            {/* Analytics design */}
            <TouchableOpacity onPress={()=>Actions.helpCenter({title:'Help Centre'})}>
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/fi_help-circle.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Help Centre</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>
            </TouchableOpacity>
            {/* Security design */}
            <TouchableOpacity onPress={()=>Actions.faq({title:'FAQ'})}>
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/fi_info.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>FAQ</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>
            </TouchableOpacity>
            <View style={{ marginTop: 12, height: 1, backgroundColor: '#C4C4C4' }}></View>
            
          </View>

          {/* ABOUT design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>ABOUT</Text>

            {/* Cards design */}
            <TouchableOpacity onPress={()=>Actions.termsPrivacy({title:'Terms & Privacy'})}>
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row' }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/fi_file-text.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Terms & Privacy</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} />
              </View>
            </View>
            </TouchableOpacity>
            <View style={{ marginTop: 12, height: 1, backgroundColor: '#C4C4C4' }}></View>
          </View>

           {/* ACTIONS design */}
           <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>ACTIONS</Text>

            {/* Cards design */}
            <TouchableOpacity onPress={()=>global.utils.signout()} disabled={_.get(props,'loading',false)}>
            <View style={{ marginTop: 12, height: 25, flexDirection: 'row', marginBottom: 20 }}>
              <Image style={{ height: 12.5, width: 16.67, resizeMode: 'contain' }}
                source={require('../../../assets/images/fi_log-in.png')} />
              <Text style={{ marginLeft: 12, color: "#0a356d", fontSize: 12, fontWeight: '400' }}>Log Out</Text>
              <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row-reverse' }}>
                {/* <Image style={{ height: 16, width: 16, resizeMode: 'contain' }}
                  source={require('../../../assets/images/right_arrow.png')} /> */}
              </View>
            </View>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </View>

   
  );
};

const mapStateToProps = state => {
  return {
  loading:_.get(state,'app.account.mobileLoginLoadingInProgress',false),
  userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile`, {})
  }
}

const mapDispatchToProps = dispatch => ({
  
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ProfileScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  wrapper:{
    height: 42,
    marginLeft:30,
    width:responsiveWidth(85),
    marginTop:5,
     paddingVertical: 5,
     borderRadius:5,
     alignItems:'center',
     justifyContent:'space-evenly'
   
    },
  loaderSection:{
    flexDirection:'row'
    },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});