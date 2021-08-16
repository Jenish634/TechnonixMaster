import React, { Component } from 'react';
import { FlatList, Button, Alert, Image, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';


export default class NewsfeedScreen extends Component {


  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
 

  }

  componentDidMount() {

  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#f5f5f5' }}>
      
      
       
      </View>
    );
  }
}