export default async ()=>{
    await global.asyncStorage.userSession.clearSessionDetailsAsync();
    global.utils.routes.navigateToAction('AccountLoginScreen');
};