import React from 'react';
import { Text, View,TouchableOpacity,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import style from '../style';

const renderBackButton = () => (
    <TouchableOpacity
        onPress={() => Actions.pop()}
    >
        <View style={{ alignItems: 'center',paddingLeft: responsiveWidth(3)}}>
           <Text style={{color:'#000',fontFamily:'MontserratSemiBold', }}>
           	BACK
           </Text>
        </View>
    </TouchableOpacity>
);
const gettingStartedLeft = () => (
  <TouchableOpacity onPress={() => {/* Navigate to host dashboard */}}>
        <View style={{ alignItems: 'center',paddingLeft: responsiveWidth(3),paddingTop: responsiveWidth(3)}}>
           <Image style={style.HeaderLeftLogo} tintColor='#fff' source={require('../../../assets/images/logo.png')} />
        </View>
  </TouchableOpacity>      
);
const gettingStartedRight = () => (
        <View style={{ alignItems: 'center',paddingRight: responsiveWidth(3),paddingTop: responsiveWidth(3)}}>
           <Text style={style.gettingStartedRightText}>GETTING STARTED</Text>
        </View>
);
const ProfileHeaderRight = () => (
  
        <View style={{ alignItems: 'center',paddingRight: responsiveWidth(3),paddingTop: responsiveWidth(3)}}>
           <Image style={style.HeaderProfileImg} source={require('../../../assets/images/2.jpg')} />
        </View>
        
);
const renderNextButton = () => (
    <TouchableOpacity
        onPress={() => Actions.push()}
    >
        <View style={{ alignItems: 'center',paddingLeft: responsiveWidth(3)}}>
           <Text style={{color:'#000',fontFamily:'MontserratSemiBold', }}>
           	NEXT
           </Text>
        </View>
    </TouchableOpacity>
);

export default {
    renderBackButton,
    gettingStartedLeft,
    gettingStartedRight,
    ProfileHeaderRight,
    renderNextButton
};