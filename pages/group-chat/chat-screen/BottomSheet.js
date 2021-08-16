import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Title } from 'react-native-paper'
import BottomSheetStyle from './BottomSheet-style';

const BottomSheet = (props) => {
    const { children, refRBSheet, onClose, header, bottom, customStyles } = { ...props }
    return (
        <RBSheet
            closeOnDragDown={true}
            closeOnPressMask={false}
            // customStyles={{
            //     wrapper: {
            //         backgroundColor: 'transparent',
            //     },
            //     draggableIcon: {
            //         backgroundColor: '#000',
            //     },
            //     container: {
            //         height: 500,
            //     },
            // }}
            customStyles={customStyles}
        >
            <TouchableOpacity
                style={BottomSheetStyle.closeBs}
                activeOpacity={0.75}
                onPress={onClose}
                hitSlop={BottomSheetStyle.hitSlot}
            >
                <Image
                    source={require('../../../assets/images/crosscopy.png')}
                    style={BottomSheetStyle.crossIcon}
                />
            </TouchableOpacity>
            <Title style={BottomSheetStyle.header}>{header}</Title>
            {children}
            <View style={BottomSheetStyle.container}>{bottom}</View>
        </RBSheet>
    )
}
export default BottomSheet
