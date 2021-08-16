import _ from 'lodash';
import actionTypes from './actionTypes';

const initialState = {
  // settings state
  [actionTypes.settings.name]: {
    [actionTypes.settings.isAppReady]: false,
  },

  // account state
  [actionTypes.account.name]: {
    [actionTypes.account.mobileLogin]: {},
    [actionTypes.account.register]: {},
    [actionTypes.account.profile]: {},
  },


  // contact state
  [actionTypes.contacts.name]: {
    [actionTypes.contacts.list]: {},
  },

   // contact state
   [actionTypes.chats.name]: {
    [actionTypes.chats.createConversation]: {},
  },

   // contact state
   [actionTypes.group.name]: {
    [actionTypes.group.create]: {},
  },


  
}



const reduxUpdateSettingsState = (state, action) => {
  return {
    ...state, [actionTypes.settings.name]:
    {
      ...state[actionTypes.settings.name],
      ..._.get(action, 'data', null)
    }
  };
}

const reduxUpdateAccountState = (state, action) => {
  return {
    ...state, [actionTypes.account.name]:
    {
      ...state[actionTypes.account.name],
      ..._.get(action, 'data', null)
    }
  };
}


const reduxUpdateContactsState = (state, action) => {
  return {
    ...state, [actionTypes.contacts.name]:
    {
      ...state[actionTypes.contacts.name],
      ..._.get(action, 'data', null)
    }
  };
}
const reduxUpdateChatsState = (state, action) => {
  return {
    ...state, [actionTypes.chats.name]:
    {
      ...state[actionTypes.chats.name],
      ..._.get(action, 'data', null)
    }
  };
}

const reduxUpdateGroupState = (state, action) => {
  return {
    ...state, [actionTypes.group.name]:
    {
      ...state[actionTypes.group.name],
      ..._.get(action, 'data', null)
    }
  };
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.reduxUpdateSettingsState:
      return reduxUpdateSettingsState(state, action);
    case actionTypes.reduxUpdateAccountState:
      return reduxUpdateAccountState(state, action);
      case actionTypes.reduxUpdateContactsState:
      return reduxUpdateContactsState(state, action);
      case actionTypes.reduxUpdateChatsState:
      return reduxUpdateChatsState(state, action);
      case actionTypes.reduxUpdateGroupState:
      return reduxUpdateGroupState(state, action);
    default:
      return state
  }
}

export default reducer;
