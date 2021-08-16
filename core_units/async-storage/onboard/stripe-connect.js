import _ from 'lodash';
import common from './common';

const child_key = 'stripe_connect';

const getDetailsAsync=()=>{
    return new Promise(async resolve => {
        const your_story = await common.getOnboardDetailsAsync().then(data=>_.get(data, child_key, {}));
        resolve(your_story);
    });
};

const setDetailsAsync=async (data)=>{
    return new Promise(async resolve => {
        const your_story = await common.setOnboardDetailsAsync({
            child: child_key,
            data
        }).then(data=>data);
        resolve(your_story);
    });
};

const clearDetailsAsync=()=>{
    return new Promise(async resolve => {
        const your_story = await common.setOnboardDetailsAsync({
            child: child_key,
            data: {},
            ClearOld: true
        }).then(data=>data);
        resolve(your_story);
    });
};

export default {getDetailsAsync, clearDetailsAsync, setDetailsAsync};