import _ from 'lodash';
import { Platform } from 'react-native';

import axios from './axios-config';
import middleware from './middleware';

export default async (requestOptions) => {
    // component request can have the following properties notification , callback, params, body
    const callback = _.get(requestOptions, 'componentRequest.callback', ()=>{});
    const actionType = _.get(requestOptions, 'actionType', "");
    const reducerName = _.get(requestOptions, 'reducerName', "");
    const dispatch = _.get(requestOptions, 'dispatch', ()=>{});
    const componentRequest = _.get(requestOptions, 'componentRequest', {});
    const authorization = _.get(requestOptions, 'authorization', false); 
    let axiosParams = {
        withCredentials: true,
        params: _.get(requestOptions, 'componentRequest.params', {}),
        data: _.get(requestOptions, 'componentRequest.body', {}),
        ..._.get(requestOptions, 'axiosParams', {}),
    };
    
    axiosParams.headers = { 'Content-Type': 'application/json', ..._.get(axiosParams, 'headers', {}) };
    if(authorization){
        const access_token = await global.asyncStorage.userSession.getSessionDetailsAsync().then(data=> _.get(data, 'data.accessToken', ''));
        axiosParams.headers.Authorization = `Bearer ${access_token}`;
    }
    // start loader for the property
    global.redux.utils.startActionLoader(dispatch, reducerName, actionType);
    axiosParams = _.pickBy(axiosParams, property=>!_.isEmpty(property));
    console.log('axiosParams',`${Platform.OS}----------------------------------------- ${axiosParams}`);
    axios(axiosParams)
    .then(response => {
        dispatch({
            type: reducerName,
            data: {[actionType]: _.get(response, 'data', {})}
        });
        callback(true, _.get(response, 'data', {}));
        middleware(
            {
                dispatch,
                reducerName,
                actionType,
                data: _.get(response, 'data', {}),
                api: {
                    response: true,
                    status: _.get(response, 'status', null)
                },
                componentRequest
            }
        );
    })
    .catch(error => { 
        callback(false, _.get(error, 'response.data', {}));
        middleware(
            {
                dispatch,
                reducerName,
                actionType,
                data: _.get(error, 'response.data', {}),
                api: {
                    response: false,
                    status: _.get(error, 'response.status', null)
                },
                componentRequest
            }
        );
    })
    .finally(()=>{
    // stop loader for the property
    global.redux.utils.stopActionLoader(dispatch, reducerName, actionType);
    });
}

