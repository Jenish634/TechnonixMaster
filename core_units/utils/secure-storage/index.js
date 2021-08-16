import * as SecureStore from 'expo-secure-store';
import _ from 'lodash';

const get = async (criteria) => {
    try {
        const key = _.get(criteria, 'key');
        let data = await SecureStore.getItemAsync(key);
        data = _.chain(criteria).get('object', null).eq(true).value()? JSON.parse(data):data;
        const callback = _.get(criteria, 'callback', ()=>{});
        callback(data);
    } catch (e) {
      console.log('core-units->utils->secureStorage failed to get', e);
    }
};

const set = async (criteria) => {
    try {
        const key = _.get(criteria, 'key');
        let data = _.get(criteria, 'data', null);
        const callback = _.get(criteria, 'callback', ()=>{});
        data = _.chain(criteria).get('object', null).eq(true).value()? JSON.stringify(data):data;
        await SecureStore.setItemAsync(
            key,
            data
        );
        callback();
    } catch (e) {
        console.log('core-units->utils->secureStorage failed to set', e);
    }
};

const clear = async (criteria) => {
    try {
        const key = _.get(criteria, 'key');
        const callback = _.get(criteria, 'callback', ()=>{});
        await SecureStore.deleteItemAsync(key);
        callback();
    } catch (e) {
        console.log('core-units->utils->secureStorage failed to clear', e);
    }
};
export default {
    set,
    get,
    clear
}