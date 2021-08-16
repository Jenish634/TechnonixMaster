import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import ModalWrapper from '../components/modal';

const NetworkHandler=(props)=>{
    // Declare a new state variable, which we'll call "isNetConnected"
    const [isNetConnected, setIsNetConnected] = useState(null);

    useEffect(() => {
        // Set modal content
        if(_.chain(props).get('modal.setContent').isFunction().value()){
            props.modal.setContent('You are currently offline. Please turn on your network to continue...!');
        }

        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsNetConnected(state.isConnected);
        });
        return () => {
            // Unsubscribe to network state updates
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        handleNetChange();
    }, [isNetConnected]);

    const handleNetChange=()=>{
        if(_.eq(isNetConnected, false)){
            if(_.chain(props).get('modal.show').isFunction().value()){
                props.modal.show();
            }
        }
        else if(_.eq(isNetConnected, true)&&_.chain(props).get('modal.isVisible').eq(true).value()){
            if(_.chain(props).get('modal.close').isFunction().value()){
                props.modal.close(); 
            }
        }
    };

    return (<React.Fragment></React.Fragment>);
};

export default ModalWrapper(NetworkHandler);