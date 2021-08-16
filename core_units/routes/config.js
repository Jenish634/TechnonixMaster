import _ from 'lodash';

import appPages from './app-pages';

export default [
    {
        key: "ApplicationSplashScreen",
        component: appPages.application.splashScreen,
        hideNavBar: true,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0 }
    },
    {
        key: "ApplicationOfflineScreen",
        component: appPages.application.offlineScreen,
        hideNavBar: true,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0 }
    },
    {
        key: "AccountLoginScreen",
        component: appPages.account.LoginScreen,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0, color: '#000' },
        hideNavBar: true,
    },
    {
        key: "AccountRegisterScreen",
        component: appPages.account.RegisterScreen,
        hideNavBar: true,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0 }
    },
   
    {
        key: "Dashboard",
        // hideLeftHeader:true,
        // hideRightHeader:true,
        hideNavBar: true,
        component: appPages.dashboard.home,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0,border:25},
        dashboardWrapper: true,
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        },
        titleStyle:{color:'white',textAlign:'left', marginLeft: -40},
        
    },

    {
        key: "profile",
        component: appPages.dashboard.profile,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "profileView",
        headerImage:false,
        component: appPages.dashboard.profileView,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "contactsList",
        component: appPages.dashboard.contactList,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: false,
        hideRightHeader:true,
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "privateChat",
        component: appPages.dashboard.newChat,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true, 
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideFooter:true,
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "chatsList",
        component: appPages.dashboard.chatsList,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true, 
        headerType :true,
        notification:true,
        hideNavBar: true,
        hideRightHeader:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "Contacts",
        component: appPages.dashboard.newContactList,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "AddParticipantScreen",
        component: appPages.dashboard.AddParticipantScreen,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideFooter:true,
        hideRightHeader:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "GroupCreationScreen",
        component: appPages.dashboard.GroupCreationScreen,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideFooter:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "ChatScreen",
        component: appPages.dashboard.groupChatScreen,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideFooter:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "groupChatScreen",
        component: appPages.dashboard.groupChatScreen,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideFooter:true,
        hideRightHeader:true,
        hideNavBar: true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "groupMembersList",
        component: appPages.dashboard.groupMembersList,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: false,
        hideFooter:true,
        hideRightHeader:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "groupInfo",
        component: appPages.dashboard.groupInfo,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideFooter:true,
        hideRightHeader:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "addMembergroup",
        component: appPages.dashboard.addMembergroup,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    {
        key: "faq",
        component: appPages.dashboard.faq,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: false,
        hideRightHeader:true,
        hideLeftHeader:false,
        titleStyle:{color:'white'},
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        }
        
    },
    
    {
        key: "helpCenter",
        component: appPages.dashboard.helpCenter,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: false,
        hideRightHeader:true,
        hideLeftHeader:false,
        titleStyle:{color:'white'}, options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        },
        
        
    },
    {
        key: "report",
        component: appPages.dashboard.report,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: false,
        hideRightHeader:true,
        hideLeftHeader:false,
        titleStyle:{color:'white'}, 
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        },
        
        
    },
    {
        key: "termsPrivacy",
        component: appPages.dashboard.termsPrivacy,
        navigationBarStyle: { backgroundColor: '#0a356d', elevation: 0},
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: false,
        hideRightHeader:true,
        hideLeftHeader:false,
        titleStyle:{color:'white'}, 
        options: {
            headerTitle: () => alert('This is a headerTitle!'),
            headerRight: () => alert('This is a headerTitle!'),
        },
        
        
    },
    {
        key: "AccountForgotScreen",
        component: appPages.account.ForgotPasswordScreen,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0, color: '#000' },
        hideNavBar: false,
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideLeftHeader:false,
        hideFooter:true
    },
    {
        key: "AccountOTPScreen",
        component: appPages.account.OTPScreen,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0, color: '#000' },
        hideNavBar: false,
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideLeftHeader:false,
        hideFooter:true
    },
    {
        key: "AccountNewPasswordScreen",
        component: appPages.account.newPasswordScreen,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0, color: '#000' },
        hideNavBar: false,
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideLeftHeader:false,
        hideFooter:true
    },
    {
        key: "AddFundScreen",
        component: appPages.dashboard.AddFund,
        navigationBarStyle: { backgroundColor: '#ffffff', elevation: 0, color: '#000' },
        hideNavBar: false,
        dashboardWrapper: true,
        headerType :true,
        hideNavBar: true,
        hideRightHeader:true,
        hideLeftHeader:false,
        hideFooter:true
    },

   
];