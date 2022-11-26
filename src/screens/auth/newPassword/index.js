import React, { useState, useRef, useContext } from "react";
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
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';


//import components
import Input from '../../../components/inputs/loginInputs'
import LoginBtn from '../../../components/buttons/loginBtn'
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext } from "../../../context";
import axios from "axios";
import API from "../../../config/api";
import { Alert } from "react-native";





const Index = ({navigation}) => {

    const { appearance, userEmail } = useContext(AuthContext)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [secureText, setSecureText] = useState(true)
    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };
    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const createNewPassword = () => {
        if (password.length === 0 || password === undefined) {
            showToast("Please Enter Password")
        } else if (password.length < 6) {
            showToast("Password Contain atleast 6 characters")
        } else if (password !== confirmPassword) {
            showToast("Your both passwords do not match")
        } else {
            const form = {
                password,
                email: userEmail
            }
            axios.post(`${API}/user/new-passsword`, form)
                .then((res) => {
                    Alert.alert("Password Changed","Your password has been changed")
                    navigation.navigate("Login")
                })
        }
    }



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
                    <View style={{ width: "100%", paddingLeft: 30, position: "absolute", bottom: 15 }}>
                        <Text style={{ fontSize: 32, fontWeight: "bold", color: appearance.backgroundColor }}>
                            New Password
                        </Text>
                    </View>
                </View>
                <View style={{ ...styles.formSection, backgroundColor: appearance.backgroundColor, }}>

                    <ScrollView style={{ width: "100%", flex: 1 }}>

                        <View style={{ width: "100%", marginTop: 50, alignItems: "center" }}>
                            <View style={{ width: "100%", marginTop: 10 }}>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e)}
                                    icon={<EvilIcons name="lock" size={26} color={appearance.primaryLightColor} />}
                                    placeholder="Enter Password"
                                    password={true}
                                    setSecure={() => setSecureText(!secureText)}
                                    secureText={secureText}
                                    eye={secureText ? <Ionicons name="eye-outline" size={24} color={appearance.primaryLightColor} /> : <Ionicons name="eye-off-outline" size={24} color={appearance.primaryLightColor} />}
                                />
                            </View>
                            <View style={{ width: "100%", marginTop: 25, marginBottom: 20 }}>
                                <Input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e)}
                                    icon={<EvilIcons name="lock" size={26} color={appearance.primaryLightColor} />}
                                    placeholder="Confirm Password"
                                    password={true}
                                    setSecure={() => setSecureText(!secureText)}
                                    secureText={secureText}
                                    eye={secureText ? <Ionicons name="eye-outline" size={24} color={appearance.primaryLightColor} /> : <Ionicons name="eye-off-outline" size={24} color={appearance.primaryLightColor} />}
                                />
                            </View>

                        </View>

                        <View style={{ width: "100%", alignItems: "center", marginTop: 50 , marginBottom:25 }}>
                            <LoginBtn
                            textColor={appearance.backgroundColor}
                                onClick={() => createNewPassword()}
                                title="Send OTP"
                            />
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
        flex: 3,
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