import _ from 'lodash';

import actionType from '../actionTypes';
const reducerName = actionType.reduxUpdateAccountState;
// account actions

export default {
    // get profile data of the current logged in account
    mobileLogin: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `auth/login`
                },
                actionType: actionType.account.mobileLogin,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    token: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `/renewtoken`
                },
                actionType: actionType.account.token,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    profile: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `profile`
                },
                actionType: actionType.account.profile,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    postProfile: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: _.get(componentRequest,'body.id')?'put':'post',
                    url:  _.get(componentRequest,'body.id')?`profile/${_.get(componentRequest,'body.id')}`:'profile'
                },
                actionType: actionType.account.postProfile,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
        
    },
    updatePhoto: (componentRequest) => {
        let id = _.get(componentRequest,'params.id')
        delete componentRequest.params
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'put',
                    url: `profile/${id}/photo`,
                    headers: { 'Content-Type': 'multipart/form-data' }
                },
                actionType: actionType.account.uploadImage,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    register: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `auth/register`
                },
                actionType: actionType.account.register,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    emailForgotpassword: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `auth/forgetpassword/email`
                },
                actionType: actionType.account.forgetpasswordEmail,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    mobileForgotpassword: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `auth/forgetpassword/mobile`
                },
                actionType: actionType.account.forgetpasswordMobile,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    resetpassword: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'put',
                    url: `auth/resetpassword/${_.get(componentRequest,'params.resettoken')}`
                },
                actionType: actionType.account.resettoken,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    otpVerify: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `auth/otpverify`
                },
                actionType: actionType.account.otpVerify,
                reducerName,
                dispatch,
                componentRequest

            };
            global.api.requestAPI(requestOptions);
        }
    },
    
}