import { StyleSheet } from 'react-native';

const BottomSheetStyle = StyleSheet.create({
    closeBs: {
        position: 'absolute',
        top: 10,
        right: 25,
        zIndex: 9000,
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        borderWidth: 1,
        height: 25,
        backgroundColor: 'transparent',
        borderRadius: 4,
    },
    hitSlot: {
        top: 15, right: 15, bottom: 15, left: 10
    },
    crossIcon: {
        width: '40%', height: '40%'
    },
    header: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 27,
        color: "#0a356d"
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 40,
    },
    button: {
        width: '65%',
        height: 50,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 10,
        backgroundColor: '#08356D',
    },
    input: {
        width: '85%', alignSelf: 'center'
    },
    dateTime: {
        width: '35%'
    },
    text: { left: 30 },
    amount: { left: 30 },
    margin: {
        marginTop: 20
    },
    custom: {
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})

export default BottomSheetStyle;