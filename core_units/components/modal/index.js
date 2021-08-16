
import React, { useState } from "react";
import { Alert, Modal, Text, View } from 'react-native';
import _ from 'lodash';

import style from './style';

export default function (WrappedComponent) {

    const MainComponent=(props)=> {
        // Declare a new state variable, which we'll call "modalVisible"
        const [modalVisible, setModalVisible] = useState(false);
        // Declare a new state variable, which we'll call "content"
        const [content, setContent] = useState('Hi this modal!');

        const modalUI=()=>{
            return(
 
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={style.centeredView}>
                            <View style={style.modalView}>
                                <Text style={style.modalText}>{content}</Text>
                            </View>
                        </View>
                    </Modal>

            );
        };

        const show=()=>{
            setModalVisible(true);
        };

        const close=()=>{
            setModalVisible(false);
        };

        const render=()=> {
            return (
                <React.Fragment>
                    {modalUI()}
                    <WrappedComponent {...props}  {...{modal:{show, close, isVisible: modalVisible, setContent}}} />
                </React.Fragment>
            );
        };

        return render();
    };

    return MainComponent;
};
