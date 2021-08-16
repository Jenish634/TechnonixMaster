import React,{Component} from 'react';
import { View,Image,Animated,Easing,TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import _ from 'lodash';

import style from './style';

class SplashScreen extends  Component{
	constructor(props) {
    super(props);
    this.state = { spinAnim: new Animated.Value(0) }
  }

 componentDidMount(){
 Animated.loop(Animated.timing(
    this.state.spinAnim,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true
  }
)).start();
 };
  render(){
  	const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={style.OrderRequeatPageContainer}>
      <TouchableOpacity style={style.OrderRequeatPageContainer}>
        <Image style={style.SplashScreenLogoText}  source={require('../../../assets/7.png')} />
      </TouchableOpacity>
      </View>
      )
  }
};

export default SplashScreen;

