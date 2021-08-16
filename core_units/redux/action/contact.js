import _ from 'lodash';

import actionType from '../actionTypes';
const reducerName = actionType.reduxUpdateContactsState;
// account actions

export default {
    list: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `profile/all`
                },
                actionType: actionType.contacts.list,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    
    
}