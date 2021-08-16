const { default: coreUnitsRedux } = require("../redux");

const { default: coreUnitsAPI } = require("../api");

const { default: coreUnitsUtils } = require("../utils");

const { default: coreUnitsAsyncStorage } = require("../async-storage");

const { default: coreUnitsAppFlow } = require("../app-flow");

const { default: coreUnitsComponents } = require("../components");

const { default: coreUnitsConfig } = require("../config");



global.redux = {
    ...coreUnitsRedux
};

global.api = {
    ...coreUnitsAPI
};

global.utils = {
    ...coreUnitsUtils
};

global.asyncStorage = {
    ...coreUnitsAsyncStorage
};

global.appFlow = {
    ...coreUnitsAppFlow
};

global.components = {
    ...coreUnitsComponents
};

global.config = {
    ...coreUnitsConfig
};

