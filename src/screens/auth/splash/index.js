import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView
} from "react-native"

import { AuthContext } from "../../../context";






const Index = () => {

    const {appearance} = useContext(AuthContext)
    return (
        <View
            style={{ width: "100%", backgroundColor: appearance.secondaryColor, flex: 1 }}
        >
            
        <Image
        source={{uri:appearance.logo}}
        />

        </View>
    )
}



const styles = {
    socialBtn: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 100,
       
        width: 50,
        height: 50
    },
    logoSection: {
        width: "100%",
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    formSection: {
        width: "100%",
        flex: 4,
        borderTopLeftRadius: 60,
      
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 50,
    }
}






export default Index;