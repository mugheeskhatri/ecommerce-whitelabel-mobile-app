import React, { useContext, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import { AuthContext } from "../../context";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



//import header
import Header from '../../components/headers/headerWithbackBtn'
import axios from "axios";
import API from "../../config/api";





const Index = () => {


    const [orderNumber, setOrderNumber] = useState("")
    const [orderFound, setOrderFound] = useState(false)
    const [order, setOrder] = useState()
    const { appearance } = useContext(AuthContext)

    const trackOrder = () => {
        axios.get(`${API}/order/track/${orderNumber}`)
            .then((res) => {
                setOrderFound(true)
                setOrder(res.data)
                console.log(res.data)
            })
    }



    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView
                style={{ width: "100%" }}
            >
                <Header
                    title="Track Order"
                />
                <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5, marginTop: 20 }}>
                    <View style={{ width: "82%", justifyContent: "center" }}>
                        <View style={{ ...styles.searchContainer, backgroundColor: appearance.backgroundColor, }}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity>
                                    <AntDesign name="search1" size={20} color={appearance.primaryLightColor} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                value={orderNumber}
                                onChangeText={(e) => setOrderNumber(e)}
                                placeholder="Enter Order Number"
                                style={{ ...styles.input, color: appearance.primaryLightColor }}
                                placeholderTextColor={appearance.primaryLightColor}
                            />
                        </View>
                    </View>
                    <View style={{ width: "18%" }}>
                        <TouchableOpacity
                            onPress={() => trackOrder()}
                            style={{ ...styles.sortBtn, backgroundColor: appearance.backgroundColor }}>
                            <FontAwesome5 name="shipping-fast" size={20} color={appearance.primaryLightColor} />
                        </TouchableOpacity>
                    </View>
                </View>

                {orderFound ?
                    <View style={{ width: "100%", marginTop: 20, marginTop: 20, alignItems: "center" }}>
                        <Text style={{ fontFamily: "Monstret_bold", fontSize: 22, textAlign: "center", color: appearance.primaryColor }}>
                            Order Details
                        </Text>
                        <View style={{ width: "90%", borderWidth: .5, padding: 12, marginBottom: 20, borderRadius: 15, borderColor: appearance.primaryLightColor, marginTop: 20 }}>

                            <View style={styles.tableRow}>
                                <View style={styles.headingSection}>
                                    <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Order Number</Text>
                                </View>
                                <View style={styles.valueSection}>
                                    <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{order?.orderNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.headingSection}>
                                    <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Costumer Name</Text>
                                </View>
                                <View style={styles.valueSection}>
                                    <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{order?.name}</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.headingSection}>
                                    <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Total Amount</Text>
                                </View>
                                <View style={styles.valueSection}>
                                    <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{appearance.currency}.{order?.amount}</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.headingSection}>
                                    <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>City</Text>
                                </View>
                                <View style={styles.valueSection}>
                                    <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{order?.city}</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.headingSection}>
                                    <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Status</Text>
                                </View>
                                <View style={styles.valueSection}>
                                    <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{order?.status}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    : null}

            </ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    searchContainer: {
        width: "95%",
        flexDirection: "row",
        height: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
        borderRadius: 15
    },
    iconContainer: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "100%",
        fontFamily: "Monstret_med"
    },
    sortBtn: {
        width: "100%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
    },
    headingText: {
        fontFamily: "Monstret_light",
        fontSize: 14
    },
    valueText: {
        fontFamily: "Monstret_med",
        fontSize: 15
    },
    headingSection: {
        width: "50%"
    },
    valueSection: {
        width: "50%",
        alignItems: "flex-end"
    },
    tableRow: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 8,
        marginVertical: 8
    },
})





export default Index