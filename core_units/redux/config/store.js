import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import appReducer from '../reducer';

const rootReducer = combineReducers({
    app: appReducer,
});

const configStore = (initialState = {}) => {
    const middlewares = [thunk];
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

export default configStore;