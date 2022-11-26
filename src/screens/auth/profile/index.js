import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { AuthContext } from "../../../context";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import components
import LoginBtn from '../../../components/buttons/loginBtn'
import HeaderWithBack from '../../../components/headers/headerWithbackBtn'
import { ScrollView } from "react-native";




const Index = ({ navigation }) => {

    const { user, appearance, setIsAuthenticated } = useContext(AuthContext)

    const logout = () => {
        AsyncStorage.removeItem('ecommerce_token')
            .then(() => {
                setIsAuthenticated(false)
            })
    }



    console.log("user", user)
    return (
        <View style={{ flex: 1, width: "100%", backgroundColor: appearance.secondaryColor }}>
            <View style={{ width: "100%", position: "absolute", top: 0 }}>
                <HeaderWithBack
                    onBack={() => navigation.goBack()}
                />
            </View>
            <View style={{ width: "100%", flex: 2, alignItems: "center", justifyContent: "center" }}>
                <Image
                    style={{ width: 110, height: 110, borderRadius: 100 }}
                    source={{ uri: user.image ? user.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqGSpRSWM2LH7fa_Vvrr4V0IGlvG_QWXpJofT1-E&s" }}
                />
                <Text style={{ fontFamily: "Monstret_bold", fontSize: 20, color: appearance.backgroundColor, marginTop: 7 }}>
                    {user?.name}
                </Text>
                <Text style={{ fontFamily: "Monstret_light", fontSize: 15, color: appearance.backgroundColor }}>
                    {user?.email}
                </Text>
            </View>
            <View style={{ width: "100%", flex: 3, backgroundColor: appearance.backgroundColor, borderTopEndRadius: 40, borderTopLeftRadius: 40 }}>

                <ScrollView
                    style={{ width: "100%" }}
                >
                    <Text style={{ fontSize: 20, fontFamily: "Monstret_bold", color: appearance.primaryColor, marginLeft: 30, marginTop: 20 }}>
                        Profile Overview
                    </Text>

                    <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>


                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditProfile')}
                            style={{ ...styles.btn, backgroundColor: appearance.contrastBackgroundColor, }}>
                            <View style={styles.btnIconSection}>
                                <View style={{ ...styles.btnIconContainer, backgroundColor: appearance.secondaryColor, }}>
                                    <Feather name="edit" size={15} color={appearance.primaryColor} />
                                </View>
                            </View>
                            <View style={{ width: "70%", justifyContent: "center" }}>
                                <Text style={{ ...styles.textSection, color: appearance.primaryLightColor }}>
                                    Edit Profile
                                </Text>
                            </View>
                            <View style={styles.goIconSection}>
                                <MaterialIcons name="keyboard-arrow-right" size={25} color={appearance.primaryLightColor} />
                            </View>

                        </TouchableOpacity>




                        <TouchableOpacity
                        onPress={()=> navigation.navigate("MyCart")}
                        style={{ ...styles.btn, backgroundColor: appearance.contrastBackgroundColor, }}>
                            <View style={styles.btnIconSection}>
                                <View style={{ ...styles.btnIconContainer, backgroundColor: appearance.secondaryColor, }}>
                                    <Fontisto name="opencart" size={15} color={appearance.primaryColor} />
                                </View>
                            </View>
                            <View style={{ width: "70%", justifyContent: "center" }}>
                                <Text style={{ ...styles.textSection, color: appearance.primaryLightColor }}>
                                    My Cart
                                </Text>
                            </View>
                            <View style={styles.goIconSection}>
                                <MaterialIcons name="keyboard-arrow-right" size={25} color={appearance.primaryLightColor} />
                            </View>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ ...styles.btn, backgroundColor: appearance.contrastBackgroundColor, }}>
                            <View style={styles.btnIconSection}>
                                <View style={{ ...styles.btnIconContainer, backgroundColor: appearance.secondaryColor, }}>
                                    <Ionicons name="md-newspaper-outline" size={15} color={appearance.primaryColor} />
                                </View>
                            </View>
                            <View style={{ width: "70%", justifyContent: "center" }}>
                                <Text style={{ ...styles.textSection, color: appearance.primaryLightColor }}>
                                    My Orders
                                </Text>
                            </View>
                            <View style={styles.goIconSection}>
                                <MaterialIcons name="keyboard-arrow-right" size={25} color={appearance.primaryLightColor} />
                            </View>

                        </TouchableOpacity>



                        <TouchableOpacity
                        onPress={()=> navigation.navigate("MyWishlist")}
                        style={{ ...styles.btn, backgroundColor: appearance.contrastBackgroundColor, }}>
                            <View style={styles.btnIconSection}>
                                <View style={{ ...styles.btnIconContainer, backgroundColor: appearance.secondaryColor, }}>
                                    <AntDesign name="hearto" size={15} color={appearance.primaryColor} />
                                </View>
                            </View>
                            <View style={{ width: "70%", justifyContent: "center" }}>
                                <Text style={{ ...styles.textSection, color: appearance.primaryLightColor }}>
                                    My Wishlist
                                </Text>
                            </View>
                            <View style={styles.goIconSection}>
                                <MaterialIcons name="keyboard-arrow-right" size={25} color={appearance.primaryLightColor} />
                            </View>

                        </TouchableOpacity>
                        <View style={{ width: "100%", marginBottom:20,alignItems: "center", marginTop: 25 }}>

                            <LoginBtn
                                onClick={() => logout()}
                                textColor={appearance.backgroundColor}
                                width="60%"
                                title="Log Out"
                            />
                        </View>



                    </View>
                </ScrollView>

            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    btn: {
        width: "90%",
        marginVertical: 10,
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    btnIconSection: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    btnIconContainer: {

        borderRadius: 100,
        opacity: .6,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    textSection: {
        fontSize: 18,
        fontFamily: "Monstret_med",

    },
    goIconSection: {
        width: "15%",
        justifyContent: "center"
    }
})








export default Index;





