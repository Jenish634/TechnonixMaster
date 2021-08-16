import _ from 'lodash';

import actionType from '../actionTypes';
const reducerName = actionType.reduxUpdateChatsState;
// account actions

export default {
    createConversation: (componentRequest) => {
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'post',
                    url: `chat/conversation`
                },
                actionType: actionType.chats.createConversation,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    conversationCheck: (componentRequest) => {
        let senderId =_.get(componentRequest,'body.senderId')
        let receverId =_.get(componentRequest,'body.receverId')
        delete componentRequest.body
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `chat/conversation/${senderId}/${receverId}`
                },
                actionType: actionType.chats.checkConversation,
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
                    url: `chat/message`
                },
                actionType: actionType.chats.sendMessage,
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
                    url: `/messages?conversationId=${id}`
                },
                actionType: actionType.chats.messageList,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    getUserConversation: (componentRequest) => {
        let id =_.get(componentRequest,'params.senderId')
        delete componentRequest.params
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'get',
                    url: `chat/conversation/${id}`
                },
                actionType: actionType.chats.userConversationList,
                reducerName,
                dispatch,
                componentRequest, 
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    delete: (componentRequest) => {
        let id =_.get(componentRequest,'body.id')
        delete componentRequest.body
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'delete',
                    url: `chat/message/${id}`
                },
                actionType: actionType.chats.sendMessage,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    deleteConversation: (componentRequest) => {
        let id =_.get(componentRequest,'params.id')
        delete componentRequest.params
        return dispatch => {
            const requestOptions = {
                axiosParams: {
                    method: 'delete',
                    url: `chat/conversation/${id}`
                },
                actionType: actionType.chats.sendMessage,
                reducerName,
                dispatch,
                componentRequest,
                authorization:true

            };
            global.api.requestAPI(requestOptions);
        }
    },
    
    
}