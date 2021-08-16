import _ from 'lodash';

import middleware from '../api/middleware';

const LoadingInProgress = 'LoadingInProgress';

const isGeneralPropertyLoadingInProgress = (reducer_state, actionType) => _.get(reducer_state, `${actionType}${LoadingInProgress}`, false);

const startActionLoader = (dispatch, reducerName, actionType) => {
    dispatch({
        type: reducerName,
        data: { [actionType]: {}, [`${actionType}${LoadingInProgress}`]: true }
    });
};

const stopActionLoader = (dispatch, reducerName, actionType) => {
    dispatch({
        type: reducerName,
        data: { [`${actionType}${LoadingInProgress}`]: false }
    });
};

const changeStateDirectly = (requestOptions) => {
    // component request can have the following properties notification
    const actionType = _.get(requestOptions, 'actionType', "");
    const reducerName = _.get(requestOptions, 'reducerName', "");
    const dispatch = _.get(requestOptions, 'dispatch', () => { });
    const value = _.get(requestOptions, 'actionType', "") == 'schdulePerview' ? _.get(requestOptions, 'componentRequest', null) : _.get(requestOptions, 'componentRequest.value', null);
    const componentRequest = _.get(requestOptions, 'componentRequest', {});
    dispatch({
        type: reducerName,
        data: { [actionType]: value }
    });
    middleware(
        {
            dispatch,
            reducerName,
            actionType,
            data: value,
            componentRequest
        }
    );
}

const getSpecificActionInstance = async criteria => {
    return new Promise(async resolve => {
        const reducerName = _.get(criteria, 'reducerName', null);
        const actionType = _.get(criteria, 'actionType', null);
        const emptyResult = null;
        switch (reducerName) {
            case global.redux.actionTypes.reduxUpdateAccountState:
                resolve(_.get(global.redux.action.account, actionType, emptyResult));
                break;
              default:
                resolve(emptyResult);
                break;
        }
    });
}

export const reduxUtils = {
    LoadingInProgress,
    isGeneralPropertyLoadingInProgress,
    startActionLoader,
    stopActionLoader,
    changeStateDirectly,
    getSpecificActionInstance
};