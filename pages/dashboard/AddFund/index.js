import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput,FlatList } from 'react-native';
import _ from 'lodash';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Title } from 'react-native-paper'

import { Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import RBSheet from 'react-native-raw-bottom-sheet'
import { BackHandler } from 'react-native';
import BottomSheetStyle from '../../group-chat/chat-screen/BottomSheet-style'
import AddFundStyle from '../../group-chat/chat-screen/AddFunds'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TOAST_TIME = 2000

const AddFund = (props) => {

    const refRBSheet = useRef();
    const refCardRBSheet = useRef();

    const dummyData = [
        {
            cardBrand:'MasterCard',
            cardBrandImage:require('../../../assets/images/mastercard.jpeg'),
            nameOnCard:'Chipo Masimba',
            cardNumber:'***** **** **** 0369',
            cardExpirationDate:'08/2023'
        },
        {
            cardBrand:'MasterCard',
            cardBrandImage:require('../../../assets/images/mastercard.jpeg'),
            nameOnCard:'Chipo Masimba',
            cardNumber:'***** **** **** 0732',
            cardExpirationDate:'04/2022'
        },
    ]

    useEffect(() => {
        // Anything in here is fired on component mount.
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, []);

    const handleBackPress = async () => {
        switch (Actions.currentScene) {
            case 'Dashboard':
                exitNotification();
            // default: Actions.pop(); break;
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

    const onBack = () => {
        props.navigation.goBack()
      }

    const render = () => {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20, paddingTop: 56 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>onBack()} style={{ borderRadius: 5, marginRight: 8, height: 20, width: 20, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center' }}>

                            <Image style={{ height: 15, width: 15, tintColor: 'white', resizeMode: 'contain' }}
                                source={require('../../../assets/images/back.png')}
                            ></Image>

                        </TouchableOpacity>
                        <Text style={{ color: '#08356D', fontWeight: '700', fontSize: 36 }}>Add Funds</Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontWeight: '500', fontSize: 16 }}>From</Text>
                        <TouchableOpacity
                            onPress={() => refCardRBSheet.current.open()}
                            style={{ paddingHorizontal: 15, borderColor: '#D1D1D1', height: 70, borderWidth: 1, borderRadius: 15, marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={require('../../../assets/images/mastercard.jpeg')}
                                    style={{ height: 45, width: 45, borderRadius: 10 }}
                                >

                                </Image>

                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 14 }}>Chipo Masimba</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.7 }}>**** **** **** 0369</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.8 }}>08/2023</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Image source={require('../../../assets/images/right_arrow3x.png')}
                                    style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                >

                                </Image>

                            </View>

                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>Amount</Text>
                            <TextInput
                                placeholder="$0.00"
                                style={{ paddingLeft: 10, borderColor: '#D1D1D1', height: 44, borderWidth: 1, borderRadius: 15, marginTop: 10, alignItems: 'center', }}></TextInput>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>To Account</Text>
                            <TouchableOpacity
                                onPress={() => refRBSheet.current.open()}
                                style={{ paddingHorizontal: 15, borderColor: '#D1D1D1', height: 44, borderWidth: 1, borderRadius: 15, marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: '400' }}>Make a Selection</Text>


                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Image source={require('../../../assets/images/right_arrow3x.png')}
                                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                    >

                                    </Image>

                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 66 }}>
                    <TouchableOpacity style={{ backgroundColor: '#08356D', height: 58, alignItems: 'center', justifyContent: 'center', width: windowWidth * 0.69, }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Next</Text>
                    </TouchableOpacity>
                </View>

                <Toast ref={(ref) => Toast.setRef(ref)} />

                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        container: {
                            height: hp('78'),
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            minHeight: 67.74 / 100 * Math.round(Dimensions.get('window').height)
                        },
                    }}
                >

                    {/* <TouchableOpacity onPress={() => refRBSheet.current.close()}
            style={BottomSheetStyle.closeBs}
            activeOpacity={0.75}
            // onPress={onClose}
            hitSlop={BottomSheetStyle.hitSlot}
          >

            <Image
              source={require('../../../assets/images/crosscopy.png')}
              style={BottomSheetStyle.crossIcon}
            /> */}

                    {/* </TouchableOpacity> */}

                    <Title style={BottomSheetStyle.header}>Accounts</Title>

                    <View style={{ flex: 1, marginHorizontal: 20, }}>

                        <TouchableOpacity style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Text style={{ fontSize: 18 }}>Personal</Text>
                            <Text style={{ fontSize: 18 }}>$0.00</Text>

                        </TouchableOpacity>
                        <View style={{ borderBottomWidth: 1, borderColor: '#D1D1D1', paddingTop: 15, marginBottom: 15 }}></View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Text style={{ fontSize: 18 }}>Shared</Text>
                            <Text style={{ fontSize: 18 }}>$350.54</Text>

                        </TouchableOpacity>
                    </View>
                </RBSheet>
                <RBSheet
                    ref={refCardRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        container: {
                            height: hp('78'),
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            minHeight: 67.74 / 100 * Math.round(Dimensions.get('window').height)
                        },
                    }}
                >

                    {/* <TouchableOpacity onPress={() => refRBSheet.current.close()}
            style={BottomSheetStyle.closeBs}
            activeOpacity={0.75}
            // onPress={onClose}
            hitSlop={BottomSheetStyle.hitSlot}
          >

            <Image
              source={require('../../../assets/images/crosscopy.png')}
              style={BottomSheetStyle.crossIcon}
            /> */}

                    {/* </TouchableOpacity> */}

                    <Title style={BottomSheetStyle.header}>Cards</Title>

                    <View style={{ flex: 1, marginHorizontal: 20,marginTop:30 }}>

                    <FlatList

              showsVerticalScrollIndicator={false}
              data={dummyData}
              keyExtractor={(item, index) => item + index}
              ItemSeparatorComponent= {()=>{
                  return(
                    <View style={{ borderBottomWidth: 1, borderColor: '#D1D1D1', paddingTop: 15, marginBottom: 15 }}></View>
                       
                  )

              }
            
              }
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center' }}>
                   <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={item.cardBrandImage}
                                    style={{ height: 45, width: 45, borderRadius: 10 }}
                                >

                                </Image>

                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 14 }}>{item.nameOnCard}</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.7 }}>{item.cardNumber}</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.8 }}>{item.cardExpirationDate}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                  </View>
                )
              }}
            />



                        {/* <TouchableOpacity style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={require('../../../assets/images/mastercard.jpeg')}
                                    style={{ height: 45, width: 45, borderRadius: 10 }}
                                >

                                </Image>

                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 14 }}>Chipo Masimba</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.7 }}>**** **** **** 0369</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.8 }}>08/2023</Text>
                                </View>
                            </View>

                        </TouchableOpacity> */}
                        {/* <View style={{ borderBottomWidth: 1, borderColor: '#D1D1D1', paddingTop: 15, marginBottom: 15 }}></View> */}
                        {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={require('../../../assets/images/mastercard.jpeg')}
                                    style={{ height: 45, width: 45, borderRadius: 10 }}
                                >

                                </Image>

                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 14 }}>Chipo Masimba</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.7 }}>**** **** **** 0369</Text>
                                    <Text style={{ fontSize: 11, opacity: 0.8 }}>08/2023</Text>
                                </View>
                            </View>


                        </TouchableOpacity> */}
                    </View>
                </RBSheet>

            </View>);
    };

    return render();
};
const mapStateToProps = state => {
    return {
        loading: _.get(state, 'app.account.mobileLoginLoadingInProgress', false)
    }
}

const mapDispatchToProps = dispatch => ({
    mobileLogin: details =>
        dispatch(global.redux.action.account.mobileLogin(details)),
    otpVerify: details =>
        dispatch(global.redux.action.account.otpVerify(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(AddFund));

