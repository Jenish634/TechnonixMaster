import _ from 'lodash';

const initializeFuncIfExist = (instance, path) => {
    if (_.chain(instance).get(path).isFunction().value()) {
        _.get(instance, path)();

    }
}
export default {
    initializeFuncIfExist
};