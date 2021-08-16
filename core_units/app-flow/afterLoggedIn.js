import _ from 'lodash';
import { BackHandler } from 'react-native';

export default function(criteria){
    const conditions = _.overEvery([
        criteria=>_.chain(criteria).get('reducerName', null).eq(global.redux.actionTypes.reduxUpdateAccountState).value(),
        criteria=>_.chain(criteria).get('actionType', null).eq(global.redux.actionTypes.account.mobileLogin).value(),
    ]);
    if(conditions(criteria)){
        const apiResponse = _.get(criteria, 'api.response');
        if(apiResponse){
            const apiResponseData = _.get(criteria, 'data');
            global.asyncStorage.userSession.setSessionDetails({
                data: apiResponseData,
                callback: ()=>{
                        global.appFlow.validateUserProfile(criteria,apiResponseData);
                   
                }
            });
        }else{
            console.log('error in login', _.get(criteria, 'api.status'), _.get(criteria, 'data'));
        }
    }
}