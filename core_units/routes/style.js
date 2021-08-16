import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    HeaderLeftLogo: {
      // width: responsiveWidth(50),
      height: responsiveHeight(5),
      resizeMode: "contain",
      marginLeft: responsiveWidth(-11),
    },
    gettingStartedRightText: {
      fontSize: responsiveFontSize(2.3),
      color: '#fff',
      textTransform: 'uppercase',
      fontFamily:'MontserratRegular',
    },
    HeaderProfileImg: {
      width: responsiveWidth(11),
      height: responsiveHeight(11),
      resizeMode: "contain",
      borderRadius: 100/2
    },
    routerNavigationBarStyle: { backgroundColor: '#81b71a',elevation:0,borderBottomColor:'white',borderWidth:34 }
  });