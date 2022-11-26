import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import screens
import Login from '../../screens/auth/login'
import SignUp from '../../screens/auth/signUp'
import RecoverPassword from '../../screens/auth/forgotPassword'
import OTP from '../../screens/auth/otp'
import NewPassword from '../../screens/auth/newPassword'




const Stack = createNativeStackNavigator();

function Index() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Navigator>
    );
}


export default Index; 






