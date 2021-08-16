import _ from 'lodash';
const key = 'userSession';

const getSessionDetails=(criteria)=>{
    const callback = _.get(criteria, 'callback', ()=>{});
    global.utils.secureStorage.get({
        key,
        callback,
        object: true
    });
};

const getSessionDetailsAsync=()=>{
    return new Promise(async resolve => {
        global.utils.secureStorage.get({
            key,
            callback: resolve,
            object: true
        });
    });
};

const setSessionDetails=(criteria)=>{
    const callback = _.get(criteria, 'callback', ()=>{});
    const data = _.get(criteria, 'data', ()=>{});
    global.utils.secureStorage.set({
        key,
        data,
        callback,
        object: true
    });
};

const setSessionDetailsAsync=(data)=>{
    return new Promise(async resolve => {
        global.utils.secureStorage.set({
            key,
            data,
            callback: resolve,
            object: true
        });
    });
};

const clearSessionDetailsAsync=()=>{
    return new Promise(async resolve => {
        global.utils.secureStorage.clear({
            key,
            callback: resolve
        });
    });

};

export default {getSessionDetails, setSessionDetails, getSessionDetailsAsync, clearSessionDetailsAsync, setSessionDetailsAsync};