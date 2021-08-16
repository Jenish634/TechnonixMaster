import React from 'react';
import { Button, View } from 'react-native';

import style from "./style";

export default ()=>{
    const render=()=>{
        return (
            <View style={style.formCard}>
                <Button
                    onPress={global.utils.signout}
                    title="Logout"
                    color="#eb3443"
                />
            </View>
        );
    };
    return render();
};