import _ from 'lodash';
const key = 'appSettings';
const getAppSettingsDetailsAsync = ()=>{
    return new Promise(async resolve => {
        global.utils.secureStorage.get({
            key,
            callback: resolve,
            object: true
        });
    });
};
export default {
    key,
    getAppSettingsDetailsAsync,
    setAppSettingsDetailsAsync: (criteria)=>{
        return new Promise(async resolve => {
            let appSettings = await getAppSettingsDetailsAsync().then(data=>data);
            appSettings = _.isEmpty(appSettings)?{}:appSettings;
            const previous_child_data = _.get(criteria, 'ClearOld', false)? {}: _.get(appSettings, criteria.child, {});
            appSettings[criteria.child] = {...previous_child_data, ...criteria.data};
            global.utils.secureStorage.set({
                key,
                data: appSettings,
                callback: resolve,
                object: true
            });
        });
    }
};