import _ from 'lodash';
const myToken = async () => {
    const data = await global.asyncStorage.userSession.getSessionDetailsAsync().then(data => data);
}

const clearAllAsyncStorage = async () => {
    // please write all the async clear funcs here
    await global.asyncStorage.hostOnboard.yourStory.clearDetailsAsync();
    await global.asyncStorage.hostOnboard.yourFollowing.clearDetailsAsync();
    await global.asyncStorage.hostOnboard.stripeConnect.clearDetailsAsync();
    await global.asyncStorage.appSettings.termsOfService.clearDetailsAsync();

};
const clearLoggedInUserSession = () => {
    global.asyncStorage.userSession.clearSessionDetailsAsync();

};
export default async function (criteria) {
    // we can write what ever code here. That we log after each api call.
    // clearAllAsyncStorage();
    // clearLoggedInUserSession();
    // myToken();
}