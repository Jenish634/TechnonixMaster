import { StyleSheet,Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AddFundStyle = StyleSheet.create({
    container1a: {
        flex: 1,
        marginLeft: wp('5.33'),
       
    },
    addFund: {
        marginTop: hp('3.69'),
    },
    amount: {
        fontSize: wp('5.33'),
        paddingBottom: 4
    },
    modalDropDown: {
        borderWidth: 1,
        width: '90%',
        height: hp('5.91'),
        borderRadius: 15,
        borderColor: '#08356D',
        justifyContent: 'center',
    },
    dropDownPlaceholder:{
            paddingLeft: wp('2.66'),
            fontWeight: '500',
            fontSize: wp('3.73'),
        
    },
    dropDownText:{
            fontWeight: '400',
            fontSize: wp('4.53'),
            color:'black',
            paddingHorizontal:wp('4.26'),
            paddingVertical:hp('1.6')   
    },
    dropDownContainer: { 
        borderWidth: 1.5, 
        width: "90%", 
        height: hp('11.82'), 
        borderRadius: 5,
        borderColor:'#EDEDEE'
    },
    margin: {
        marginTop: hp('1.48')
    },
    container2a:{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center'
    },
    textInput: {
        borderWidth: 1,
        width: '89%',
        height: hp('5.91'),
        borderRadius: 15,
        borderColor: '#08356D',
        paddingLeft: wp('2.66'),
    },
})

export default AddFundStyle;