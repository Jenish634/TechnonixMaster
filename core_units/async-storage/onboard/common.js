import _ from 'lodash';
const key = 'onboard';
const getOnboardDetailsAsync = ()=>{
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
    getOnboardDetailsAsync,
    setOnboardDetailsAsync: (criteria)=>{
        return new Promise(async resolve => {
            let onboard = await getOnboardDetailsAsync().then(data=>data);
            onboard = _.isEmpty(onboard)?{}:onboard;
            const previous_child_data = _.get(criteria, 'ClearOld', false)? {}: _.get(onboard, criteria.child, {});
            onboard[criteria.child] = {...previous_child_data, ...criteria.data};
            global.utils.secureStorage.set({
                key,
                data: onboard,
                callback: resolve,
                object: true
            });
        });
    }
};