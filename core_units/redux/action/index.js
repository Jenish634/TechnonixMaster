import settingsAction from './settings';
import accountAction from './account';
import contactsAction from './contact';
import chatsAction from './chat';
import groupAction from './group';
export const reduxAction = {
  settings: settingsAction,
  account: accountAction,
  contacts: contactsAction,
  chats: chatsAction,
  group: groupAction

};
export default reduxAction;