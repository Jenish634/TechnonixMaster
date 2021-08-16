import React, { Component, useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View, ScrollView, TouchableHighlight, SectionList, StyleSheet, Image, Dimensions, TextInput, Platform } from 'react-native';
import * as Contacts from 'expo-contacts';
import { countries } from 'country-data';
import route from 'color-convert/route';
import { title } from 'process';
import { object } from 'underscore';
import _, { filter, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import nativeLoadingOverlaySpinner from '../../../core_units/components/native-loading-overlay-spinner';
import { Actions } from 'react-native-router-flux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


 class AddParticipantScreen extends Component {


  contactArray = []

  constructor(props) {
    super(props)

    // console.log('check contact : ', this.contactArray)


    this.state = {
      sortType: 'asc',
      participantsArray: [],
      contactList:[],
      contactArray: [],
      participantLength: 0,
      searchContactList:[],
      contactLength:[],
      mobileContactList:[]
      
    }
  }

  async componentDidMount() {
    this.participant = []
    this.contactArray = []
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails,Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data;
          this.setState({
            mobileContactList:contact
          })
          this.loadcontactsList(contact)
        }else{
          this.loadcontactsList()
        }
      }
    
  }
  loadcontactsList=(contact=[])=> {
    console.log('contact',contact);
    this.props.nativeLoadingOverlaySpinner.show();
      this.props.list({
          callback: (response, data) => {
              if (response) {
                if (_.size(_.get(data,'data',[]))>0 && _.size(contact)>0) {
                  // this.setState({
                  //   contactList:_.get(data,'data',[]),
                  //   searchContactList:_.get(data,'data',[])
                  // })
                  this.splitConstacts(_.get(data,'data',[]),contact)
                }else{
                  this.setState({
                    contactList:_.get(data,'data',[]),
                    searchContactList:_.get(data,'data',[])
                  })
                  this.splitUsers(_.get(data,'data',[]))
                }
               
                  
              }
              if(_.chain(this.props).get('nativeLoadingOverlaySpinner.close').isFunction().value()){
                this.props.nativeLoadingOverlaySpinner.close();
              }
          }
      }
      );
  }

  splitConstacts =(data,list)=>{
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
  this.setState({
    contactList:_.uniqBy(finalContact,'_id'),
    searchContactList:_.uniqBy(finalContact,'_id')
  })
  this.splitUsers(_.uniqBy(finalContact,'_id'))
  
  
    }

  splitUsers =(details,group)=>{
    let data=[]
  _.size(details)>0 && _.map(details,(value,index)=>{
   if (_.get(value,'_id')!==_.get(this.props,'userProfile._id')) {
    data.push(value)
   }
  })
  this.getContacts(data)
  this.setState({
    contactLength:data
  })
  }

  getContacts = async (data) => {
    


    let check = data.reduce((title, obj) => {
      title[obj.firstname.charAt(0)] = [...title[obj.firstname.charAt(0)] || [], obj]
      return title
    }, {})

    var title = Object.keys(check)
    var sectionData = title.map((item) => ({ title: item, data: check[item] }))
    this.contactArray = sectionData

    var sortedData = this.contactArray.sort((a, b) => {
      var change = (this.sortType === 'asc') ? -1 : 1
      return change * a.title.localeCompare(b.title)

    })

    
    this.setState({ contactArray: sortedData })

    
  
}

  addParticipant = (item, section, index) => {
    // console.log('index',index, item, section);
    let title = section['title']
    var sectionIndex = 0

    for (var j = 0; j < this.contactArray.length; j++) {
      let contact = this.contactArray[j]
      if (contact.title.toUpperCase() == title.toUpperCase()) {
        sectionIndex = j
      }

    }
    if (this.participant.length <=9 || _.get(item,'isSelected')==true) {
      
    
    item["isSelected"] = !item.isSelected
    this.contactArray[sectionIndex][index] = item
    this.setState({ contactArray: this.contactArray })
    if (item.isSelected == true) {
      this.participant.push(item)
      // console.log('participant',this.participant.length,this.contactArray.length);
      this.setState({ participantLength: this.participant.length })
      this.setState({ participantsArray: this.participant })
      
    } else {

      let obj = this.participant.find(items => items.item === item);
      let indexofItem = this.participant.indexOf(item);
      this.participant.splice(indexofItem, 1)
      this.setState({ participantLength: this.participant.length })
      this.setState({ participantsArray: this.participant })
      
    }
  }
    
  }

  onBack = () => {
    this.props.navigation.goBack()
  }
  onNext = () => {
    if (this.participant.length > 0) {
      Actions.GroupCreationScreen({ contactList: this.state.participantsArray })
    } else {
      // console.log("CHECK");
    }
  }
   headerTitle =(details)=>{
    return _.startCase(_.get(details,'firstname'))+ ' '+ _.startCase(_.get(details,'lastname'))
  }
  searchFilter =(text)=>{
    let filter_data =[..._.get(this,'state.contactList',[])]
    // console.log('filter_data',filter_data);
  const filter = _.filter(filter_data,(list)=> `${_.get(list,'firstname') +' '+_.get(list,'lastname')}`.includes(text))
  if (filter&&(_.size(filter)==0 ||text=='' )) {
    this.setState({
      contactList:_.get(this,'state.searchContactList',[])
    })
    this.getContacts(_.get(this,'state.searchContactList',[]))
  }else{
    this.setState({
      contactList:filter
    })
    this.getContacts(filter)
  }
 
   
  }
  render() {
    
    return (
      <View style={styles.baseContainer}>

        <View style={styles.container1}>
          <View style={styles.container1a}>
            <TouchableOpacity
              onPress={() => { this.onBack() }}
            >
              <View style={styles.backButtonView}>
                <Image source={require('../../../assets/images/back_square_arrow.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.addParticipantText}>
              Add Participants
            </Text>
          </View>
          <Text style={styles.selectParticipantText}>
            Select participants to add to this group.
          </Text>
        </View>

        {/* participants count and search bar   */}
        <View style={styles.container2}>
          <View style={styles.container2a}>
            <Text style={styles.participantsCount}>Participants: {this.state.participantLength}
              {/* {this.participant.length != undefined ? this.participant.length : 0} */}
              /{_.size(this.state.contactLength)}</Text>
          </View>
          <View style={styles.contianer2b}>
            <Image
              style={styles.searchIcon}
              source={require('../../../assets/images/fi_search.png')}
            >

            </Image>
            <TextInput
              placeholder='Search'
              placeholderTextColor='gray'
              style={styles.textInput}
              onChangeText={(value)=>this.searchFilter(value)}
            >
            </TextInput>
          </View>
          {/* List View   */}
          <View style={styles.container2c}>
            <SectionList
              sections={this.contactArray}
              keyExtractor={(item, index) => item + index}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator}>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) =>

              (
                <View style={styles.sectionHeaderView}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                  <View style={styles.sectionHeaderSeparator}>
                  </View>
                </View>
              )}
              renderItem={({ item, section, index }) => {
  
                return (
                  <View style={styles.itemView}>

                    <TouchableOpacity 
                    style={{flexDirection:'row',alignItems:'center'}}
                    onPress={() => this.addParticipant(item, section, index)}>
                    {/* <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        // paddingTop: windowHeight * 0.01,
                        // paddingLeft: windowWidth * 0.02,
                      }}> */}
                    {_.get(item,'photoUrl') !== 'no-photo.jpg'? <Image style={{ 
        resizeMode: 'cover',
        height: 45,
        width: 45,
        
        borderRadius: 100 / 2}} 
        // source={require('../../assets/images/user-profile.jpeg')}
        source={_.get(item,'photoUrl')!='no-photo.jpg'? {uri:_.get(item,'photoUrl')}:require('../../../assets/images/user-profile.jpeg')} 
        />:
        <Image
        style={{
          height: 45,
          width: 45,
          borderRadius: 17,
        }}
        source={require('../../../assets/images/WA.png')}>

      </Image>}
                    {/* </View> */}

                    <View style={styles.contactView}>

                      <Text style={styles.contactName}>
                      {this.headerTitle(item)}
                      </Text>
                      <View style={styles.contactDetailsView}>
                        <Text style={styles.contactDetails}>Phone: {item.mobile}</Text>
                      </View>
                    </View>

                    <View style={styles.addIconView}>
                      {/* <TouchableOpacity onPress={() => this.addParticipant(item, section, index)}> */}
                        <Image
                          source={item.isSelected == true ? require('../../../assets/images/tick.png') : require('../../../assets/images/fi_plus.png')}

                          style={styles.addIcon}
                        />



                      {/* </TouchableOpacity> */}
                    </View>
                    {/* </View> */}
                    </TouchableOpacity>
                  </View>
                )
              }}

            />
          </View>
        </View>

        <View style={styles.container3}>
          <TouchableOpacity
            onPress={() => this.onNext()}
            style={styles.nextButtonView}
          >
            <Text style={styles.nextButtonText}>
              Next
            </Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(nativeLoadingOverlaySpinner(AddParticipantScreen));

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#08356D',
    flex: 1,
    minHeight: Math.round(Dimensions.get('window').height)
  },

  container1: {
    marginTop: windowHeight * 0.06,
    marginLeft: 20
  },
  container1a: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButtonView: {
    backgroundColor: 'transparent',
    height: 30,
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
  addParticipantText: {
    color: 'white',
    height: 42,
    fontSize: 36,
    fontWeight: '700',
    paddingLeft: 10
  },
  selectParticipantText: {
    paddingTop: windowHeight * 0.01,
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  container2: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  container2a: {
    marginTop: 10,
    alignItems: 'flex-end',
    paddingRight: 20,
    height: 17
  },
  participantsCount: {
    color: '#08356D',
    fontSize: 16,
    fontWeight: '500'
  },
  contianer2b: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    height: 45,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    alignItems: 'center',
  },
  searchIcon: {
    height: 20,
    width: 20,
    tintColor: 'gray',
    marginLeft: 10
  },
  textInput: {
    height: windowHeight * 0.03,
    width: windowWidth * 0.46,
    paddingLeft: 5,
    opacity: 0.7
  },
  container2c: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 180
  },
  itemSeparator: {
    borderBottomWidth: 1,
    marginLeft: windowWidth * 0.176,
    borderBottomColor: '#D1D1D1',
    paddingTop: windowHeight * 0.019,
    paddingBottom: 5
  },
  sectionHeaderView: {
    paddingTop: 5,
    backgroundColor: 'white',
  },
  sectionHeaderText: {
    color: '#9E9E9E',
    fontWeight: '600',
    fontSize: 15
  },
  sectionHeaderSeparator: {
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    paddingTop: 3,
    paddingBottom: 2
  },
  itemView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingTop: windowHeight * 0.01,
    paddingLeft: windowWidth * 0.02,
  },
  itemImageView: {
    height: 45,
    width: 45,
    borderRadius: 17,
    backgroundColor: '#e6e6e6'
  },
  contactView: {
    paddingLeft: 9,
    flex: 2,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '700',
  },
  contactDetailsView: {
    flexDirection: 'row',
    paddingTop: 2
  },
  contactDetails: {
    fontSize: 12,
    fontWeight: '500',
  },
  addIconView: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10
  },
  addIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  container3: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 98,
    backgroundColor: 'white'
  },
  nextButtonView: {
    marginLeft: 58,
    marginRight: 58,
    marginTop: 20,
    marginBottom: 20,
    height: 58,
    backgroundColor: '#08356D',
    justifyContent: 'center',
    borderRadius: 5
  },
  nextButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }

})



