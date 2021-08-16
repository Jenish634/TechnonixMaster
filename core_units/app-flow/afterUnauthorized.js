import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import appEnvirontVariables from "../config/env-variables";

export default async function(criteria){
    const conditions = _.overEvery([
        criteria=>_.chain(criteria).get('api.response', null).eq(false).value(),
        criteria=>_.chain(criteria).get('api.status', null).eq(global.utils.httpStatusCodes.unauthorized).value(),
    ]);
    if(conditions(criteria)){
        const refreshToken = await global.asyncStorage.userSession.getSessionDetailsAsync().then(data=>_.get(data, 'data.refreshToken', ''));
        if(!_.isEmpty(refreshToken)){
            criteria.dispatch(global.redux.action.account.token({
                body: {
                    refreshToken,
                },
                callback: async (response, data)=>{
                    if(response){
                        await global.asyncStorage.userSession.setSessionDetailsAsync(data);
                        callPreviousAction(criteria);
                    }else{
                        await global.asyncStorage.userSession.clearSessionDetailsAsync();
                        // redirect to login screen
                        Actions.AccountLoginScreen();
                    }
                }
            }));
        }else{
            // redirect to login screen
            // Actions.AccountLoginScreen();
            console.log("cannot find refresh token so need to redirect user to login");
        }
    }
};

const callPreviousAction=async criteria=>{
    // looping back the action were the response become unauthorized
    
    const reduxAction = await global.redux.utils.getSpecificActionInstance(_.pick(criteria, ['reducerName', 'actionType'])).then(data=>data);
    if(_.isNull(reduxAction)){
        console.log(`Module: afterUnauthorized, Function: callPreviousAction, Message: Can't able to get specific action (${_.get(criteria, 'actionType')}) and reducer (${_.get(criteria, 'reducerName')})`);
    }else{
        const componentRequest = _.get(criteria, 'componentRequest', {});
        criteria.dispatch(reduxAction(componentRequest));
    }
};