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





const Index = ({ navigation }) => {

    const { appearance, userEmail } = useContext(AuthContext)

    const cellCount = 4;

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };


    const verifyOTP = () => {
        const form = {
            otp: value
        }
        axios.post(`${API}/user/verify-otp`, form)
            .then((res) => {
                if(res.status === 205){
                    Alert.alert("Invalid OTP","The OTP you enter is not valid")
                }else if (res.status === 201) {
                    Alert.alert("OTP Success", "Your OTP Verified Successfully")
                    navigation.navigate("NewPassword")
                }
            })
    }

    const resendOtp = () => {
        const form = {
            email: userEmail
        }
        axios.post(`${API}/user/resend-otp`, form)
            .then((res) => {
                if (res.status === 201) {
                    Alert.alert("OTP Sent Again", `OTP has been sent again to ${userEmail}`)
                }
            })
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
                </View>
                <View style={{ backgroundColor: appearance.backgroundColor, ...styles.formSection }}>
                    <ScrollView
                        style={{ width: "100%" }}
                    >
                        <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
                            <Text style={{fontSize:22,fontFamily:"Monstret_bold",color:appearance.primaryLightColor}}>
                                Enter OTP Here
                            </Text>
                            <CodeField
                                ref={ref}
                                {...props}
                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                value={value}
                                onChangeText={setValue}
                                cellCount={cellCount}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={{ ...styles.cell, borderColor: isFocused ? appearance.secondaryColor : appearance.primaryLightColor,color:appearance.secondaryColor }}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                        <View style={{ width: "100%", alignItems: "center", marginTop: 12 }}>
                            <View style={{ width: "72%", alignItems: "flex-end", paddingRight: 20 }}>
                                <TouchableOpacity
                                    onPress={resendOtp}
                                >
                                    <Text style={{ color: appearance.secondaryColor }}>RESEND OTP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
                            <LoginBtn
                                textColor={appearance.backgroundColor}
                                bgColor={appearance.primaryColor}
                                onClick={() => verifyOTP()}
                                title="Verify OTP"
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
        flex: 3,
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
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30  },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 60,
        height: 65,
        lineHeight: 60,
        fontSize: 24,
        borderRadius: 10,
        borderBottomWidth: 1,
        fontFamily: "Monstret_bold",
        textAlign: 'center',
        marginHorizontal: 6,
    },

}






export default Index;