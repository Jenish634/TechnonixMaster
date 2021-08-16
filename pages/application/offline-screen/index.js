import React from 'react';
import { View, Text, Image } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import style from './style';

const OfflineScreen =()=>{
    const render=()=>{
        return (
            <View style={[style.OrderRequeatPageContainer, {paddingBottom:responsiveWidth(1), alignItems: 'center', justifyContent: 'center'}]}>

                <Image style={style.SplashScreenLogoText} tintColor='#fff' source={require('../../../assets/images/logo.png')} />

                <View style={style.TermsServiceFeedBackBox}>
                    <Text style={[style.TermsAcceptTitleText,{fontFamily:'MontserratRegular',}]}>You are currently offline. Please turn on your network to continue...!</Text>
                </View>
                
            </View>
        );
    };
    return render();
};
export default OfflineScreen;