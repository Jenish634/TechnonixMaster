import React from 'react';
import _ from 'lodash';
import { View, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import { FontAwesome,Ionicons } from "@expo/vector-icons";
import style from './style';
import { Actions } from 'react-native-router-flux';

// Header left
const Left=(props)=>{
    let details = _.size(_.get(props,'userProfile.data',[]))>0?true:false
    return (  
        <TouchableOpacity onPress={() =>details==true && global.utils.routes.navigateToAction({ key: 'Dashboard'})}>
            
            <View style={{ alignItems: 'center'}}>
               <Image style={style.HeaderLeftLogo} source={require('../../../../assets/new-logo.jpeg')} />
            </View>
        </TouchableOpacity>    
    );
};
// Header right
const Right=(props)=>{
    const profile_image_url = () =>{
        let details = _.last(_.get(props,'userProfile.data'))
        if(_.get(details,'photoUrl') !== 'no-photo.jpg'){
            image_url = {uri: _.get(details,'photoUrl')};
        }else{
            image_url = require('../../../../assets/images/user-profile.jpeg');
        }
        return image_url;
    };
    return (
        <TouchableOpacity onPress={() => Actions.profileView({ title: 'Profile'})}>
        <View style={{ alignItems: 'center',paddingRight: responsiveWidth(3),paddingTop: responsiveWidth(3)}}>
            <Image style={style.HeaderProfileImg} source={profile_image_url()} />
        </View>
        
        </TouchableOpacity>
    );
};

const Back=(props)=>{
    console.log('Actions.currentScene',Actions.currentScene);
    return (  
        <TouchableOpacity onPress={()=>Actions.currentScene =='chatsList'? Actions.Dashboard(): Actions.pop()}>
            
            <View style={{ alignItems: 'flex-start'}}>
            <Ionicons style={{marginLeft:responsiveWidth(3.5),marginTop:5}} name="arrow-back" size={28} color={(Actions.currentScene=='Contacts'|| Actions.currentScene=='chatsList'||Actions.currentScene=='faq')?"white":'black'} />
            
            
            </View>
        </TouchableOpacity>    
    );
};


const RightNotification=(props)=>{
    return (
        <TouchableOpacity >
        <View style={{ alignItems: 'flex-end',paddingRight: responsiveWidth(3),marginRight: 10,paddingTop: responsiveWidth(3)}}>
                    <Image style={{ height: 25, width: 25, resizeMode: 'contain' }}
                        source={require('../../../../assets/images/bell_icon.png')}></Image>
                </View>
        
        
        </TouchableOpacity>
    );
};

export default {
    Left:connect(state=>({userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile`, {})}))(Left),
    Right: connect(state=>({userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile`, {})}))(Right),
    Back,
    RightNotification
};