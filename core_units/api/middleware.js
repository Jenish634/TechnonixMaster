
export default (criteria)=>{
    global.appFlow.afterBooted(criteria);
    global.appFlow.afterLoggedIn(criteria);
    global.appFlow.afterUnauthorized(criteria);
    global.appFlow.testLog(criteria);
}