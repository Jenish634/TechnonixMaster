import _ from 'lodash';
import common from './common';

const child_key = 'terms_of_service';
const child_defaults={agree: null, disagree: null, responded: false, disagree_feedback: [], backPress: true};
const getDetailsAsync=()=>{
    return new Promise(async resolve => {
        let your_story = await common.getAppSettingsDetailsAsync().then(data=>_.get(data, child_key, {}));
        your_story = {...child_defaults, ...your_story};
        resolve(your_story);
    });
};

const setDetailsAsync=async (data)=>{
    return new Promise(async resolve => {
        const your_story = await common.setAppSettingsDetailsAsync({
            child: child_key,
            data: _.pick(data, _.keys(child_defaults))
        }).then(data=>data);
        resolve(your_story);
    });
};

const clearDetailsAsync=()=>{
    return new Promise(async resolve => {
        const your_story = await common.setAppSettingsDetailsAsync({
            child: child_key,
            data: {},
            ClearOld: true
        }).then(data=>data);
        resolve(your_story);
    });
};

export default {getDetailsAsync, clearDetailsAsync, setDetailsAsync};