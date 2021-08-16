import React, { Fragment, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, TouchableHighlight, Dimensions, Image, TextInput, FlatList, StyleSheet, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import _, { filter, isEmpty } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GroupCreation = (props) => {
  const  data  = _.get(props,'contactList',[])
  const [groupData, setgroupData] = useState(data)
  const [groupTitle, setGroupTitle] = useState('')
  const [photourl, setPhotoURL] = useState('no-phor.jpg')
  useEffect(() => {

    
    //   const firstName = 'You'
    //   const mydata = {
    //     "countryCallingCodes": "+1",
    //     "countryCode": "us",
    //     "firstName": firstName,
    //     "isSelected": true,
    //     "lastName": "i",
    //     "name": "snkr i",
    //     "phoneNumber": "80722224",
    //   }
    //   const mergedData = [...data, mydata]
    //   setgroupData(mergedData)

  }, [])
  

  const [groupDp, setgroupDp] = useState(null);

  const pickGroupIcon = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    

    if (!result.cancelled) {
      setgroupDp(result.uri)
      if (_.get(result,'uri')) {
        var photo = {
          uri:result.uri,
          type: 'image/jpg',
          name: 'photo.jpg',
      };
    
var form = new FormData();
form.append("image",photo)

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
        axios(settings).then((response)=>{
          setPhotoURL(_.get(response,'data.data.display_url'))
        if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          props.nativeLoadingOverlaySpinner.close();
        }
        }).catch((error)=>{
          if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
            props.nativeLoadingOverlaySpinner.close();
          }
               
        })
        }
    }
  }

  const removeParticipant = (index) => {
    
    
    const dummy = [...groupData]
    
    if (index < dummy.length) {
      dummy.splice(index, 1)
      setgroupData(dummy)
    
    } else {
    
    }
  }
 
  const onCreate = () => {
    if (groupData.length > 1) {
      console.log(groupData);
    validateForm(()=>{
      let body={
        groupname:groupTitle,
        superAdmin:_.get(props,'userProfile._id'),
        admin:_.get(groupData[0],'_id'),
        groupUrl:photourl
      }
      console.log('body',body);
      props.nativeLoadingOverlaySpinner.show();
      props.create({
        body,
        callback:(response,data)=>{
          
          if (response==false) {
            console.log('data',data);
            toastMessage(_.get(data,'error','Error'))
            if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                    props.nativeLoadingOverlaySpinner.close();
                  }
           }else if(response==true){
            if (response) {
              createConversation(_.get(data,'msg._id'))
             }

             if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
              props.nativeLoadingOverlaySpinner.close();
            }
            // imageUpload(_.get(data,'msg._id'))
           }
        }

      })
    })
   
     
      var groupDatas = {
        group_id: '',
        groupicon: '',
        superAdmin: '',
        admin: '',
        users: groupData,
      }

      groupDatas = JSON.stringify(groupDatas)

      

      // navigation.navigate('ChatScreen', { group: groupData, image: groupDp })
    } else {

      console.log("check");
    }
  }

  const validateForm =(callback)=>{
  
    if (groupTitle=='') {
      toastMessage('Please enter the group name!')
      }else{
      callback()
    }
  }
  const toastMessage =(text)=>{
    Toast.show({
      type: 'error',
      text1: 'Tx Finance',
      text2: `${text}`,
      visibilityTime: 2000,
    });
   }

  //image Upload
  const imageUpload = (id)=>{
    if (!_.isEmpty(groupDp) && groupDp !==null) {
      var photo = {
          uri: groupDp,
          type: 'image/jpg',
          name: 'photo.jpg',
      };


      var form = new FormData();
      form.append("image",photo)
      
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
      axios(settings).then((response)=>{
      console.log('response response',_.get(response,'data.data.display_url'));
      // let form = new FormData();
      // form.append("photo", photo);
      // props.nativeLoadingOverlaySpinner.show();
      props.updatePhoto({
          body: {groupUrl:_.get(response,'data.data.display_url')},
          params:{id},
          callback: (response, data) => {
            console.log(response, data);
              if (response) {
                createConversation(id)
               }

               if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                props.nativeLoadingOverlaySpinner.close();
              }
          }
      });
      
      }).catch((error)=>{
        if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
          props.nativeLoadingOverlaySpinner.close();
        }
      console.log('error error',error);
      })

      l
  }else{
    createConversation(id)
    if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
      props.nativeLoadingOverlaySpinner.close();
      
    }
   
  }
  }
  const createConversation =(id)=>{
    console.log('working Or not please check');
    let body ={
      groupId:id,
      user1:_.get(props,'userProfile._id')

    }
    if (_.size(groupData)>1) {
      _.map(groupData,(value,index)=>{
        body[`user${index+2}`]=_.get(value,'_id')
      })
    }

    props.nativeLoadingOverlaySpinner.show();
    props.createConversation({
      body,
      callback:(reponse,data)=>{
        console.log('createConversation',reponse,data);
        if (reponse==false) {
          toastMessage(_.get(data,'error','Error'))
          if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                  props.nativeLoadingOverlaySpinner.close();
                }
         }else if(reponse==true){
           console.log('createConversation',reponse,data);
          Actions.groupChatScreen({groupId:_.get(data,'data.groupId'),created:true})
          
         }
      }

    })
  }
  const   headerTitle =(details)=>{
    return _.startCase(_.get(details,'firstname'))+ ' '+ _.startCase(_.get(details,'lastname'))
  }
  return (
    <View style={styles.baseContainer}>
      <View style={styles.container1}>
        <View style={styles.container1a}>
          <TouchableOpacity
             onPress={() => Actions.pop()}
          >
            <View style={styles.backButtonView}>
              <Image source={require('../../../assets/images/back_square_arrow.png')}
                style={styles.backIcon}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.pageNameText}>
            New Group
          </Text>
        </View>
        <View style={styles.container1b}>
          <View>
            <TouchableOpacity
              onPress={() => pickGroupIcon()}
              style={styles.groupDpButton}>
              <Image style={{
                height: windowHeight * 0.105,
                width: windowWidth * 0.23,
                borderRadius: 25,
                resizeMode: 'stretch'
              }}
                source={groupDp != null && groupDp != 'undefined' && groupDp !== undefined ? { uri: groupDp } : require('../../../assets/images/Blue.png')}></Image>
              <Image
                source={require('../../../assets/images/Camera1x.png')}
                style={styles.cameraIcon}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.container1c}>
            <TextInput style={styles.textInput}
              placeholder="Group Name"
              placeholderTextColor='white'
              onChangeText={(text)=>setGroupTitle(text)}
            ></TextInput>
            <Text style={styles.text1}>
              Please provide a group subject and
            </Text>
            <Text style={styles.text2}>
              optional group icon
            </Text>
          </View>
        </View>

      </View>
      <View style={styles.container2}>

        <View style={styles.container2a}>
          <View style={styles.designLine}></View>
        </View>
        <FlatList
          style={styles.flatlistView}
          data={groupData}
          horizontal={false}
          numColumns={4}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            // console.log("ITEM",item);
            return (
              <View style={styles.itemView}>

                <View style={{ alignItems: 'center' }}>


                  <View style={styles.itemSubView1}>


                    <Image
                      style={styles.contactImage}
                      source={item.photoUrl != 'no-photo.jpg' ? { uri: item.photoUrl } :  require('../../../assets/images/WA.png')}>

                    </Image>


                  </View>


                  {/* <View style={{flexDirection:'row'}}> */}

                  <Text style={styles.contactName}
                    numberOfLines={2}
                  >{headerTitle(item)}</Text>

                  <TouchableOpacity
                    onPress={() => removeParticipant(index)}
                    style={styles.crossView}>
                    <Image source={require('../../../assets/images/cross.png')}
                      style={styles.crossIcon}
                    >

                    </Image>
                  </TouchableOpacity>

                  {/* </View> */}
                </View>

              </View>

            )
          }}
        />
        <View style={styles.container3}>
          <TouchableOpacity
            onPress={() => onCreate()}
            style={styles.createButtonView}>
            <Text style={styles.createText}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>
      <View>

      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />

    </View>
  );
};
// 375,812

const mapStateToProps = state => ({ 
  userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {})
});
const mapDispatchToProps = dispatch => ({
  create: details => dispatch(global.redux.action.group.create(details)),
  createConversation: details => dispatch(global.redux.action.group.createConversation(details)),
  updatePhoto: details =>
         dispatch(global.redux.action.group.updatePhoto(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(GroupCreation));


const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#08356D',
    flex: 1
  },
  container1: {
    paddingTop: windowHeight * 0.068,
    marginLeft: windowWidth * 0.054
  },
  container1a: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButtonView: {
    marginTop: 2,
    backgroundColor: 'transparent',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  backIcon: {
    height: 15,
    width: 20,
    resizeMode: 'contain'
  },
  pageNameText: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    paddingLeft: windowWidth * 0.021
  },
  container1b: {
    flexDirection: 'row',
    paddingTop: windowHeight * 0.017,
    paddingLeft: windowWidth * 0.016
  },
  groupDpButton: {
    height: windowHeight * 0.105,
    width: windowWidth * 0.23,
    // backgroundColor: '#19549D',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    tintColor: 'white',
    resizeMode: 'contain',
  },
  container1c: {
    paddingLeft: windowWidth * 0.016
  },
  textInput: {
    width: windowWidth * 0.61,
    height: windowHeight * 0.049,
    borderColor: '#19549D',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    color: 'white'
  },
  text1: {
    color: 'white',
    paddingTop: 6,
    fontSize: 14,
    fontWeight: '400'
  },
  text2: {
    color: 'white',
    paddingTop: 1,
    fontSize: 14,
    fontWeight: '400',
    marginBottom: windowHeight * 0.038
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container2a: {
    marginTop: windowHeight * 0.024,
    height: 5,
    alignItems: 'center'
  },
  designLine: {
    backgroundColor: '#DCDCDC',
    width: windowWidth * 0.12,
    height: 5,
    borderRadius: 2
  },
  flatlistView: {
    flex: 1,
    paddingTop: windowHeight * 0.031,
    marginLeft: windowWidth * 0.042,
  },
  itemView: {
    marginTop: 10,
    paddingRight: windowWidth * 0.064,
  },
  itemSubView1: {
    borderWidth: 1,
    borderColor: '#08356D',
    borderRadius: 15,
    padding: 1,
  },
  contactImage: {
    height: windowWidth * 0.175,
    width: windowWidth * 0.17,
    borderRadius: 15,
    borderColor: '#08356D',
  },
  crossView: {
    position: 'absolute',
    backgroundColor: '#26BFBF',
    height: 16.67,
    width: 16.67,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    left: windowWidth * 0.157,
    marginTop: -(windowHeight * 0.008)
  },
  crossIcon: {
    height: 10,
    width: 10,
  },
  contactName: {
    fontSize: 13,
    fontWeight: '600',
    paddingBottom: windowWidth * 0.032,
    paddingTop: 5,
    width: windowWidth * 0.181,
    letterSpacing: -0.165,
    textAlign: 'center'
  },
  container3: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: windowHeight * 0.03,
    paddingBottom: windowHeight * 0.03
  },
  createButtonView: {
    marginHorizontal: windowWidth * 0.154,
    width: windowWidth * 0.7,
    height: windowHeight * 0.071,
    backgroundColor: '#08356D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  }
})