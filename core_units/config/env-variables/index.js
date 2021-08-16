const MODES = {
    DEVELOPMENT: {
        API: {
            BASE_URL: 'https://txfinance.herokuapp.com/api/v1/',
            CLIENT_ID:'',
            CLIENT_SECRET:''
        },
        
    }
};

const getEnvVariables = () => {
    return MODES.DEVELOPMENT;
};

export default {
    ...getEnvVariables()
};
