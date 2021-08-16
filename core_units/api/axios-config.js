import axios from "axios";
import appEnvirontVariables from "../config/env-variables";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: appEnvirontVariables.API.BASE_URL
});

export default instance;