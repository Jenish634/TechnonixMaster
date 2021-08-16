export const reduxActionTypes = {
  
  // please have all settings actions types const in the below settings property
  settings: {
    name: 'settings',
    isAppReady: 'isAppReady',
    canAccessHostDashboard: 'canAccessHostDashboard',
    chatKittyCurrentUserData: 'chatKittyCurrentUserData'
  },

  // please have all account actions types const in the below account property
  account: {
    name: 'account',
    mobileLogin: 'mobileLogin',
    token: 'token',
    profile:'profile',
    register:'register',
    uploadImage:'uploadImage',
    postProfile:'postProfile',
    forgetpasswordEmail:'forgetpasswordEmail',
    forgetpasswordMobile:'forgetpasswordMobile',
    otpVerify:'otpVerify',
    resettoken:'resettoken'



  },
  contacts:{
    name:'contacts',
    list:'list'
  },
  group:{
    name:'group',
    list:'list',
    create:'create',
    groupView:'groupView',
    uploadImage:'uploadImage',
    messageList:'messageList',
    userConversationList:'userConversationList',
    createConversation:'createConversation',
    checkConversation:'checkConversation',
    sendMessage:'sendMessage',
    delete:'delete',
    addMember:'addMember',
    deleteChat:'deleteChat',
    postWallet:'postWallet',
    getWallet:'getWallet',

    
  },
  chats:{
    name:'contacts',
    messageList:'messageList',
    userConversationList:'userConversationList',
    createConversation:'createConversation',
    checkConversation:'checkConversation',
    sendMessage:'sendMessage',
    deleteChat:'deleteChat'

  },
// update specific action state
  reduxUpdateSettingsState: 'reduxUpdateSettingsState',
  reduxUpdateAccountState: 'reduxUpdateAccountState',
  reduxUpdateContactsState: 'reduxUpdateContactsState',
  reduxUpdateChatsState: 'reduxUpdateChatsState',
  reduxUpdateGroupState: 'reduxUpdateGroupState',
  
};
export default reduxActionTypes;