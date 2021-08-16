import React, { useEffect,useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {NOTIFICATIONDATA} from './data';
import MessageStyle from './style';
import { connect } from 'react-redux';
import _, { filter, isEmpty } from 'lodash';
import { BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet'


const SampleComponent = (props) => {

    
    useEffect(() => {
        
        // Anything in here is fired on component mount.
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        return () =>  BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      }, []);
    
      const handleBackPress = async() => {
        const user_profile_details = _.get(props, 'userProfile.data', []);
        switch (Actions.currentScene) {
            case 'Dashboard':
                exitNotification();
                       break
                                    case 'profileView':
                        Actions.pop(); 
                        break
                        case 'contactsList':
                            Actions.pop(); 
                            break
                            case 'privateChat':
                                Actions.pop(); 
                                break
                                case 'chatsList':
                                    Actions.pop(); 
                                    break
                                    case 'Contacts':
                                        Actions.pop(); 
                                    break
                                    case 'AddParticipantScreen':
                                        Actions.pop(); 
                                    break
                                    case 'GroupCreationScreen':
                                        Actions.pop(); 
                                    break
                                    case 'groupChatScreen':
                                        Actions.chatsList({title:'Messages'})
                                    break
                                    case 'groupInfo':
                                        Actions.pop(); 
                                    break;
                                    case 'addMembergroup':
                                        Actions.pop(); 
                                    break;
                                    
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
    console.log('working or not');
    const   headerTitle =(details)=>{
        return _.startCase(_.get(details,'firstname'))+ ' '+ _.startCase(_.get(details,'lastname'))
      }
   const render=()=>{ return (
        <View style={[MessageStyle.container]}>
        <TouchableOpacity
         onPress={() => 
         global.utils.routes.navigateToAction({key: 'Dashboard', push_on_duplicate_key: false})} 
         style={{marginTop:18,marginLeft:8}}><Image style={{width:150,height:70,marginLeft:1,marginTop:8}} 
         source={require('../../assets/3.png')} />
        </TouchableOpacity>
            <View style={MessageStyle.messageView}>
                <Text numberOfLines={3} style={MessageStyle.messageText}>Hi, {headerTitle(_.get(props,'userProfile'))}</Text>
                <View style={MessageStyle.imageView}>
                    <MaterialIcons name="notifications-active" size={35} color="skyblue" />
                </View>
            </View>

            <Card style={{ width: '93%', alignSelf: 'center', marginTop: 30, height: '21%', backgroundColor: '#a6f1a6',justifyContent:'center' }}>
                <Card.Content>
                    <View style={{}}>
                        <Paragraph style={{ fontSize: 21, color: 'white' }}>Here's Your balance</Paragraph>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginRight: 5,width:'110%' }}>
                        <View style={{ right: 10 }}>
                            <Paragraph style={{ color: 'white', fontSize: 17 }}>
                                PERSONAL
                            </Paragraph>
                            <View style={MessageStyle.paragraphView}>
                                <FontAwesome5 style={MessageStyle.paragraph} name="dollar-sign" size={20} color="white" />
                                <Text style={MessageStyle.cardText}>0.</Text>
                                <Text style={MessageStyle.cardText2}>00</Text>
                            </View>
                        </View>
                        <View style={{ right: 15 }}>
                            <Paragraph style={{ color: 'white', fontSize: 17 }} >SHARED</Paragraph>
                            <View style={MessageStyle.paragraphView}>
                                <FontAwesome5 style={MessageStyle.paragraph} name="dollar-sign" size={20} color="white" />
                                <Text style={MessageStyle.cardText}>0.</Text>
                                <Text style={MessageStyle.cardText2}>00</Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>


            <View
                style={MessageStyle.iconView}>
                <View style={{ left: 18 }}>
                    <TouchableOpacity onPress={()=>Actions.AddFundScreen()}>
                        <FontAwesome5 name="sort-amount-up-alt" size={32} color="skyblue" borderWidth={1} />

                        <Text style={{
                            right: 10,
                            color: 'white',
                            fontSize: hp('1.6'),
                        }}>Add Funds</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons style={{ left: 10 }} name="ios-send" size={32} color="skyblue" />
                    <Text style={{
                        right: 10,
                        fontSize: hp('1.6'),
                        color: 'white'
                    }}>Send Money</Text>
                </TouchableOpacity>
                <View style={{ right: 18 }}>
                    <TouchableOpacity>
                        <MaterialIcons name="payments" size={32} color="skyblue" />
                        <Text style={{
                            right: 10,
                            color: 'white',
                            fontSize: hp('1.6'),
                        }}>Pay a Bill</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={MessageStyle.bottomView}>
                <View style={MessageStyle.bottomSubView}>
                    <View style={MessageStyle.bottom}></View>
                </View>

                <View style={MessageStyle.flatView}>
                    <Title style={{ color: '#0a356d' }}>Transactions</Title>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={NOTIFICATIONDATA}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <View style={MessageStyle.notificationMain}>

                                <View style={MessageStyle.notificationImageView}>
                                    <Image style={MessageStyle.notificationImage}
                                        source={item.image} />
                                    <View style={MessageStyle.nameView}>
                                        <View style={MessageStyle.name}>
                                            <Text style={MessageStyle.notificationName}>{item.name}</Text>
                                            <View style={MessageStyle.timeView}>
                                                <Text style={MessageStyle.time}>{item.time}</Text>
                                            </View>
                                        </View>
                                        <View style={MessageStyle.messageView2}>
                                            <Text style={MessageStyle.message}>{item.message}</Text>

                                            {item.count > 0 && (
                                                <View style={MessageStyle.countView}>
                                                    <Text style={MessageStyle.count}>{item.count}</Text>
                                                </View>
                                            )
                                            }
                                        </View>

                                    </View>
                                </View>
                                <View style={MessageStyle.secondFlat}></View>
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

            </View>

        </View>
    )
}
return render()
}
const mapStateToProps = state => ({ 
    userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {})
  });
  const mapDispatchToProps = dispatch => ({
     profile: details => dispatch(global.redux.action.account.profile(details)),
     
     
  });
  export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent)