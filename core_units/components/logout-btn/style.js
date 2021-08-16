import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    formCard: {
        marginTop: responsiveHeight(6),
        padding: responsiveWidth(2),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 5.27,
        elevation: 10,
        borderRadius: 5,
    }
})