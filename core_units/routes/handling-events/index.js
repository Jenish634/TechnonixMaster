import React, { useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

const HandlingEvents = (props) => {
    useEffect(() => {
      // Anything in here is fired on component mount.
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () =>  BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, []);
    const exitNotification=()=>{
        global.utils.notification.nativeAlert({
            title: 'Quit',
            message: 'Do you really want to exit the app?',
            buttons:   [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                { text: 'OK', onPress: () => BackHandler.exitApp() }
              ],
            options: { cancelable: false }
        });
    };
    const handleBackPress = async() => {
        switch (Actions.currentScene) {
            case 'Dashboard':
                exitNotification();
                break;
            case 'AccountLoginScreen':
                exitNotification();
                break;
                case 'AccountRegisterScreen':
                    exitNotification();
                    break;
            case 'ApplicationOfflineScreen':
                // we are not bringing the user to anywhere while trying backpress on ApplicationOfflineScreen
                break;
            default: Actions.pop();
             break;
        }

        return true;
    }
  
   const render=()=>(<React.Fragment></React.Fragment>);
   return render();
};
const mapStateToProps = state => ({ settings: _.get(state, `app.${global.redux.actionTypes.settings.name}`, {}) });

export default connect(mapStateToProps)(HandlingEvents);


