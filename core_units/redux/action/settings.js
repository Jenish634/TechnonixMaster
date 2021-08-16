import _ from 'lodash';

import actionType from '../actionTypes';
import { reduxUtils } from '../settings';
const reducerName = actionType.reduxUpdateSettingsState;
// host actions

export default {
    // this action will update app ready status
    setAppReadyStatus: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                actionType: actionType.settings.isAppReady,
                reducerName,
                dispatch,
                componentRequest,
            };
            reduxUtils.changeStateDirectly(requestOptions);
        }
    },
    
}