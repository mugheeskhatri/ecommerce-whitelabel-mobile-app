import React, { useState, useContext } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ToastAndroid,

} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//import components
import Input from '../../../components/inputs/loginInputs'
import LoginBtn from '../../../components/buttons/loginBtn'
import axios from "axios";
import API from "../../../config/api";
import { AuthContext } from '../../../context'




const Index = ({ navigation }) => {

    const { setIsAuthenticated , setUser , appearance } = useContext(AuthContext)
    const [secureText, setSecureText] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };

    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const signUp = () => {
        if (name === undefined | name.length === 0) {
            showToast("Please Enter Name")
        } else if (email.length === 0 || email === undefined) {
            showToast("Please Enter Email")
        } else if (validateEmail(email) === false) {
            showToast("Please Enter Valid Email")
        } else if (password.length === 0) {
            showToast("Please Enter Password")
        } else if (password.length < 6) {
            showToast("Password contain atleast 6 caracters")
        } else if (password !== confirmPassword) {
            showToast("Your bothh Password don't match")
        } else {
            const form = {
                name,
                email,
                password
            }
            axios.post(`${API}/user/register`, form)
                .then(async (res) => {
                    await AsyncStorage.setItem('ecommerce_token', res.data.token)
                    setUser(res.data.user)
                    setIsAuthenticated(true)
                })
        }
    }

    return (
        <View
            style={{ width: "100%", backgroundColor: appearance.secondaryColor, flex: 1 }}
        >
            <View style={styles.logoSection}>
                <Image
                    style={{ width: 150, height: 150, borderRadius: 100 }}
                    source={{ uri: appearance.logo }}
                />
                <View style={{ width: "100%", paddingLeft: 30, position: "absolute", bottom: 10 }}>
                    <Text style={{ fontSize: 32, color: appearance.backgroundColor, fontFamily: "Monstret_bold" }}>
                        Sign Up
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: appearance.backgroundColor,...styles.formSection}}>
                <ScrollView
                    style={{ width: "100%" }}
                >
                    <View style={{ width: "100%", }}>

                        <View style={{ width: "100%", marginTop: 40 }}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e)}
                                icon={<FontAwesome name="user" size={20} color={appearance.primaryLightColor} />}
                                placeholder="Enter Your Name"
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 20 }}>
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
                        <View style={{ width: "100%", marginTop: 20 }}>
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

                        <View style={{ width: "100%", alignItems: "center", marginTop: 45 }}>
                            <LoginBtn
                                onClick={() => signUp()}
                                title="SIGN UP"
                            />
                        </View>


                        <View
                            style={{ width: "100%", justifyContent: "center", flexDirection: "row", marginTop: 30 }}
                        >
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontSize: 15, color: appearance.primaryLightColor, fontFamily: "Monstret_med" }}>
                                    Already have an acount ?
                                </Text>
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Login")}
                                ><Text style={{ fontSize: 18, color: appearance.secondaryColor, fontFamily: "Monstret_bold" }}>Sign In</Text></TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>


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