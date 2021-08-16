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
    FlatList,
    ImageBackground,
    Pressable,Alert,Modal
} from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { connect } from 'react-redux';
import _, { filter, isEmpty } from 'lodash';
import Icon from "react-native-vector-icons/FontAwesome";
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import style from "./style";
import Toast from "react-native-toast-message";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;






const ContactsListScreen =(props)=> {
  const [contactsList, setcontactsList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [groupViewDetails, setGroupViewDetails] = useState({})
  const [detailChangeUpdate, setDetailChangeUpdate] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [groupDetails, setGroupDetails] = useState({})

  //Initial Load    
  useEffect(() => {
    if (_.get(props,'groupId')) {
      getGroup({id:_.get(props,'groupId')})
    }
    
          
      
  }, []);
  const setContactDetails =(details)=>{
    if (_.get(details,'_id')) {
      setGroupViewDetails(details)
       let data =[{..._.get(props,'userProfile',{})}]
          _.map(_.compact(_.get(details,'members',[])),(values,index)=>{
            let count =index + 1
            
            
            if (_.get(details,`user${index +1}`)) {
              data.push(_.get(details,`user${index +1}`))
            }
            
          })
          setcontactsList(data)
        }
  }

  const  getGroup = (body,type) => {
    props.nativeLoadingOverlaySpinner.show();
    
        props.getGroup({
            body,
            callback: (response, data) => {
              
              setGroupDetails(_.get(data,'data[0]',{}))
              setContactDetails(_.get(data,'data[0]',{}))
                if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                  props.nativeLoadingOverlaySpinner.close();
                }
                
            }
        }
        );
    }

const headerTitle =(details)=>{
  return _.startCase(_.get(details,'firstname'))+ ' '+ _.startCase(_.get(details,'lastname'))
}
  

const modalUI=()=>{
  return(

    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}>

    <View style={style.centeredView}>
        <View style={style.modalView}>


            <View style={style.FormGroup}>
                <TouchableOpacity style={{
                    alignContent: 'flex-end',
                    textAlign: 'right',
                    alignItems: 'flex-end',
                    right: 0,
                    marginRight: 2

                }} onPress={() => setModalVisible(false)
                }>
                    <Icon style={{
                        alignContent: 'flex-end',
                        textAlign: 'right',
                        alignItems: 'flex-end',
                        fontSize: 25, color: "#000",
                        fontFamily: 'RobotoBold'
                    }} name='close' /></TouchableOpacity>
                <Text style={{color:'#000000',width: '100%',
fontSize: responsiveFontSize(2.5),}}>
                Change Group Admin:
</Text>
<View>
              <TouchableOpacity onPress={()=>updateGroup(detailChangeUpdate,'super')}
                style={{ height: 45, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center',marginTop:12 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Make Super Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>updateGroup(detailChangeUpdate,'admin')}
                style={{ height: 45, backgroundColor: '#08356D', alignItems: 'center', justifyContent: 'center',marginTop:12 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Make Admin</Text>
              </TouchableOpacity>
            </View>

  </View></View></View></Modal>
  );
};
const updateGroup =(details,type)=>{
  let body={
    groupname:_.get(groupDetails,'groupId.groupname'),
    id:_.get(groupDetails,'groupId._id')
    
  }
  if (type=='super') {
    body.superAdmin=_.get(details,'_id'),
   body.admin=_.get(groupDetails,'groupId.admin')
  }else{
   
    body.superAdmin=_.get(groupDetails,'groupId.superAdmin')
    body.admin=_.get(details,'_id')
   
  }
  
  props.nativeLoadingOverlaySpinner.show();
  props.create({
    body,
    callback:(reponse,data)=>{
  
     if(reponse==true){
      getGroup({id:_.get(data,'data._id')})
      setModalVisible(false)
      if(_.chain(props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
        props.nativeLoadingOverlaySpinner.close();
      }  
       }
    }

  })
}
const toastMessage =(text)=>{
  Toast.show({
    type: 'error',
    text1: 'Tx Finance',
    text2: `${text}`,
    visibilityTime: 2000,
  });
 }

const changeAdmin =(details)=>{
  setModalVisible(true)
  setDetailChangeUpdate(details)
}

const listData = (details,index) => {
  return <TouchableOpacity onLongPress={()=>_.get(details,'_id') ==_.get(props,'userProfile._id') &&  _.get(details,'_id')!=_.get(groupViewDetails,'groupId.superAdmin') && _.get(details,'_id')!=_.get(groupViewDetails,'groupId.admin') &&changeAdmin(details)}>
  <View key={index} style={{ flexDirection: 'row', flex: 1, alignItems: 'center', paddingTop: windowHeight * 0.01, paddingLeft: windowWidth * 0.02, }}>

 {_.get(details,'photoUrl') !== 'no-photo.jpg'? <Image style={{ 
        resizeMode: 'cover',
        height: 45,
        width: 45,
        
        borderRadius: 100 / 2}} source={_.get(details,'photoUrl')!='no-photo.jpg'?{uri:_.get(details,'photoUrl')}: require('../../../assets/images/user-profile.jpeg')} />:
    
      <Image style={{ 
        resizeMode: 'cover',
        height: 45,
        width: 45,
        
        borderRadius: 100 / 2}} source={require('../../../assets/images/user-profile.jpeg')} />

      
    }
    <View style={{ paddingLeft: 10, flex: 2, }}>
    <View style={{ flexDirection: 'row', paddingTop: 2 }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>
        {headerTitle(details)}
      </Text>
      {_.get(details,'_id')==_.get(groupViewDetails,'groupId.superAdmin')&&
        <Text style={{ fontSize: 16, fontWeight: '500',justifyContent:'center',marginLeft:75 }}>Super Admin</Text>}
        {_.get(details,'_id')==_.get(groupViewDetails,'groupId.admin')&&
        <Text style={{ fontSize: 16, fontWeight: '500',justifyContent:'flex-end',marginLeft:85 }}>Admin</Text>}
      </View >
        <View style={{ flexDirection: 'row', paddingTop: 2 }}>
        {_.get(details,'mobile') &&  <Text style={{ fontSize: 13, fontWeight: '500' }}>Phone: </Text>}
        {_.get(details,'mobile') &&<Text style={{ fontSize: 13, }}>
        {_.get(details,'mobile')}

        </Text>}
       
       
        
      </View >
      
    
      
    </View>
    </View>
    </TouchableOpacity>


}

const filterProfile =(text)=>{
 let filter_data =[...contactsList]
  const filter = _.filter(filter_data,(list)=> `${_.get(list,'firstname') +' '+_.get(list,'lastname')}`.includes(text))
  
  (_.size(filter)==0 ||text=='' )? setcontactsList(searchList): setcontactsList(filter)
}
  

 const render = () => {
    return (
      <React.Fragment>
                    {modalUI()}
      <View style={{ backgroundColor: '#08356D', flex: 1 }}>
 {/* <Image resizeMode='contain' style={{marginTop:responsiveHeight(1), width:responsiveWidth(90),height:responsiveHeight(7)}} source={require('../../../assets/images/group-profile1.png')}/> */}
 <View style={{flex: 0.2,
    flexDirection: "column"}}>
    <ImageBackground source={require('../../../assets/images/group-profile1.png')} style={{ flex: 0.2,
    marginLeft:18,
    height:responsiveHeight(39),width:responsiveWidth(88)}}>
    </ImageBackground>
  </View>
        <View style={{ marginTop: windowHeight * 0.02, marginLeft: 20 }}>
          
          {/* <Text style={{ paddingTop: windowHeight * 0.01, color: 'white', fontSize: 16, fontWeight: '500' }}>
            Select participants to add to this group.
          </Text> */}
        </View>

        {/* participants count and search bar   */}
      {_.size(contactsList)>0 ?  <View style={{ flex: 1, marginTop: 90, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        
          <View style={{ marginTop: 10, alignItems: 'flex-end', paddingRight: 20, height: 17 }}>
            {/* <Text style={{ color: '#08356D', fontSize: 16, fontWeight: '500' }}>Participants: 0/{_.size(searchList)}</Text> */}
          </View>
          {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, flexDirection: 'row', height: 45, borderWidth: 1, borderRadius: 15, borderColor: 'gray', alignItems: 'center', }}>
            <Image
              style={{ height: 20, width: 20, tintColor: 'gray', marginLeft: 10 }}
              source={require('../../../assets/images/fi_search.png')}
            >

            </Image>
            <TextInput
              placeholder='Search'
              placeholderTextColor='gray'
              // onChangeText={(text)=>filterProfile(text)}

              style={{ height: windowHeight * 0.03, width: windowWidth * 0.46, paddingLeft: 5, opacity: 0.7 }}
            >
            </TextInput>
          </View> */}

          {/* List View   */}
          
          <View style={{ flex: 1, marginTop: 10, marginLeft: 20, marginRight: 20 }}>
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
<Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
      </React.Fragment>
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
  getGroup: details => dispatch(global.redux.action.group.getGroupConversation(details)),
  create: details => dispatch(global.redux.action.group.update(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(ContactsListScreen));
