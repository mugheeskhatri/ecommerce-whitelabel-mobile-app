import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView
} from "react-native"
import * as Facebook  from 'expo-facebook';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


//import components
import Input from '../../../components/inputs/loginInputs'
import LoginBtn from '../../../components/buttons/loginBtn'
import axios from "axios";
import API from "../../../config/api";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import AsyncStorage from '@react-native-async-storage/async-storage';





const Index = ({ navigation }) => {


    const { setIsAuthenticated, setUser, appearance } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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

    const login = () => {
        if (email.length === 0 || email === undefined) {
            showToast("Please Enter Email")
        } else if (validateEmail(email) === false) {
            showToast("Plese Enter valid email")
        } else if (password.length === 0 || password === undefined) {
            showToast("Please Enter Password")
        } else {
            const form = {
                email,
                password
            }
            axios.post(`${API}/user/login`, form)
                .then(async (res) => {
                    await AsyncStorage.setItem('ecommerce_token', res.data.token)
                    setUser(res.data.user)
                    setIsAuthenticated(true)
                })

        }
    }

    async function logInWithFb() {
        try {
          await Facebook.initializeAsync({
            optionsOrAppId: '636580541323207',
          })
          .then((res)=>{

              console.log(res)
          })
          .catch((e)=>{
            console.log("error",e)
          })
        //   const { type, token } =
        //     await Facebook.logInWithReadPermissionsAsync({
        //       permissions: ['public_profile'],
        //     });

        //   if (type === 'success') {
        //     // Get the user's name using Facebook's Graph API
        //     const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //     Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        //   } else {
        //     // type === 'cancel'
        //   }
        } catch ({ message }) {
          console.log(`Facebook Login Error: ${message}`);
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
                    <View style={{ width: "100%", alignItems: "flex-end", paddingRight: 20, position: "absolute", bottom: 10 }}>
                        <Text style={{ fontSize: 32, color: appearance.backgroundColor, fontFamily: "Monstret_bold" }}>
                            Log In
                        </Text>
                    </View>
                </View>
                <View style={{ backgroundColor: appearance.backgroundColor, ...styles.formSection }}>
                    <ScrollView
                        style={{ width: "100%" }}
                    >
                        <View style={{ width: "100%", }}>

                            <View style={{ width: "100%", marginTop: 40 }}>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e)}
                                    icon={<Feather name="user" size={20} color={appearance.primaryLightColor} />}
                                    placeholder="Enter Email"
                                />
                            </View>
                            <View style={{ width: "100%", marginTop: 20 }}>
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
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <View style={{ width: "85%", paddingRight: 8, marginTop: 10, alignItems: "flex-end" }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("RecoverPassword")}
                                    >
                                        <Text style={{ color: appearance.secondaryColor, fontSize: 15, fontFamily: "Monstret_bold" }}>
                                            Forgot Password?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
                                <LoginBtn
                                    textColor={appearance.backgroundColor}
                                    onClick={() => login()}
                                    title="Log In"
                                />
                            </View>

                            <View style={{ width: "100%", alignItems: "center", marginTop: 35 }}>
                                <View style={{ width: "60%", flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: appearance.backgroundColor, ...styles.socialBtn }}
                                        onPress={logInWithFb}
                                   >
                                        <Entypo name="facebook-with-circle" size={50} color="#000DF7" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ backgroundColor: appearance.backgroundColor, ...styles.socialBtn }}
                                    >
                                        <Entypo name="google--with-circle" size={50} color="#E34133" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ backgroundColor: appearance.backgroundColor, ...styles.socialBtn }}
                                    >
                                        <Ionicons name="logo-apple-appstore" style={{ width: "100%", height: "100%" }} size={50} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{ width: "100%", justifyContent: "center", flexDirection: "row", marginTop: 30 }}
                            >
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 15, color: appearance.primaryLightColor, fontFamily: "Monstret_med" }}>
                                        Don't have an acount ?
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("SignUp")}
                                    ><Text style={{ fontSize: 18, color: appearance.secondaryColor, fontFamily: "Monstret_bold" }}>Sign Up</Text></TouchableOpacity>
                                </View>

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