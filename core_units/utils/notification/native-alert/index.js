import _ from 'lodash';
import { Alert } from 'react-native';

export default function(criteria){
    /*
        Required properties
        title: title for the alert,
        message: message need to show on the alert,
        buttons: array of buttons need to be shown on the alert (eg: ok, cancel),
        options: props

        for doubts in react alert props please refer https://reactnative.dev/docs/alert
    */
    const title = _.get(criteria, 'title', 'Alert Title');
    const message = _.get(criteria, 'message', 'My Alert Msg');
    const buttons = _.get(criteria, 'buttons', []);
    const options = _.get(criteria, 'options', {});

    Alert.alert(title, message, buttons, options);
};