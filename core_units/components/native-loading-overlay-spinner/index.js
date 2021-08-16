
import React, { useState } from "react";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';

export default function (WrappedComponent) {

    const MainComponent=(props)=> {
        // Declare a new state variable, which we'll call "spinnerVisible"
        const [spinnerVisible, setSpinnerVisible] = useState(false);
        // Declare a new state variable, which we'll call "properties"
        const [properties, setProperties] = useState({});

        const spinnerUI=()=>{
            // for available properties please refer to https://www.npmjs.com/package/react-native-loading-spinner-overlay
            const updateProperties = _.omit(properties, ['visible']);
            return(
                <Spinner
                    {
                        ...{
                        visible: spinnerVisible,
                        textContent: 'Loading...',
                        textStyle: { color: '#FFF' },
                        ...updateProperties
                        }
                    }
                />
            );
        };

        const show=()=>{
            setSpinnerVisible(true);
        };

        const close=()=>{
            setSpinnerVisible(false);
        };

        const updateTextContent=text=>{
            setProperties({textContent: text});
        };

        const render=()=> {
            return (
                <React.Fragment>
                    {spinnerUI()}
                    <WrappedComponent {...props}  {...{nativeLoadingOverlaySpinner:{show, close, isVisible: spinnerVisible, setProperties, updateTextContent}}} />
                </React.Fragment>
            );
        };

        return render();
    };

    return MainComponent;
};
