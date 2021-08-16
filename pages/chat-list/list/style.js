import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    QRcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    tabIcon: {
        fontSize: responsiveFontSize(3.3),
        color: '#742e02',
    },
    TextBold: {
        fontWeight: 'bold'
    },
    appTabTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'MontserratSemiBold',
        // textTransform: 'uppercase',
        marginBottom: responsiveWidth(0),
        marginTop: responsiveWidth(1),
    },
    appTabContainer: {
        width: responsiveWidth(100),
        overflow: 'visible',
        flex: 1,
        paddingVertical: responsiveHeight(1.6),
        paddingHorizontal: responsiveWidth(6),
        position: 'relative',
        maxWidth: '100%',
        fontFamily: 'MontserratSemiBold',
        backgroundColor: '#fefefe',
        display: 'flex',
    },
    appTabContent: {
        height: responsiveHeight(70),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 5.27,
        elevation: 10,
        borderRadius: 5,
    },
    selectPicker: {
        backgroundColor: "#eee",
        borderRadius: 10,
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
        width: responsiveHeight(15),
        height: responsiveHeight(15),
        resizeMode: "contain",
        marginLeft: responsiveWidth(2),
    },
    ImageUploadContainer: {
        flexDirection: 'row'
    },
    appButtonContainer: {
        backgroundColor: "#d75604",
        borderRadius: 25,
        paddingVertical: responsiveHeight(1.6),
        paddingHorizontal: responsiveWidth(7),
        minWidth: responsiveWidth(35),
    },
    appButtonText: {
        fontSize: responsiveFontSize(2.2),
        color: "#fff",
        alignSelf: "center",
        textTransform: 'uppercase',
    },
    WelcomeScreenButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: responsiveHeight(6),
        marginBottom: responsiveHeight(2),
    },
    SubscriptionTabInnerTitle: {
        fontSize: responsiveFontSize(2.2),
        color: "#000",
        alignSelf: "center",
        textTransform: 'uppercase',
        paddingVertical: responsiveHeight(1.6),
        paddingHorizontal: responsiveWidth(7),
        backgroundColor: '#ededed',
        fontFamily: 'MontserratSemiBold',
        justifyContent: 'flex-start',
    },
    SubscriptionProductInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: responsiveHeight(2),
        alignItems: 'center'
    },
    SubscriptionProductInfoContainerLeft: {
        display: 'flex',
        flexDirection: 'row'
    },
    SubscriptionProductInfoContainerLeftNameDate1: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 5,
        paddingRight: 30
    },
    SubscriptionProductInfoContainerLeftNameDate: {
        display: 'flex',
        flexDirection: 'column'
    },
    SubscriptionProductInfoContainerLeft1: {
        display: 'flex',
        flexDirection: 'row',
        flex: 3
    },
    SubscriptionProductInfoImg: {
        width: responsiveHeight(8),
        height: responsiveHeight(5),
        resizeMode: "contain",
        borderRadius:60
    },
    SubscriptionProductInfoTextBold: {
        fontSize: responsiveFontSize(1.9),
        color: "#000",
        fontFamily: 'RobotoBold',
    },
    experienceCardText: {
        fontFamily: 'RobotoRegular',
        fontSize: responsiveFontSize(1.8),
        paddingVertical: responsiveWidth(1),
    },
    SubscriptionProductInfoTextLight: {
        fontSize: responsiveFontSize(1.5),
        color: "#000",
        textTransform: 'uppercase',
        fontFamily: 'RobotoRegular',
    },
    SubscribersList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsiveHeight(.6),
    },
    SubscribersListName: {
        fontSize: responsiveFontSize(2.1),
        color: "rgba(0, 0, 0, 0.5)",
    },
    SubscribersListIcon: {
        fontSize: responsiveFontSize(4),
        color: "rgba(0, 0, 0, 0.5)",
        marginRight: 5
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: responsiveHeight(0),
    },
    checkbox: {
        alignSelf: "center",
        // width: responsiveWidth(10),
        // height: responsiveWidth(4)
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    },
    checkboxLabel: {
        margin: 8,
        color: '#707070',
        fontSize: responsiveFontSize(2.1),
    },
    FormSubmitButton: {
        textAlign: 'right',
        fontSize: responsiveFontSize(2),
        textTransform: 'uppercase',
        color: '#000',
        marginTop: responsiveHeight(.5),
        fontFamily: 'RobotoMedium',
    },
    FormCard: {
        padding: responsiveWidth(2),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 5.27,
        elevation: 10,
        borderRadius: 5,
    },
    tabIcon: {
        fontSize: responsiveFontSize(3.3),
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabContent: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'visible',
        paddingBottom: responsiveHeight(7),
    },

    scheduleExperiencesTabContainer: {
        flex: 1,
        // height: responsiveHeight(79),
        backgroundColor: '#FFF',
        overflow: 'visible'
    },
    scheduleExperiencesTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'MontserratMedium',
        marginTop: responsiveHeight(1.5),
        textAlign: 'center',
    },
    scheduleExperiencesSecondaryTab: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'visible',
    },
    tabContentSecondary: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 20,
        overflow: 'visible',
        display: 'flex'
    },
    ScheduleSwitchStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    ScheduleSwitchLabel: {
        fontSize: responsiveFontSize(2.1),
        color: "#000",
        opacity: .6,
        marginTop: 8,
        marginLeft: 8
    },
    tabContentSecondaryBox: {
        // position: 'relative',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.01,
        shadowRadius: 4.65,
        elevation: 8,
        // height: responsiveHeight(48),
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingVertical: responsiveHeight(1.6),
        paddingHorizontal: responsiveWidth(3),
    },
    PreviewProductInfoImg: {
        width: '100%',
        resizeMode: "cover",
    },
    IntermediateBadge: {
        backgroundColor: '#ff6900',
        borderRadius: 25,
        elevation: 0,
        color: '#fff',

        fontSize: responsiveFontSize(2),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        textTransform: 'uppercase',
    },
    GoLiveButton: {
        marginTop: responsiveHeight(1.5),
        // backgroundColor: '#ff6900',
        borderRadius: 25,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        color: '#fff',
        fontSize: responsiveFontSize(2.1),
        textAlign: 'center',
        minWidth: responsiveWidth(20),
        fontFamily: 'RobotoMedium',
    },
    ReadioCard: {
        backgroundColor: '#fff',
        shadowColor: '#afafaf',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
        marginHorizontal: responsiveWidth(1),
        marginVertical: responsiveWidth(1.5),
        padding: responsiveWidth(3),
        borderRadius: 5
    },
    ReadioCardTimeContainer: {
        width: '90%',
    },
    readioBtnIcon: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    clearButton: {
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 0,
        color: '#000',
        fontFamily: 'RobotoRegular',
        fontSize: responsiveFontSize(2),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        borderColor: '#d1d1d1',
        borderWidth: 1,
        borderStyle: 'solid',
        width: responsiveWidth(16),
        height: responsiveHeight(5),
        marginTop: responsiveHeight(1),
    },
    TemplatesTabBox: {
        width: '100%',
        height: responsiveHeight(63),
        backgroundColor: '#fff',
        shadowColor: "#fff",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 5.46,
        elevation: 9,
        marginTop: responsiveHeight(1),
        borderRadius: 4
    },
    ApprovedBadge: {
        marginTop: responsiveHeight(1.5),
        backgroundColor: '#009b0a',
        borderRadius: 25,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        color: '#fff',
        fontSize: responsiveFontSize(2.1),
        textAlign: 'center',
        marginBottom: responsiveHeight(1),
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: responsiveHeight(0),
    },
    SwitchStyle: {
        justifyContent: 'flex-start',
        textAlign: 'left',
        alignItems: 'flex-start',
    },
    PayOutAmount: {
        color: '#000',
        fontSize: responsiveFontSize(4),
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5
    },
    PayOutAmountSub: {
        color: '#000',
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center',
        opacity: .5
    },
    PayOutAmountDate: {
        color: '#000',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
    },
    appTabContainerStyle: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#e85d04',
        paddingVertical: responsiveHeight(1.6),
        height: responsiveHeight(7),
    },
    FooterToolbar: {
        width: '100%',
        backgroundColor: '#ccc',
        flexDirection: 'row'
    },
    ExperienceProfileImg: {
        width: responsiveWidth(13),
        height: responsiveWidth(13),
        resizeMode: "cover",
        borderRadius: 50
    },
    CommentsCheckbox: {
        backgroundColor: '#707070',
        borderRadius: 25,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(1),
        color: '#000',
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center',
        minWidth: responsiveWidth(20),
        marginRight: 5,
        fontFamily: 'RobotoMedium',
    },
    CommentsCheckboxActive: {
        backgroundColor: '#ff6900',
    },
    BoxDisable: {
        opacity: .7
    },
    MaterialImage: {
        width: '100%',
        resizeMode: 'contain'
    },
    InterestedImage: {
        resizeMode: 'contain',
        marginRight: 10
    },
    experienceCardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "space-between",
    },
    experienceCardText: {
        fontFamily: 'RobotoRegular',
        fontSize: responsiveFontSize(1.8),
        paddingVertical: responsiveWidth(1),
    },
    experienceCardIcon: {
        fontSize: responsiveFontSize(2.5),
        color: '#facb2b',
        paddingHorizontal: responsiveWidth(1),
    },
    buttonActive: {
        alignItems: "center",
        backgroundColor: "#E85D04",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 30,
        marginTop: responsiveWidth(2),
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'RobotoRegular',
    },
    IntermediateBadge: {
        backgroundColor: '#ff6900',
        borderRadius: 25,
        elevation: 0,
        color: '#fff',
        fontFamily: 'RobotoRegular',
        fontSize: responsiveFontSize(2),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        textTransform: 'uppercase',
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

    HeaderLeftLogo: {
        height: 60,
        width: 60,
        resizeMode: "cover",
        marginLeft: responsiveWidth(1),
        borderRadius: 100,
        marginTop: 8,
    },
    anchorStyle: {
        backgroundColor: 'blue',
    },
    anchorLineView: {
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        height: 1,
        backgroundColor: '#f2f2f2'
    },
    anchorArrow: {
        width: 25,
        height: 25,
    },
    anchorRowView: {
        marginHorizontal: 50,
        paddingVertical: 12,
        backgroundColor: 'white'
    },
    anchorArrow: {
        width: 25,
        height: 25,
    },
    anchorRowHolderView: {
        marginTop: 325,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 0.4
    },
    anchorHeadView: {
        marginHorizontal: 20,
        marginTop: 200,
        width: '50%',
        backgroundColor: 'transparent'
    },
});