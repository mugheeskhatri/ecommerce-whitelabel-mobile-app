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

    const { appearance , setUserEmail } = useContext(AuthContext)

    const cellCount = 4;
    const [email, setEmail] = useState("")

    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };
    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const verifyOTP = () => {
        if (email.length === 0 || email === undefined) {
            showToast("Please Enter Email")
        } else if (validateEmail(email) === false) {
            showToast("Please Enter valid email")
        } else {
            const form = {
                email
            }
            axios.post(`${API}/user/forgot-password`,form)
            .then((res)=>{
                console.log(res.data)
                if(res.status === 201) {
                    Alert.alert("OTP Sent",`4 Digit code sent to ${email}`)
                    navigation.navigate("OTP")
                }
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
                            Recover Acount
                        </Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: appearance.backgroundColor,
                    ...styles.formSection
                }}>

                    <View style={{ width: "100%", marginTop: 50, alignItems: "center", flex: 2 }}>
                        <View style={{ width: "90%" }}>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e)}
                                icon={<Feather name="user" size={20} color={appearance.primaryLightColor} />}
                                placeholder="Enter Your Email"
                            />
                        </View>
                        <Text style={{ fontSize: 12, color: appearance.primaryLightColor, marginTop: 12 }}>
                            Enter valid Email so we will send OTP to your Email
                        </Text>
                    </View>


                    <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
                        <LoginBtn
                            textColor={appearance.backgroundColor}
                            onClick={() => {
                                setUserEmail(email)
                                verifyOTP()
                            }}
                            title="Send OTP"
                        />
                    </View>


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