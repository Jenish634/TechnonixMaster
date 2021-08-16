import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    TextInput,
    SectionList,
    FlatList
} from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { RefreshControl } from "react-native";
import * as Contacts from 'expo-contacts';


import nativeLoadingOverlaySpinner from '../../core_units/components/native-loading-overlay-spinner';
import style from "./style";
import { FontAwesome,Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const DATA = [
  {
    title: "V",
    data: [
      {
        dp: '',
        name: 'Valerie',
        phone: '+263 693 - 938273',
      },
      {
        dp: '',
        name: 'Victor',
        phone: '+263 693 - 369273',
      },
      {
        dp: '',
        name: 'Vimbai',
        phone: '+263 376 - 893028',
      },
    ]
  },
  {
    title: "W",
    data: [
      {
        dp: '',
        name: 'Waje',
        phone: '+263 376 - 009274',
      },
      {
        dp: '',
        name: 'Wale',
        phone: '+263 376 - 183267',
      },
    ]
  },
  {
    title: "Y",
    data: [
      {
        dp: '',
        name: 'Yemi',
        phone: '+263 376 - 078297',
      },
      {
        dp: '',
        name: 'Yetunde',
        phone: '+263 376 - 902187',
      },
    ]
  }
];



const ContactsListScreen =(props)=> {
  const [contactsList, setcontactsList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [mobileContactList, setMobileContactList] = useState([])
  //Initial Load    
  useEffect(() => {
      
          
          (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
              const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails,Contacts.Fields.PhoneNumbers],
              });
      
              if (data.length > 0) {
                const contact = data;
                setMobileContactList(contact)
                loadcontactsList(contact);
              }else{
                loadcontactsList([]);
              }
            }
          })();
      
  }, []);

  //Refresh pull-down
  const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadcontactsList()
    wait(2000).then(() => setRefreshing(false));
}, []);

function loadcontactsList(contact) {
  console.log('Check out');
  props.nativeLoadingOverlaySpinner.show();
    props.list({
        callback: (response, data) => {
          if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
            props.nativeLoadingOverlaySpinner.close();
          }
            if (response) {
              if (_.size(_.get(data, 'data', []))>0) {
                let datas = _.get(data, 'data', [])
                datas.sort(function(a, b) {
                  var textA = a.firstname.toUpperCase();
                  var textB = b.firstname.toUpperCase();
                  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
              });
              if (_.size(datas)>0 && _.size(contact)>0) {
                splitConstacts(datas,contact)
              }else{
                setcontactsList(datas)
                setSearchList(datas)
              }
              
              }
             
                
            }
        }
    }
    );
}
const splitConstacts =(data,list)=>{
  let countryCode =['+91','+1','+27']
  let finalContact =[]
  _.map(list,(value,index)=>{
    // console.log('valuevaluevaluevalue',value);
  if (_.size(_.get(value,'phoneNumbers',[]))>0) {
    _.map(_.get(value,'phoneNumbers',[]),(v1,i1)=>{
      let number = `${_.get(v1,'number')}`.replace(/[- .]/g, "")
      _.map(countryCode,(v3,i3)=>{
        number = _.replace(number, v3, '');
      })
      _.map(data,(v2,i2)=>{
        if (_.get(v2,'mobile')==number) {
          finalContact.push({...v2})
          
        }

  
      })
  })
}
})
console.log('finalContact',_.uniqBy(finalContact,'_id'),data);
setcontactsList(_.uniqBy(finalContact,'_id'))
                setSearchList(_.uniqBy(finalContact,'_id'))

  }



const headerTitle =(details)=>{
  return _.startCase(_.get(details,'firstname'))+ ' '+ _.startCase(_.get(details,'lastname'))
}
  
function LogoTitle(item) {
  return (
      <View style={{flexDirection:'row',marginLeft:200}}>
    <Image
      style={{  height: 45,
          width: 45,
          resizeMode: "cover",
          borderRadius: 100,
          marginLeft:responsiveWidth(-6),
          marginTop:responsiveWidth(2)

          
          
          }}
          source={_.get(item,'photoUrl')!='no-photo.jpg'? {uri:_.get(item,'photoUrl')}:require('../../assets/images/user-profile.jpeg')} 
    />
    <Text style={{marginTop:responsiveWidth(5.5),color:'white',fontWeight:'bold',fontSize:20}}> {headerTitle(item)}</Text>
    </View>
  );
}

const listData = (details,index) => {
  return <TouchableOpacity onPress={()=> Actions.privateChat({
    conversationParams:
    {senderId:_.get(props,'userProfile._id'),
    receverId:_.get(details,'_id'),name:details},
    title:LogoTitle(details)})}>
  <View key={index} style={{ flexDirection: 'row', flex: 1, alignItems: 'center', paddingTop: windowHeight * 0.01, paddingLeft: windowWidth * 0.02, }}>

 {_.get(details,'photoUrl') !== 'no-photo.jpg'? <Image style={{ 
        resizeMode: 'cover',
        height: 45,
        width: 45,
        
        borderRadius: 100 / 2}} 
        // source={require('../../assets/images/user-profile.jpeg')}
        source={_.get(details,'photoUrl')!='no-photo.jpg'? {uri:_.get(details,'photoUrl')}:require('../../assets/images/user-profile.jpeg')} 
        />:
    <View style={{ height: 45, width: 45, borderRadius: 17, backgroundColor: 'gray', opacity: 0.2, }}>
      <Image>

      </Image>
    </View>}

    <View style={{ paddingLeft: 10, flex: 2, }}>

      <Text style={{ fontSize: 16, fontWeight: '600' }}>
        {headerTitle(details)}
      </Text>
      <View style={{ flexDirection: 'row', paddingTop: 2 }}>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>Phone: </Text>
        <Text style={{ fontSize: 13, }}>
        {_.get(details,'mobile')}
        </Text>
      </View>

    </View></View>
    </TouchableOpacity>


}

const filterProfile =(text)=>{
  let filter_data =[...contactsList]
  console.log('filter_data',filter_data);
   const filter = _.filter(filter_data,(list)=> _.lowerCase(`${_.get(list,'firstname') +' '+_.get(list,'lastname')}`).includes(_.lowerCase(text)))
   console.log('filter',text);
   if(_.size(filter)==0 || text==''  ){
    setcontactsList(searchList)
   }else if (_.isArray(filter)==true && _.size(filter)>0) {
    setcontactsList(filter)   
   }
  
 }
   
  
 const onBack = () => {
  props.navigation.goBack()
}
 const render = () => {
    return (
      <View style={{ backgroundColor: '#08356D', flex: 1,minHeight: Math.round(Dimensions.get('screen').height) - (Math.round(Dimensions.get('screen').height)-Math.round(Dimensions.get('window').height)) -200}}>
 <View style={{ marginTop: windowHeight * 0.06,
    marginLeft: 20}}>
          <View style={{flexDirection: 'row',
                      alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => { onBack() }}
            >
              <View style={{ backgroundColor: 'transparent',
                     height: 30,
                     width: 30,
                     alignItems: 'center',
                     justifyContent: 'center',
                     borderRadius: 5}}>
                <Ionicons style={{}} name="arrow-back" size={28} color={"white"} />
              </View>
            </TouchableOpacity>
            <Text style={{ color: 'white',
              height: 42,
              fontSize: 22,
              fontWeight:'800',
              paddingLeft: 10,
              marginTop:12,marginLeft:15}}>
                Contacts
            </Text>
          </View>
        </View>
        <View style={{ marginTop: windowHeight * 0.02, marginLeft: 20 }}>
          
          {/* <Text style={{ paddingTop: windowHeight * 0.01, color: 'white', fontSize: 16, fontWeight: '500' }}>
            Select participants to add to this group.
          </Text> */}
        </View>

        {/* participants count and search bar   */}
      {_.size(searchList)>0 ?  <View style={{ flex: 1, marginTop: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <View style={{ marginTop: 10, alignItems: 'flex-end', paddingRight: 20, height: 17 }}>
            <Text style={{ color: '#08356D', fontSize: 16, fontWeight: '500' }}>Participants: 0/{_.size(searchList)}</Text>
          </View>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, flexDirection: 'row', height: 45, borderWidth: 1, borderRadius: 15, borderColor: 'gray', alignItems: 'center', }}>
            <Image
              style={{ height: 20, width: 20, tintColor: 'gray', marginLeft: 10 }}
              source={require('../../assets/images/fi_search.png')}
            >

            </Image>
            <TextInput
              placeholder='Search'
              placeholderTextColor='gray'
              onChangeText={(text)=>filterProfile(text)}

              style={{ height: windowHeight * 0.03, width: windowWidth * 0.46, paddingLeft: 5, opacity: 0.7 }}
            >
            </TextInput>
          </View>

          {/* List View   */}
          <View style={{ flex: 1, marginTop: 20, marginLeft: 20, marginRight: 20,marginBottom:25 }}>
            <FlatList
              data={contactsList}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ borderBottomWidth: 0.2, marginLeft: windowWidth * 0.16, borderBottomColor: 'gray', paddingTop: windowHeight * 0.019, paddingBottom: 5 }}>
                </View>
              )}
              renderItem={({item,index})=>listData(item,index)}
            />
          </View>
        </View>:
       _.get(props,'listLoading')==false? <View style={{ flex: 1, marginTop: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <Text style={{textAlign:'center',marginTop:responsiveWidth(54),fontWeight:'bold',fontSize:18}}>No Contacts</Text>
          </View>: <View style={{ flex: 1, marginTop: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          
          </View>}



        {/* <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 98, backgroundColor: 'white' }}>
          <TouchableOpacity style={{ marginLeft: 58, marginRight: 58, marginTop: 20, marginBottom: 20, height: 58, backgroundColor: '#08356D', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Next
            </Text>
          </TouchableOpacity>
        </View> */}


      </View>
    );
  };
  return render()
}

const mapStateToProps = (state) => {
  
  return {
      userProfile: _.get(state, `app.${global.redux.actionTypes.account.name}.profile.data[0]`, {}),
      listLoading: _.get(state, `app.${global.redux.actionTypes.contacts.name}.listLoadingInProgress`, false)

  }
};
const mapDispatchToProps = dispatch => ({
  list: details => dispatch(global.redux.action.contacts.list(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ContactsListScreen));
