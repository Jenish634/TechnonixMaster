import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

export default function (criteria,userData) {
    // redirect to dashboard
    const redirectuserToDashboard = async () => {
        // getting terms of service data from appSettings async storage.
        
            // Please redirect to your specific working page. eg: Actions.{key}();
            Actions.Dashboard({ });
        
    };
    const redirectuserToProfile = async () => {
        // getting terms of service data from appSettings async storage.
        
            // Please redirect to your specific working page. eg: Actions.{key}();
            Actions.profile({ title:'Profile' });
        
    };

   
    // Get user profile
    criteria.dispatch(global.redux.action.account.profile({
        callback: async (response, data) => {
            if (response) {
                const user_profile_details = _.get(data, 'data', []);
                console.log('user_profile_details',data);
                // checks the user is approved
                if (_.size(user_profile_details)>0) {
                    redirectuserToDashboard();
                }else{
                    // redirectuserToProfile();
                    if (_.get(userData,'data.user')) {
                        console.log('user datatata',_.get(userData,'data.user'));
                    let details =_.pick(_.get(userData,'data.user'),['email','firstname','lastname'])
                    details.mobile=_.get(userData,'data.user.phone')
                    console.log('details',details);
                    criteria.dispatch(global.redux.action.account.postProfile({
                        body:details,
                        callback: async (response, data) => {
                            console.log('response, data',response, data);
                            if (response==true) {
                                criteria.dispatch(global.redux.action.account.profile())
                                redirectuserToDashboard()    
                            }else if(_.get(data,'error')){
                                global.utils.notification.nativeAlert({
                                    title: 'Error',
                                    message: _.get(data,'error'),
                                    buttons:   [
                                        { text: 'OK' }
                                      ],
                                    options: { cancelable: false }
                                });
                                Actions.AccountLoginScreen({ });
                            }
                            

                        }
                    }))
                    }
                }
                
            }
        }
    }));
}