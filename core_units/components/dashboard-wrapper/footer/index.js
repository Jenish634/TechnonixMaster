import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import _ from "lodash";
import * as LocalAuthentication from "expo-local-authentication";

import style from "./style";
import { Actions } from "react-native-router-flux";
import { responsiveWidth } from "react-native-responsive-dimensions";

const Footer = (props) => {
  console.log("actions");
  const [focused, setfocused] = useState("");
  useEffect(() => {
    console.log(Actions.currentScene);
    setfocused(Actions.currentScene);
  }, []);
  const renderChatMenu = () => {
    if (
      !_.chain(props)
        .get("settings.chatKittyCurrentUserData", {})
        .isEmpty()
        .value()
    ) {
      return (
        <TouchableOpacity
          style={style.appTabContainerStyle}
          onPress={() =>
            global.utils.routes.navigateToAction({
              key: "chatChannelList",
              push_on_duplicate_key: false,
            })
          }
        >
          <Entypo name="chat" style={style.tabIcon} />
        </TouchableOpacity>
      );
    }
  };
  const commonAlret = (message) => {
    Alert.alert(
      "",
      `Coming Soon...`,
      [
        {
          text: "Okay",
        },
      ],
      { cancelable: true }
    );
  };
  const onPressFunction = (name) => {
    if (name == "Contacts") {
      Actions.currentScene != "Contacts" &&
        Actions.Contacts({ title: "Contacts" });
    } else if (name == "chatsList") {
      Actions.currentScene != "chatsList" &&
        Actions.chatsList({ title: "Messages" });
    } else if (name == "profileView") {
      Actions.currentScene != "profileView" &&
        Actions.profileView({ title: "Profile" });
    } else {
      global.utils.routes.navigateToAction({
        key: name,
        push_on_duplicate_key: false,
      });
    }
  };

  const render = () => {
    console.log("focused", focused);
    // if (focused == "Dashboard") {
    //   async function handleAuthentication() {
    //     await LocalAuthentication.authenticateAsync();
    //   }
    //   handleAuthentication();
    // }
    let user = _.head(_.get(props, "userProfile.data", []));
    console.log("fotter", Math.round(Dimensions.get("window").height));

    return (
      <View style={style.FooterToolbar}>
        {/* Navigate to discover tab */}
        <TouchableOpacity
          style={style.appTabContainerStyle}
          onPress={() => onPressFunction("Dashboard")}
        >
          <Entypo
            name="wallet"
            size={25}
            color={focused == "Dashboard" ? "#0a356d" : "#aeaeae"}
          />
          {/* <Image
              style={{ width: 23.33, height: 21 }}
              source={
                focused=='Dashboard'
                  ? require('../../../../assets/images/wallet.png')
                  : require('../../../../assets/images/wallet_gray.png')
              }
            /> */}
        </TouchableOpacity>
        {/* Navigate to schedule tab */}
        <TouchableOpacity
          style={style.appTabContainerStyle}
          onPress={() => onPressFunction("Contacts")}
        >
          <MaterialIcons
            name="contacts"
            size={25}
            color={focused == "Contacts" ? "#0a356d" : "#aeaeae"}
          />

          {/* <Image
              style={{ width: 23.33, height: 21 }}
              source={
                focused=='Contacts'
                  ? require('../../../../assets/images/group.png')
                  : require('../../../../assets/images/2Friends.png')
              }
            /> */}
        </TouchableOpacity>
        {/* Navigate to subscriptions tab */}
        <TouchableOpacity
          style={style.appTabContainerStyle}
          onPress={() => commonAlret()}
        >
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: "#08356D",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              bottom: 39,
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 5,
                backgroundColor: "transparent",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 23.33, height: 21 }}
                source={
                  focused
                    ? require("../../../../assets/images/Plus-icon.png")
                    : require("../../../../assets/images/Plus-icon.png")
                }
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* Navigate to profile tab */}
        <TouchableOpacity
          style={style.appTabContainerStyle}
          onPress={() => onPressFunction("chatsList")}
        >
          <Entypo
            name="message"
            size={25}
            color={focused == "chatsList" ? "#0a356d" : "#aeaeae"}
          />
          {/* <Image
              style={{ width: 23.33, height: 21 }}
              source={
                focused=='chatsList'
                  ? require('../../../../assets/images/Message-blue.png')
                  : require('../../../../assets/images/message.png')
              }
            /> */}
        </TouchableOpacity>
        {/* Navigate to chat tab */}
        <TouchableOpacity
          style={style.appTabContainerStyle}
          onPress={() => onPressFunction("profileView")}
        >
          {console.log("user", user)}
          {/* onPress={() =>Actions.currentScene !='profileView' && Actions.profileView({ title: 'Profile'})}> */}
          {_.get(user, "_id") && _.get(user, "photoUrl") != "no-photo.jpg" ? (
            <Image
              style={{ width: 30.33, height: 30, borderRadius: 30 }}
              source={{ uri: _.get(user, "photoUrl") }}
            />
          ) : (
            <FontAwesome5
              name="user-alt"
              size={21}
              color={focused == "profileView" ? "#0a356d" : "#aeaeae"}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return render();
};

const mapStateToProps = (state) => ({
  settings: _.get(state, `app.${global.redux.actionTypes.settings.name}`, {}),
  userProfile: _.get(
    state,
    `app.${global.redux.actionTypes.account.name}.profile`,
    {}
  ),
});

export default connect(mapStateToProps)(Footer);
