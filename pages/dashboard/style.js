import { StyleSheet } from "react-native";

const MessageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a356d',
        justifyContent: 'center'
    },
    messageView: {
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageText: {
        flex: 1,
        color: '#FFF0F5',
        fontSize: 25,
        fontWeight: '500'
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    imageView: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 20,
    },
    flatView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom:80
    },
    bottomView: {
        marginTop: 25,
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    bottomSubView: {
        marginTop: 11,
        height: 5,
        alignItems: 'center'
    },
    bottom: {
        backgroundColor: '#DCDCDC',
        width: 60,
        height: 5,
        borderRadius: 2
    },
    notificationImage: {
        height: 45,
        width: 48.16,
        resizeMode: 'contain'
    },
    time: {
        marginLeft: 10,
        color: '#08356D',
        fontSize: 12,
        fontWeight: '400'
    },
    notificationName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600'
    },
    notificationImageView: {
        marginTop: 12,
        flexDirection: 'row'
    },
    notificationMain: {
        height: 69,
    },
    nameView: {
        flex: 1,
        flexDirection: 'column',
    },
    name: {
        flexDirection: 'row'
    },
    timeView: {
        justifyContent: 'center',
    },
    secondFlat: {
        marginLeft: 58,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#C4C4C4'
    },
    count: {
        paddingLeft: 8,
        paddingRight: 8,
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    },
    countView: {
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#08356D',
        borderRadius: 12
    },
    message: {
        flex: 1,
        color: '#8C8C8C',
        fontSize: 12
    },
    messageView2: {
        flex: 1, marginTop: 3, marginLeft: 10, flexDirection: 'row'
    },
    iconText: {
        right: 10,
        color: 'white'
    },
    iconView: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cardText: {
        bottom: 3,
        fontSize: 33,
        fontWeight: 'bold',
        color: 'white'
    },
    cardText2: {
        top: 12,
        fontSize: 18,
        color: 'white'
    },
    paragraph: {
        marginTop: 10,
    },
    paragraphView: {
        flexDirection: 'row'
    }

})



export default MessageStyle;