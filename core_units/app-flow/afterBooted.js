import _ from 'lodash';
import { BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default async function (criteria) {
    // console.log('logged here in afterBooted', criteria);
    const conditions = _.overEvery([
        criteria => _.chain(criteria).get('reducerName', null).eq(global.redux.actionTypes.reduxUpdateSettingsState).value(),
        criteria => _.chain(criteria).get('actionType', null).eq(global.redux.actionTypes.settings.isAppReady).value(),
        criteria => _.chain(criteria).get('data', null).eq(true).value(),
    ]);
    if (conditions(criteria)) {
        // need to check the user session is available
        const userSession = await global.asyncStorage.userSession.getSessionDetailsAsync().then(data => data);

        if (!_.chain(userSession).get('data.accessToken', '').isEmpty().value()) {
                global.appFlow.validateUserProfile(criteria,userSession);
                
        } else {
            // redirect to login screen
            Actions.AccountLoginScreen();
        }
    }
}