import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default StyleSheet.create({
	TextBold: {
	fontWeight: 'bold'
	},
	OrderRequeatPageContainer: {
	overflow: 'visible',
	flex:1,
	padding:responsiveWidth(10),
	position: 'relative', 
	// maxWidth: '100%',
	fontFamily:'MontserratSemiBold',
	fontSize:20,
	backgroundColor:'#fff',
	display: 'flex',
	// alignItems: 'center',
	// justifyContent: 'center'
},
SplashScreenLogo: {
	resizeMode: "contain",
},
LoginBlockContainer: {
	// width: '100%',
	marginTop: responsiveWidth(6),
	marginBottom: responsiveWidth(5),
	// textAlign: 'center',
	display: 'flex',
	alignItems: 'center',
},
LoginBlockContainerLogos: {
	marginTop: responsiveWidth(6),
	marginBottom: responsiveWidth(5),
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row'
},
LoginBlockTextLogin: {
width: '100%',
	marginBottom: responsiveWidth(2),
	textAlign: 'center',
	fontSize: responsiveFontSize(2.7),
	// fontWeight: 'bold',
	fontFamily:'MontserratSemiBold',
	color: '#ffffff',
	textTransform: 'uppercase'
},
LoginBlockTextBottom: {
	paddingTop: responsiveWidth(2),
	textAlign: 'center',
	fontSize: responsiveFontSize(2.7),
	textTransform: 'uppercase',
	fontFamily:'MontserratLight',
	fontWeight: '100',
	borderTopColor: '#fff', 
	color: '#ffffff',
        borderTopWidth: 1
},
LoginBlockTextBottomLogos:{
	paddingTop: responsiveWidth(2),
	display: 'flex',
        flexDirection: 'row',
       borderTopWidth: 1,
  borderColor: 'white',
        
},
SocialLoginIcon: {
	width: responsiveWidth(25),
	height: responsiveHeight(5),
},
 
logoImage:{
	height:150,
	width:150,
	alignSelf:'center',
	marginTop:20
  },
  title:{
	 fontSize:22,
	 textAlign:'center',
	 paddingTop:20,
	 fontWeight:'500'

  },
  subTitle:{
	 fontSize:16,
	 textAlign:'center',
	 paddingVertical:20,
	 fontWeight:'500'
  },
  createSection:{
	 flexDirection:'row',
	 marginTop:5
  },
  linkBtn:{
	 paddingLeft:12,
	 fontSize:15,
	 color:'#007CC7'
  },
  wrapper:{
	height: 42,
	marginTop:5,
   paddingVertical: 5,
   borderRadius:5,
   alignItems:'center',
   justifyContent:'space-evenly'
 
  },
  loaderSection:{
	flexDirection:'row'
  },
  FormGroup: {
	width: '100%',
	marginBottom: responsiveHeight(3),
},
FormLabel: {
	width: '100%',
	fontSize: responsiveFontSize(2),
	color: "#000",
	marginBottom: responsiveWidth(3),
	opacity: .6,
	// fontFamily: 'RobotoRegular',
},
FormControl: {
	height: responsiveHeight(6),
	borderColor: '#ededed',
	borderWidth: 1,
	paddingVertical: responsiveWidth(1),
	paddingHorizontal: responsiveHeight(1.5),
	backgroundColor: '#ededed',
	fontSize: responsiveFontSize(2),
	color: "rgba(0, 0, 0, 0.8)",
	overflow: 'hidden',
	borderRadius:5
	// fontFamily: 'RobotoRegular',
},
passwordContainer: {
	flexDirection: 'row',
	paddingBottom: 10,
  },
  inputStyle: {
	flex: 1,
	height: responsiveHeight(6),
	borderColor: '#ededed',
	borderWidth: 1,
	paddingVertical: responsiveWidth(1),
	paddingHorizontal: responsiveHeight(1.5),
	backgroundColor: '#ededed',
	fontSize: responsiveFontSize(2),
	color: "rgba(0, 0, 0, 0.8)",
	overflow: 'hidden',
	borderBottomRightRadius:0,
	borderTopRightRadius:0,
	borderTopLeftRadius:5,
	borderBottomLeftRadius:5,
  },
  iconEye:{
	marginRight:5,
	borderBottomRightRadius:5,
	borderTopRightRadius:5,
	borderColor: '#ededed',
	height: responsiveHeight(6),
	borderWidth: 1,
	paddingVertical: responsiveWidth(2),
	paddingHorizontal: responsiveHeight(1.5),
	backgroundColor: '#ededed',
	fontSize: responsiveFontSize(3),
	color: "rgba(0, 0, 0, 0.8)",
	overflow: 'hidden',
  },
  appTabContainer: {
	width: responsiveWidth(100),
	overflow: 'visible',
	flex: 1,
	paddingVertical: responsiveHeight(1.1),
	paddingHorizontal: responsiveWidth(3),
	position: 'relative', 
	maxWidth: '100%',
	fontFamily:'MontserratSemiBold',
	backgroundColor:'#fefefe',
	display: 'flex',
	
},
FormGroup: {
	width: '100%',
	marginBottom: responsiveHeight(3),
},
FormLabel: {
	width: '100%',
	fontSize: responsiveFontSize(2.1),
	color: "#000",
	marginBottom: responsiveWidth(3),
	opacity: .6,
	fontFamily: 'RobotoRegular',
},
FormControl: {
	height: responsiveHeight(6),
	borderColor: '#ededed',
	borderWidth: 1,
	paddingVertical: responsiveWidth(1),
	paddingHorizontal: responsiveHeight(1.5),
	backgroundColor: '#ededed',
	borderRadius: 5,
	fontSize: responsiveFontSize(2),
	color: "rgba(0, 0, 0, 0.8)",
	overflow: 'hidden',
	fontFamily: 'RobotoRegular',
},
checkboxContainer: {
	flexDirection: "row",
	marginTop: responsiveHeight(0),
},
checkbox: {
	alignSelf: "center",
	transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
},
checkboxLabel: {
	margin: 8,
	color: '#707070',
	fontSize: responsiveFontSize(2.1),
},
PlusIcon: {
	width: responsiveHeight(6),
	height: responsiveHeight(6),
	backgroundColor: '#35e1d1',
	color: "rgba(0, 0, 0, 0.5)",
	textAlign: 'center',
	textAlignVertical: 'center',
	borderRadius: 100
},
FormGuestImage: {
	width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ededed"
},
ImageUploadContainer: {
	flexDirection: 'row'
},
FormSubmitButton: {
	textAlign: 'right',
	fontSize: responsiveFontSize(2),
	textTransform: 'uppercase',
	color: '#000',
	marginTop: responsiveHeight(3),
},
FormLabelIcon: {
	width: responsiveWidth(22),
	height: responsiveHeight(5),
	textAlign: 'center',
	textAlignVertical: 'center',
	borderRadius: 4,
	shadowColor: "#fff",
	shadowOffset: {
		width: 1,
		height: 1,
	},
	shadowOpacity: .01,
	shadowRadius: 5.46,
	elevation: 5,
	marginLeft: responsiveWidth(1)
},

centeredView: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	marginTop: 10
},
modalView: {
	margin: responsiveWidth(3),
	backgroundColor: "#fff",
	borderRadius: 10,
	padding: responsiveWidth(3),
	alignItems: "center",
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5,
	width: responsiveWidth(80),
	height: responsiveHeight(35),
},
})