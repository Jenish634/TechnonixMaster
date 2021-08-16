import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {NOTIFICATIONDATA} from './data';
import MessageStyle from './style';
import { connect } from 'react-redux';
import _, { filter, isEmpty } from 'lodash';
import { ScrollView } from 'react-native';
const SampleComponent = (props) => {
    console.log('working or not');
   const render=()=>{ return (
        <View style={MessageStyle.container}>

            <View style={MessageStyle.messageView}>
                <Text style={MessageStyle.messageText}>Hi, {_.get(props,'userProfile.')}</Text>
                <View style={MessageStyle.imageView}>
                    <MaterialIcons name="notifications-active" size={35} color="skyblue" />
                </View>
            </View>

            <Card style={{ width: '93%', alignSelf: 'center', marginTop: 30, height: '21%', backgroundColor: '#a6f1a6' }}>
                <Card.Content>
                    <View>
                        <Paragraph style={{ fontSize: 21, color: 'white' }}>Here's Your balance</Paragraph>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginRight: 70 }}>
                        <View style={{ right: 15 }}>
                            <Paragraph style={{ color: 'white', fontSize: 11 }}>
                                PERSONAL
                            </Paragraph>
                            <View style={MessageStyle.paragraphView}>
                                <FontAwesome5 style={MessageStyle.paragraph} name="dollar-sign" size={20} color="white" />
                                <Text style={MessageStyle.cardText}>0.</Text>
                                <Text style={MessageStyle.cardText2}>00</Text>
                            </View>
                        </View>
                        <View style={{ right: 15 }}>
                            <Paragraph style={{ color: 'white', fontSize: 11 }} >SHARED</Paragraph>
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
                    <TouchableOpacity>
                        <FontAwesome5 name="sort-amount-up-alt" size={32} color="skyblue" borderWidth={1} />

                        <Text style={{
                            right: 10,
                            color: 'white',
                            fontSize: 11,
                        }}>Add Funds</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons style={{ left: 10 }} name="ios-send" size={32} color="skyblue" />
                    <Text style={{
                        right: 10,
                        fontSize: 11,
                        color: 'white'
                    }}>Send Money</Text>
                </TouchableOpacity>
                <View style={{ right: 18 }}>
                    <TouchableOpacity>
                        <MaterialIcons name="payments" size={32} color="skyblue" />
                        <Text style={{
                            right: 10,
                            color: 'white',
                            fontSize: 11,
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
                   <ScrollView>
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
                    </ScrollView>
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