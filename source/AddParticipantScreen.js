import React, { Component, useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View, ScrollView, TouchableHighlight, SectionList, StyleSheet, Image, Dimensions, TextInput, Platform, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { countries } from 'country-data';
import route from 'color-convert/route';
import { title } from 'process';
import { object } from 'underscore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class AddParticipantScreen extends Component {


  contactArray = []
  isSearch = false

  constructor(props) {
    super(props)

    // console.log('check contact : ', this.contactArray)

    this.isSearch = false
    this.state = {
      sortType: 'asc',
      participantsArray: [],
      contactArray: [],
      participantLength: 0,
      dummy: true,
      searchText: ''
    }
  }

  async componentDidMount() {
    this.participant = []
    this.contactArray = []
    this.getContacts()
  }

  getContacts = async () => {

    // Getting Permission for Accessing Contact

    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();

      // Splitting Data as Title and Data

      let titleCreation = data.reduce((title, obj) => {
        title[obj.name.charAt(0)] = [...title[obj.name.charAt(0)] || [], obj]
        return title
      }, {})

      var title = Object.keys(titleCreation)
      var sectionData = title.map((item) => ({ title: item, data: titleCreation[item] }))


      // Sorting Data
      var sortedData = sectionData.sort((a, b) => {
        var change = (this.sortType === 'asc') ? -1 : 1
        return change * a.title.localeCompare(b.title)

      })

      // Filtering Data
      const filter = sortedData.reduce((result, datadummy) => {
        const { title, data } = datadummy;
        const filteredData = data.filter(function (item) {
          return item != undefined && item.phoneNumbers != undefined
        });
        if (filteredData.length > 0) {
          result.push({
            title,
            data: filteredData
          })
        }
        return result
      }, [])

      this.contactArray = filter
      this.setState({ contactArray: this.contactArray })

      // const x = JSON.stringify(data);
      // const y = 'search text';

      // const data = x.filter(res => {
      //         return(JSON.stringify(res).toLocaleLowerCase()).match(x.toLocaleLowerCase());
      //       });

      // if (data.length > 0) {
      //   // this.contactArray = []
      //   this.participants = []
      //   this.state.contactArray = []

      //   for (var i = 0; i < data.length - 1; i++) {
      //     let contact = data[i]
      //     // console.log("contact data : ", contact);
      //     // let phoneNumbers = null

      //     let phoneNumbers = contact.phoneNumbers
      //     if (phoneNumbers === undefined) {
      //       continue
      //     }
      //     let firstName = contact.firstName
      //     let lastName = contact.lastName
      //     let name = contact.name
      //     let firstLetter = name.charAt(0)
      //     // let contactdp = require('../assets/WA1x.png')
      //     // console.log("firstLetter : ", firstLetter); 


      //     for (var j = 0; j < phoneNumbers.length-1; j++) {

      //       let phoneNumber = phoneNumbers[j]
      //       // let countryCode = phoneNumber.countryCode;
      //       let number = phoneNumber.number

      //       // contactsArray.concat(contactDictionary)
      //       // setcontactsArray(...contactsArray, contactDictionary)

      //       // console.log("countryCode : ", countryCode)
      //       var contactDictionary = {
      //         firstName: firstName,
      //         lastName: lastName,
      //         name: name,
      //         phoneNumber: number,
      //         // contactImage: contactdp,
      //         // countryCode: "",
      //         countryCallingCodes: "",
      //         isSelected: false
      //       }


      //       // let countryCode = phoneNumber.countryCode;
      //       //   if (countryCode.length > 0) {
      //       //   let countryCodeUpperCase = countryCode.toUpperCase()
      //       //   let countryCallingCodes = countries[countryCodeUpperCase].countryCallingCodes
      //       //   if (countryCallingCodes.length > 0) {
      //       //     // console.log("countryCallingCodes : ", countryCallingCodes[0])


      //       //     contactDictionary = {
      //       //       firstName: firstName,
      //       //       lastName: lastName,
      //       //       name: name,
      //       //       phoneNumber: number,
      //       //       countryCode: countryCode,
      //       //       countryCallingCodes: countryCallingCodes[0],
      //       //       isSelected: false
      //       //     }
      //       //   }
      //       // }

      //       // console.log('----------------')

      //       var selectedIndex = 0
      //       var filteredArray = this.contactArray.filter(function (item, index) {
      //         // console.log('item : ', item.title.toUpperCase())
      //         // console.log('item firstLetter : ', index)
      //         selectedIndex = index
      //         return item.title.toUpperCase() == firstLetter.toUpperCase();
      //       })
      //       // console.log('filteredArray : ', filteredArray)
      //       if (filteredArray.length > 0) {
      //         var currentContact = filteredArray[0]["data"]
      //         // console.log('currentContact : ', currentContact)
      //         currentContact.push(contactDictionary)
      //         var dict = {
      //           title: firstLetter,
      //           data: currentContact,
      //         }
      //         // console.log("i = ", i)
      //         this.contactArray[selectedIndex] = dict
      //         // console.log('contactArrays : ', this.contactArray[i])


      //       } else {
      //         var dict = {
      //           title: firstLetter,
      //           data: [
      //             contactDictionary
      //           ],
      //         }
      //         this.contactArray.push(dict)
      //       }

      //     }

      //   }

      // }
      // console.log("contactsArray : ", this.contactArray)


      // var sortedData = this.contactArray.sort((a, b) => {
      //   var change = (this.sortType === 'asc') ? -1 : 1
      //   return change * a.title.localeCompare(b.title)

      // })



      // console.log("sortedData",sortedData);

      // this.setState({ contactArray: sortedData })
    }
  }
  onSearch = (text) => {

    var tempArray = this.state.contactArray
    this.state.searchText = text

    if (text.length > 0) {
      this.isSearch = true
      // if (isNaN(text)) {
      var trim = text.trim()

      const filter = tempArray.reduce((result, datadummy) => {
        const { title, data } = datadummy;
        // console.log(data);
        const filteredData = data.filter(function (item) {
          return item.name.includes(text) || item.phoneNumbers[0].number.includes(text)
        });
        console.log("filteredData: ", filteredData)
        if (filteredData.length > 0) {
          result.push({
            title,
            data: filteredData
          })
        }
        return result
      }, [])
      // this.contactArray = filter
      this.setState({ searchArray: filter })
    }
    // else {

    //   const filter = tempArray.reduce((result, datadummy) => {
    //     const { title, data } = datadummy;

    //     const filteredData = data.filter(function (item) {
    //       return item.phoneNumbers[0].number.includes(text)
    //     });
    //     // console.log(filteredData);
    //     if (filteredData.length > 0) {
    //       result.push({
    //         title,
    //         data: filteredData
    //       })
    //     }
    //     return result
    //   }, [])
    //   // this.contactArray = filter
    //   this.setState({ searchArray: filter })
    // }

    // }
    else {
      this.searchArray = false
      this.setState({ searchText: '' })
    }
  }

  addParticipant = (item, section, index) => {
    // console.log("------")
    // console.log(item)
    // console.log(sortedData[6].data[2].image.uri);
    // const sample = item.phoneNumbers.find((element) =>{
    //   element.title ===title
    // })
    // console.log(item)
    // console.log(section)
    // console.log("------")
    // console.log(this.contactArray)
    // let obj = section.find(items => items.title === item.title);
    // let sectionIndex = section.indexOf(item);
    let title = section['title']
    var sectionIndex = 0

    for (var j = 0; j < this.contactArray.length; j++) {
      let contact = this.contactArray[j]
      if (contact.title.toUpperCase() == title.toUpperCase()) {
        sectionIndex = j
      }

    }
    // var filteredArray = this.contactArray.filter(function (item, index) {
    //   selectedIndex = index
    //   return item.title.toUpperCase() == title.toUpperCase();
    // })
    // console.log('sectionIndex ',sectionIndex)

    // let isSelected = !item.isSelected
    item["isSelected"] = !item.isSelected
    this.contactArray[sectionIndex][index] = item
    this.setState({ contactArray: this.contactArray })
    if (item.isSelected == true) {
      this.participant.push(item)
      // console.log(this.participant)
      // console.log(this.participant.length);
      this.setState({ participantLength: this.participant.length })
      this.setState({ participantsArray: this.participant })
      // console.log("check", this.state.participantLength);
    } else {

      let obj = this.participant.find(items => items.item === item);
      let indexofItem = this.participant.indexOf(item);
      this.participant.splice(indexofItem, 1)
      // console.log(this.participant)
      this.setState({ participantLength: this.participant.length })
      this.setState({ participantsArray: this.participant })
      // this.participant.splice(item)
      // this.setState({participantLength: this.participant.length})
      // this.setState({participantsArray: this.participant})
    }
    // console.log(this.state.contactArray);
  }

  onBack = () => {
    this.props.navigation.goBack()
  }
  onNext = () => {
    if (this.participant.length > 0) {
      if (this.participant.length < 10) {
        this.props.navigation.navigate('GroupCreationScreen', { data: this.state.participantsArray })
      } else {
        console.log("Participants should be less than 10");
      }
    } else {
      alert("Please select a participant to create a group");
    }
  }

  render() {
    // console.log(this.participant.length);
    return (
      <View style={styles.baseContainer}>

        <View style={styles.container1}>
          <View style={styles.container1a}>
            <TouchableOpacity
              onPress={() => { this.onBack() }}
            >
              <View style={styles.backButtonView}>
                <Image source={require('../assets/back_square_arrow.png')}
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
              /10</Text>
          </View>
          <View style={styles.contianer2b}>
            <Image
              style={styles.searchIcon}
              source={require('../assets/fi_search.png')}
            >

            </Image>
            <TextInput
              placeholder='Search'
              placeholderTextColor='gray'
              onChangeText={(text) => this.onSearch(text)}
              style={styles.textInput}
            >
            </TextInput>
          </View>
          {/* List View   */}
          <View style={styles.container2c}>
            <SectionList
            showsVerticalScrollIndicator={false}
              sections={(this.state.searchText.length > 0) ? this.state.searchArray : this.contactArray}
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

                    {/* <View style={styles.itemImageView}> */}
                    <TouchableOpacity onPress={() => this.addParticipant(item, section, index)}>
                      <View style={{
                        flexDirection: 'row',
                        // flex: 1,
                        alignItems: 'center',
                        paddingTop: windowHeight * 0.01,
                        paddingLeft: windowWidth * 0.02,
                      }}>
                        <Image
                          style={{
                            height: 45,
                            width: 45,
                            borderRadius: 17,
                          }}
                          source={item.imageAvailable != true ? require('../assets/WA.png') : { uri: item.image.uri }}>

                        </Image>
                        {/* </View> */}

                        <View style={styles.contactView}>

                          <Text style={styles.contactName}>
                            {item.name}
                          </Text>
                          <View style={styles.contactDetailsView}>
                            <Text style={styles.contactDetails}>Phone: {item.phoneNumbers != undefined && item.phoneNumbers != null ? item.phoneNumbers[0].number : null}</Text>
                          </View>
                        </View>

                        <View style={styles.addIconView}>
                          {/* <TouchableOpacity onPress={() => this.addParticipant(item, section, index)}> */}
                            <Image
                              source={item.isSelected == true ? require('../assets/tick.png') : require('../assets/fi_plus.png')}

                              style={styles.addIcon}
                            />



                          {/* </TouchableOpacity> */}
                        </View>
                      </View>
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


const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#08356D',
    flex: 1
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
    // flexDirection: 'row',
    flex: 1,
    // alignItems: 'center',

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
    fontWeight: 'bold',
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
    backgroundColor: 'white',
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



