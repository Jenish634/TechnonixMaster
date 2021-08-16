import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { connect } from 'react-redux';
import _, { filter, isEmpty } from 'lodash';
import moment from 'moment';
import { RefreshControl } from "react-native";


import nativeLoadingOverlaySpinner from '../../core_units/components/native-loading-overlay-spinner';
import { FontAwesome } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

const ChatsList = (props) =>{
    useEffect(() => {
        if (_.get(props,'conversationParams')) {
            loadcontactsList(_.get(props,'conversationParams'));    
        }
        
        
    
}, []);

 //contacts list
 function loadcontactsList(body) {
    props.createConversation({
        body,
        callback: (response, data) => {
            if (response) {
                setcontactsList(_.get(data, 'data', []))
            }
        }
    }
    );
}


    const render =()=>{

        return <Text>Hi Chat</Text>
    }
    return render()
}
const mapStateToProps = (state) => {
    return {
        userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {})

    }
};
const mapDispatchToProps = dispatch => ({
    createConversation: details => dispatch(global.redux.action.chats.createConversation(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ChatsList));
