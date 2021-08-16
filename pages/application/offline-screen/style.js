import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default StyleSheet.create({
	    OrderRequeatPageContainer: {
	    overflow: 'visible',
	    flex:1,
	    padding:responsiveWidth(5),
	    paddingLeft:responsiveWidth(4),
	    paddingRight:responsiveWidth(4),
	    position: 'relative', 
	    maxWidth: '100%',
	    fontFamily:'MontserratSemiBold',
	    backgroundColor:'#007CC7',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
    },
    SplashScreenLogoText: {
	    resizeMode: "contain",
	    marginLeft: responsiveWidth(4),
        marginTop: responsiveHeight(6)
    },
    TermsAcceptTitleText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.7),
        marginTop: responsiveHeight(2.5),
        fontFamily:'RobotoLight',
    },
    TermsServiceFeedBackBox:{
        height: responsiveHeight(60),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});