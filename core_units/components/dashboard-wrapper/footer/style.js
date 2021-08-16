import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    appTabContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: responsiveHeight(1.6),
        height: responsiveHeight(7.5),
    },
    FooterToolbar: {
        height:55,
        width: '100%',
        backgroundColor: '#ccc',
        flexDirection: 'row',
        borderColor:'grey',
        borderWidth:1
    },
    tabIcon: {
        fontSize: responsiveFontSize(3.3),
        color: '#742e02',
    }
})