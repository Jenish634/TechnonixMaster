import _ from 'lodash';
import MerryToast from '@merryjs/toast';

export default function(criteria){
    /*
        Required properties
        message: message need to show on the toaster,
        duration: duration of the toaster

        for doubts in toaster props please refer https://github.com/merryjs/toast
    */
   const message = _.get(criteria, 'message', 'Test sample toaster message.');
   const duration = _.get(criteria, 'duration', MerryToast.SHORT);

   MerryToast.show(message, duration);
};