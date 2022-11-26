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

import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


//import components
import Input from '../../../components/inputs/loginInputs'
import LoginBtn from '../../../components/buttons/loginBtn'
import AskBtn from '../../../components/buttons/askButton'
import { AuthContext } from "../../../context";




const Index = () => {

    const { appearance } = useContext(AuthContext)


    return (
        <View
            style={{ width: "100%", backgroundColor: appearance.secondaryColor, flex: 1 }}
        >
            <KeyboardAvoidingView
                style={{ width: "100%", flex: 1 }}
            >
                <View style={styles.logoSection}>
                    <Image
                        style={{ width: 150, height: 150, borderRadius: 100 }}
                        source={{ uri: appearance.logo }}
                    />
                </View>
                <View style={{ ...styles.formSection, backgroundColor: appearance.backgroundColor, }}>
                    <ScrollView
                        style={{ width: "100%" }}
                    >
                        <View style={{ width: "100%", }}>
                            <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
                                <LoginBtn
                                    onClick={() => login()}
                                    title="Continue as guest"
                                />
                            </View>
                            <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
                                <LoginBtn
                                    bgColor={appearance.primaryColor}
                                    title="Log In"
                                />
                            </View>

                            <View style={{ width: "100%", alignItems: "center", marginTop: 25 }}>
                                <View style={{ width: "60%", flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        style={{ ...styles.socialBtn, backgroundColor: appearance.backgroundColor, }}
                                    >
                                        <Entypo name="facebook-with-circle" size={50} color="#000DF7" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.socialBtn, backgroundColor: appearance.backgroundColor, }}
                                    >
                                        <Entypo name="google--with-circle" size={50} color="#E34133" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.socialBtn, backgroundColor: appearance.backgroundColor, }}
                                    >
                                        <Ionicons name="logo-apple-appstore" style={{ width: "100%", height: "100%" }} size={50} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{ width: "100%", justifyContent: "center", flexDirection: "row", marginTop: 30 }}
                            >

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>


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
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    formSection: {
        width: "100%",
        flex: 2,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
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