import React, { Fragment, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View,Alert ,ScrollView, TouchableHighlight, Dimensions, Image, TextInput, FlatList, StyleSheet, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateGroupNameAsync } from 'expo-contacts';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GroupCreationScreen = ({ navigation, route }) => {
  const { data } = route.params
  // console.log(data);
  // console.log("name :", data.name);
  const [groupData, setgroupData] = useState(data)
  const [sortType,setsortType] = useState('asc')

  useEffect(() => {
    // console.log(groupData);
    var sortedData = groupData.sort((a, b) => {
      var change = (sortType === 'asc') ? 1 : -1
      console.log(change);
      return change * a.name.localeCompare(b.name)

    })
    setgroupData(sortedData);

    // console.log(groupData);
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
  // console.log(groupData);

  const [groupDp, setgroupDp] = useState(null);

  const pickGroupIcon = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setgroupDp(result.uri)
    }
  }

  const removeParticipant = (index) => {
    // console.log('index: ', index)

    const dummy = [...groupData]
    // console.log('length: ', dummy.length)
    if (index < dummy.length) {
      dummy.splice(index, 1)
      setgroupData(dummy)
      // console.log("dummy length: ", dummy.length);
    } else {
      // console.log("check");
    }
  }
  const onBack = () => {
    navigation.goBack()
  }
  const [groupName,setgroupName]=useState('')
  const createGroupName = (text) => {
    setgroupName(text)
  }
  const onCreate = () => {
    // console.log('length: ', groupData.length)
    // if (groupData.length < 1) {
    //   return
    // }
    if (groupData.length > 1) {


      // var groupDatas = {
      //   group_id: '',
      //   groupicon: '',
      //   superAdmin: '',
      //   admin: '',
      //   users: groupData,
      // }

      // groupDatas = JSON.stringify(groupDatas)

      // fetch("https://txfinance.herokuapp.com/api/v1/group", {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: groupDatas,
      // }).then((response) => response.json())
      //   .then((responseJson) => {

      //     if (responseJson.code === 200) {
      //     }
      //   })
      if(groupName.length >0){
      navigation.navigate('ChatScreen', {groupMembers: groupData, groupDp:groupDp, groupName:groupName})
    }else{
      alert("Group Name cannot be empty")
    }
    } else {

      console.log("check");
    }
  }

  return (
    <View style={styles.baseContainer}>
      <View style={styles.container1}>
        <View style={styles.container1a}>
          <TouchableOpacity
            onPress={() => { onBack() }}
          >
            <View style={styles.backButtonView}>
              <Image source={require('../assets/back_square_arrow.png')}
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
                source={groupDp != null && groupDp != 'undefined' && groupDp !== undefined ? { uri: groupDp } : require('../assets/Blue.png')}></Image>
              <Image
                source={require('../assets/Camera1x.png')}
                style={styles.cameraIcon}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.container1c}>
            <TextInput style={styles.textInput}
              placeholder="Group Name"
              onChangeText={(text)=>createGroupName(text)}
              placeholderTextColor='white'
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
                      source={item.imageAvailable != true ? require('../assets/WA.png') : { uri: item.image.uri }}>

                    </Image>


                  </View>


                  {/* <View style={{flexDirection:'row'}}> */}

                  <Text style={styles.contactName}
                    numberOfLines={2}
                  >{item.name}</Text>

                  <TouchableOpacity
                    onPress={() => removeParticipant(index)}
                    style={styles.crossView}>
                    <Image source={require('../assets/cross.png')}
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


    </View>
  );
};
// 375,812
export default GroupCreationScreen;


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