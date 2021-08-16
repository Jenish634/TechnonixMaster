import * as Font from 'expo-font';
export default function(){
    return new Promise(async resolve => {
        await Font.loadAsync({
            MontserratLight: require('../../assets/fonts/Montserrat-Light.ttf'),
            MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
            MontserratMedium: require('../../assets/fonts/Montserrat-Medium.ttf'),
            MontserratSemiBold: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
            MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
            RobotoLight: require('../../assets/fonts/Roboto-Light.ttf'),
            RobotoRegular: require('../../assets/fonts/Roboto-Regular.ttf'),
            RobotoMedium: require('../../assets/fonts/Roboto-Medium.ttf'),
            // RobotoSemiBold: require('../../assets/fonts/Roboto-SemiBold.ttf'),
            RobotoBold: require('../../assets/fonts/Roboto-Bold.ttf'),
          });
        resolve();
    });
}