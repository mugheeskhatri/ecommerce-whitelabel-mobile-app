import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import {
    View,
    Text
} from "react-native"
import { AuthContext } from "../../../context";



//import Components
import Header from '../../../components/headers/headerWithbackBtn'
import { StyleSheet } from "react-native";
import LoginBtn from '../../../components/buttons/loginBtn'
import axios from "axios";
import API from "../../../config/api";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";






const Index = ({ navigation }) => {
 

    const { appearance, orderData, setMyCart, setOrderData } = useContext(AuthContext)
    const [paymentMethod, setPaymentMethod] = useState("COD")


    const placeOrder = () => {
        axios.post(`${API}/order/place`, { ...orderData, payment: paymentMethod })
            .then(async (res) => {
                if (res.status === 201) {
                    await Alert.alert("Order Placed", "Your order placed Successfully")
                    setMyCart([])
                    setOrderData({})
                    navigation.navigate("Home1")
                    await AsyncStorage.removeItem('ecommerce_cart')
                }
            })
    }

    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView style={{ width: "100%", }}>
                <Header
                    title="Preview Order"
                    onBack={() => navigation.goBack()}
                />
                {/* personal details */}

                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={{ textAlign: "center", fontFamily: "Monstret_bold", fontSize: 19, marginTop: 30, color: appearance.primaryColor }}>
                        Personal Details
                    </Text>
                    <View style={{ ...styles.personalContainer, borderColor: appearance.primaryLightColor }}>
                        <View style={styles.tableRow}>
                            <View style={styles.headingSection}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Name</Text>
                            </View>
                            <View style={styles.valueSection}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{orderData?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.headingSection}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Phone</Text>
                            </View>
                            <View style={styles.valueSection}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>
                                    {orderData?.phone}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.headingSection}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>
                                    Email
                                </Text>
                            </View>
                            <View style={styles.valueSection}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>
                                    {orderData?.email}
                                </Text>
                            </View>
                        </View>
                       
                        <View style={styles.tableRow}>
                            <View style={styles.headingSection}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>
                                    City
                                </Text>
                            </View>
                            <View style={styles.valueSection}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>
                                    {orderData?.city}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.headingSection}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>
                                    Address
                                </Text>
                            </View>
                            <View style={styles.valueSection}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>
                                    {orderData?.address}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.headingSection}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>
                                    Description
                                </Text>
                            </View>
                            <View style={styles.valueSection}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>
                                    {orderData?.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>


                {/* personal details */}


                {/* product details */}


                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={{ textAlign: "center", fontFamily: "Monstret_bold", fontSize: 19, marginTop: 30, color: appearance.primaryColor }}>
                        Product Details
                    </Text>
                    <View style={{ ...styles.personalContainer, borderColor: appearance.primaryLightColor }}>
                        {orderData?.products?.map((v, i) => {
                            return (
                                <View style={styles.tableRowProduct}>
                                    <View style={styles.productDetail}>
                                        <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>{`${v.name} x ${v.quantity}`}</Text>
                                    </View>
                                    <View style={styles.productAmount}>
                                        <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{appearance.currency}.{Number(v.price) * Number(v.quantity)}</Text>
                                    </View>
                                </View>
                            )
                        })}
                        <View style={styles.tableRowProduct}>
                            <View style={styles.productDetail}>
                            </View>
                            <View style={{ ...styles.productAmount, borderWidth: .5, borderColor: appearance.primaryLightColor }}>
                            </View>
                        </View>
                        <View style={styles.tableRowProduct}>
                            <View style={styles.productDetail}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>SUBTOTAL</Text>
                            </View>
                            <View style={styles.productAmount}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{appearance.currency}.{orderData?.grossAmount}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRowProduct}>
                            <View style={styles.productDetail}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Shipping Cost</Text>
                            </View>
                            <View style={styles.productAmount}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>+  {` ${appearance.currency}`}.{orderData?.deliveryCharge}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRowProduct}>
                            <View style={styles.productDetail}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Discount</Text>
                            </View>
                            <View style={styles.productAmount}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>-{`${appearance.currency}`}.{orderData?.discount}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRowProduct}>
                            <View style={styles.productDetail}>
                            </View>
                            <View style={{ ...styles.productAmount, borderWidth: .5, borderColor: appearance.primaryLightColor }}>
                            </View>
                        </View>
                        <View style={styles.tableRowProduct}>
                            <View style={styles.productDetail}>
                                <Text style={{ ...styles.headingText, color: appearance.primaryColor }}>Total Amount</Text>
                            </View>
                            <View style={styles.productAmount}>
                                <Text style={{ ...styles.valueText, color: appearance.primaryColor }}>{`${appearance.currency}`}.{orderData?.grossAmount - orderData?.discount + orderData?.deliveryCharge}</Text>
                            </View>
                        </View>

                    </View>
                </View>


                {/* product details */}

                {/* Payment MEthod */}

                <View
                    style={{ width: "100%", alignItems: "center" }}
                >
                    <Text style={{ textAlign: "center", fontFamily: "Monstret_bold", fontSize: 19, marginTop: 30, color: appearance.primaryColor }}>
                        Payment Options
                    </Text>
                    <View style={{ ...styles.personalContainer, alignItems: "center", padding: 20, paddingVertical: 30 }}>
                        <Text style={{ fontFamily: "Monstret_bold", fontSize: 17, color: appearance.primaryLightColor, textAlign: "center" }}>
                            Payment Method Cash On Delivery Available Only
                        </Text>
                    </View>
                </View>

                {/* Payment MEthod */}

                <View style={{ width: "100%", alignItems: "center", marginTop: 30, marginBottom: 20 }}>
                    <LoginBtn
                        textColor={appearance.backgroundColor}
                        title="Place Order"
                        onClick={() => placeOrder()}
                    />
                </View>

            </ScrollView>
         
        </View>
    )
}



const styles = StyleSheet.create({
    headingText: {
        fontFamily: "Monstret_light",
        fontSize: 14
    },
    valueText: {
        fontFamily: "Monstret_med",
        fontSize: 15
    },
    headingSection: {
        width: "25%"
    },
    valueSection: {
        width: "75%",
        alignItems: "flex-end"
    },
    personalContainer: {
        width: "95%",
        marginTop: 10,
        borderWidth: .5,
        borderRadius: 12,
        paddingVertical: 10
    },
    tableRow: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 8,
        marginVertical: 8
    },
    productDetail: {
        width: "75%"
    },
    productAmount: {
        width: "25%",
        alignItems: "flex-end"
    },
    tableRowProduct: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 8,
        marginVertical: 4
    }
})



export default Index


