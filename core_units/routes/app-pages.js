// Define application pages imports here below
import splashScreen from '../../pages/application/splash-screen';
import offlineScreen from '../../pages/application/offline-screen';

// Define application pages imports here below
import LoginScreen from '../../pages/account/login';
import RegisterScreen from '../../pages/account/register';
import ForgotPasswordScreen from '../../pages/account/forgot-password';
import OTPScreen from '../../pages/account/forgot-password/otp-screen';
import newPasswordScreen from '../../pages/account/forgot-password/new-password-screen';
// Define dashboard pages imports here below
import dashboard from '../../pages/dashboard';
import updateProfile from '../../pages/profile';
import ProfileView from '../../pages/profile/profile-view';
import contactList from '../../pages/contact-list';
import chatsList from '../../pages/chat-list/list';
import privateChat from '../../pages/chat-list/private-view';
import newContactList from '../../pages/contact-list/list-new';
import newchat from '../../pages/chat-list/private-view/private-chat';
import AddFund from '../../pages/dashboard/AddFund';
import ChatScreen from '../../pages/group-chat/chat-screen';
import GroupCreationScreen from '../../pages/group-chat/create';
import AddParticipantScreen from '../../pages/group-chat/constact-list';
import groupMembersList from '../../pages/group-chat/group-members';
import groupChatScreen from '../../pages/group-chat/chat-screen';
import groupInfo from '../../pages/group-chat/group-members/menber-info';
import addMembergroup from '../../pages/group-chat/add-member';
import faq from '../../pages/static-pages/faq';
import helpCenter from '../../pages/static-pages/help-center';
import report from '../../pages/static-pages/report';
import termsPrivacy from '../../pages/static-pages/terms-privacy';

export default {
    application: {
        splashScreen,
        offlineScreen
    },
    account: {
        LoginScreen,
        RegisterScreen,
        ForgotPasswordScreen,
        OTPScreen,
        newPasswordScreen,



       
    },
    dashboard: {
        home: dashboard,
        profile: updateProfile,
        profileView:ProfileView,
        contactList:contactList,
        chatsList:chatsList,
        privateChat:privateChat,
        newContactList:newContactList,
        newChat:newchat,
        ChatScreen:ChatScreen,
        GroupCreationScreen:GroupCreationScreen,
        AddParticipantScreen:AddParticipantScreen,
        groupChatScreen:groupChatScreen,
        groupMembersList:groupMembersList,
        groupInfo:groupInfo,
        addMembergroup:addMembergroup,
        faq,
        helpCenter,
        report,
        termsPrivacy,
        AddFund


        
        
    },
};






