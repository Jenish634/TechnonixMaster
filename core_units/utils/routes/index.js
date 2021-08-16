import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

const navigateToAction=(criteria)=>{
    const key = _.isString(criteria)? criteria: _.get(criteria, 'key');
    const params = _.get(criteria, 'params', {});
    const push_on_duplicate_key = _.get(criteria, 'push_on_duplicate_key', true);
    const conditions = _.overEvery([
        () => _.chain(Actions).get(key).isFunction().value(),
        () => !push_on_duplicate_key?!_.eq(Actions.currentScene, key): push_on_duplicate_key
    ]);
    if(conditions()){
        Actions[key](params);
    }
};

export default {
    navigateToAction
};