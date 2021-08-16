import React, { Component } from 'react';
import { Animated, FlatList, Button, Alert, Image, View, Text, TextInput, Dimensions, TouchableOpacity, ToastAndroid, ScrollView,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ProfileScreen extends Component {

  APP_THEME_COLOR_VOILET = '#0a356d'

  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;

    this.state = {
      value: '',
    };

  }

  componentDidMount() {

    let mobile = this.getData('KMobileNumber')
    let password = this.getData('KPassword')
  }

  handleTextChange = (newText) => {
    this.setState({ value: newText });
  }

  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        // value previously stored
        console.log('mobile :-- ', value)
        // this.props.navigation.navigate('ProfileScreen')
        return value
      } else {
        this.props.navigation.navigate('LoginScreen')
      }
    } catch (e) {
      // error reading value
    }
    return ""
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {

    }
  }
  /*  Button Action */

  onEditProfile = () => {
    this.props.navigation.navigate('EditProfileScreen')
  }

  onLogout = () => {
    this.storeData('KMobileNumber', '')
    this.storeData('KPassword', '')
    this.props.navigation.navigate('LoginScreen')
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.baseContainer}>

        <ScrollView style={styles.scrollView}>
          <View style={styles.container1}>
            <Text style={styles.profileText}>Profile</Text>

          </View>

          <View style={styles.container2}>
            <Image style={styles.profileImage}
              source={require('../assets/group2.png')}></Image>
            <View style={styles.profileView}>
              <Text style={styles.profileName}>Chipo Masimba</Text>
              <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => this.onEditProfile()}
              >
                <View style={styles.editProfileView}>
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          {/* Account design */}
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>

            {/* Cards design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/card_icon.png')} />
              <Text style={styles.sectionText}>Cards</Text>
              <View style={styles.sectionreverseView}>
                <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>

            {/* Analytics design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/u_chart-line.png')} />
              <Text style={styles.sectionText}>Analytics</Text>
              <View style={styles.sectionreverseView}>
              <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>

            {/* Security design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/fi_lock.png')} />
              <Text style={styles.sectionText}>Security</Text>
              <View style={styles.sectionreverseView}>
              <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>
            <View style={styles.sectionSeparator}></View>
          </View>


          {/* SUPPORT design */}
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>SUPPORT</Text>

            {/* Report a problem design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/fi_flag.png')} />
              <Text style={styles.sectionText}>Report a problem</Text>
              <View style={styles.sectionreverseView}>
              <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>

            {/* Help Centre design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/fi_help-circle.png')} />
              <Text style={styles.sectionText}>Help Centre</Text>
              <View style={styles.sectionreverseView}>
              <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>

            {/* FAQ design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/fi_info.png')} />
              <Text style={styles.sectionText}>FAQ</Text>
              <View style={styles.sectionreverseView}>
              <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>
            <View style={styles.sectionSeparator}></View>
          </View>

          {/* ABOUT design */}
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>ABOUT</Text>

            {/* Terms & Privacy design */}
            <View style={styles.sectionChildView}>
              <Image style={styles.sectionIcon}
                source={require('../assets/fi_file-text.png')} />
              <Text style={styles.sectionText}>Terms & Privacy</Text>
              <View style={styles.sectionreverseView}>
              <Image style={styles.arrowIcon}
                  source={require('../assets/right_arrow.png')} />
              </View>
            </View>

            <View style={styles.sectionSeparator}></View>
          </View>

          {/* ACTIONS design */}
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>ACTIONS</Text>

            {/* Log Out design */}
            <TouchableOpacity
              onPress={() => this.onLogout()}
            >
              <View style={ {marginBottom: 20 },styles.sectionChildView}>
                <Image style={styles.sectionIcon}
                  source={require('../assets/fi_log-in.png')} />
                <Text style={styles.sectionText}>Log Out</Text>
                <View style={styles.sectionreverseView}>
                {/* <Image style={styles.arrowIcon}
                    source={require('../assets/right_arrow.png')} /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1, 
    backgroundColor: 'white', 
  },
  scrollView:{ 
    marginTop: windowHeight*0.073, 
  },
  container1:{
    marginLeft: windowWidth*0.053, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  profileText:{
    color: '#0a356d', 
    fontSize: 35, 
    fontWeight: '600'
  },
  container2:{
    marginLeft: windowWidth*0.053, 
    marginTop: windowHeight*0.024, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  profileImage:{
    height: windowHeight*0.1, 
      width: windowWidth*0.23, 
      // 86,86
      resizeMode: 'contain' 
  },
  profileView:{
    flex: 1, 
      marginLeft: windowWidth*0.064 
  },
  profileName:{
    color: '#0a356d',  
    fontSize: 24, 
    fontWeight: '600' 
  },
  editProfileButton:{
    height: windowHeight*0.061
  },
  editProfileView:{
     flex: 1, 
     backgroundColor: '#0a356d', 
     alignItems: 'center', 
     justifyContent: 'center', 
     marginTop: 5, 
     marginBottom: 5, 
     marginRight: windowWidth*0.16 
  },
  editProfileText:{
    color: 'white', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  sectionView:{
     marginHorizontal: windowWidth*0.053, 
      marginTop: windowHeight*0.018, 
  },
  sectionTitle:{
     color: '#0a356d', 
     height: windowHeight*0.027, 
     fontSize: 14, 
     fontWeight: '600' 
  },
  sectionChildView:{
     marginTop: windowHeight*0.014,
      height: windowHeight*0.03,
      flexDirection: 'row',
      alignItems:'center',
  },
  sectionIcon:{
    height: windowHeight*0.015, 
    width: windowWidth*0.044, 
    resizeMode: 'contain' 
  },
  sectionText:{
     marginLeft: windowWidth*0.032,
     color: '#0a356d', 
     fontSize: 12, 
     fontWeight: '400' 
  },
  sectionreverseView:{
    flex: 1, 
    flexDirection: 'row-reverse' 
  },
  arrowIcon:{
    height: windowHeight*0.019,
    width: windowWidth*0.042,
    resizeMode: 'contain' 

  },
  sectionSeparator:{
     marginTop: windowHeight*0.014, 
     height: 1, 
     backgroundColor: '#C4C4C4' 
  }
})
