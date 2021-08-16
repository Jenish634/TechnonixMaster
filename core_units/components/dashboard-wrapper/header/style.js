import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    HeaderLeftLogo: {
        height: 50,
        width: 50,
        resizeMode: "cover",
        marginLeft: responsiveWidth(1),
        borderRadius: 100,
        marginTop: 8,
    },
    HeaderProfileImg: {
        // width: responsiveWidth(11),
        // height: responsiveHeight(11),
        // resizeMode: "cover",
        marginTop: -15,
        resizeMode: 'cover',
        height: 40,
        width: 40,
        borderRadius: 100 / 2
    },
});