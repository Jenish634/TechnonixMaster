import _ from 'lodash';

import actionType from '../actionTypes';
const reducerName = actionType.reduxUpdateGroupState;
// account actions

export default {
    create: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `group`,
                   
                },
                actionType: actionType.group.create,
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
                    url: `group/${id}/photo`,
                    headers: { 'Content-Type': 'multipart/form-data' }
                },
                actionType: actionType.group.uploadImage,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    createConversation: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `group/conversation`,
                    
                },
                actionType: actionType.group.createConversation,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    getGroupConversation: (componentRequest) => {
        let id =_.get(componentRequest,'body.id')
        delete componentRequest.body
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `group/conversation/${id}/group`
                },
                actionType: actionType.group.groupView,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    list: (componentRequest) => {
        let id =_.get(componentRequest,'params.id')
        delete componentRequest.params
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `group/conversation/${id}`
                },
                actionType: actionType.group.list,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    update: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'put',
                    url: `group/${_.get(componentRequest,'body.id')}`,
                   
                },
                actionType: actionType.group.create,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    sendMessage: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `groupmessages`
                },
                actionType: actionType.group.sendMessage,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },

    getUserMessage: (componentRequest) => {
        let id =_.get(componentRequest,'body.id')
        delete componentRequest.body
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `/group/groupmessages/${id}`
                },
                actionType: actionType.group.messageList,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    getUserConversation: (componentRequest) => {
        let senderId =_.get(componentRequest,'body.senderId')
        delete componentRequest.body
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `groupmessages/conversation/${senderId}`
                },
                actionType: actionType.group.userConversationList,
                reducerName,
                dispatch,
                componentRequest, 
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    delete: (componentRequest) => {
        let id =_.get(componentRequest,'params.id')
        delete componentRequest.params
        
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'put',
                    url: `group/conversation/deleteuser/${id}`,
                   
                },
                actionType: actionType.group.delete,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    addmembers: (componentRequest) => {
        let id=_.get(componentRequest,'params.id')
        delete componentRequest.params.id
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'put',
                    url: `group/conversation/addmembers/${id}`,
                   
                },
                actionType: actionType.group.addMember,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    deleteConversation: (componentRequest) => {
        let id=_.get(componentRequest,'params.id')
        delete componentRequest.params.id
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'delete',
                    url: `group/${id}`
                },
                actionType: actionType.group.deleteChat,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    getWallet: (componentRequest) => {
        let id=_.get(componentRequest,'params.id')
        delete componentRequest.params.id
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `group/wallet/${id}`
                },
                actionType: actionType.group.getWallet,
                reducerName,
                dispatch,
                componentRequest, 
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    postWallet: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `group/wallet`,
                   
                },
                actionType: actionType.group.postWallet,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    
    
    
}