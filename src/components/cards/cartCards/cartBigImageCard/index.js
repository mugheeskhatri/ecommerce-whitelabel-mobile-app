import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import {
    View,
    Text
} from "react-native";
import { AuthContext } from "../../../../context";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';




const Index = (props) => {

    const { appearance, setMyCart, myCart, setAmountBeforeCoupen, amountBeforeCoupen } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(props.data.quantity)
    const [amount, setAmount] = useState(props.data.discountType === "Percentage" ? (Number(props.data.price) - Number(props.data.price / 100) * props.data.discountPercent) * Number(quantity) : (Number(props.data.price) - Number(props.data.discountPercent)) * Number(quantity))
    const plus = () => {
        props.setCoupen("")
        props.setAvailable(false)
        setAmount(props.data.discountType === "Percentage" ? Number(amount) + (Number(props.data.price) - Number(props.data.price / 100) * props.data.discountPercent) : Number(amount) + (Number(props.data.price) - Number(props.data.discountPercent)))
        var data = myCart
        data[props.index].quantity += 1
        data[props.index].discountAmount += props.data.discountType === "Percentage" ? Number(props.data.price / 100 * props.data.discountPercent) : Number(props.data.discountAmount + props.data.discountPercent)
        setMyCart(data)
        setQuantity(quantity + 1)
        AsyncStorage.setItem('ecommerce_cart', JSON.stringify(data))
            .then(async (res) => {
                AsyncStorage.getItem('ecommerce_cart')
                    .then(async (res) => {
                        await setMyCart(JSON.parse(res))
                    })
            })
    }

    const minus = () => {
        props.setCoupen("")
        props.setAvailable(false)
        setAmount(props.data.discountType === "Percentage" ? Number(amount) - (Number(props.data.price) - Number(props.data.price / 100) * props.data.discountPercent) : Number(amount) - (Number(props.data.price) - Number(props.data.discountPercent)))
        var data = myCart
        data[props.index].quantity = data[props.index].quantity - 1
        data[props.index].discountAmount = data[props.index].discountAmount - props.data.discountType === "Percentage" ? Number(props.data.price / 100 * props.data.discountPercent) : Number(props.data.discountAmount - props.data.discountPercent)
        setMyCart(data)
        setQuantity(quantity - 1)
        AsyncStorage.setItem('ecommerce_cart', JSON.stringify(data))
            .then(async (res) => {
                AsyncStorage.getItem('ecommerce_cart')
                    .then(async (res) => {
                        await setMyCart(JSON.parse(res))
                    })
            })
    }


    return (
        <View style={{ width: "100%", alignItems: "center", }}>
            <View
                key={props.index}
                style={{ ...styles.cardMain, backgroundColor: appearance.backgroundColor , borderColor:appearance.contrastBackgroundColor }}
            >
                <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{ width: "100%", height: 180, borderRadius: 10 }}
                        source={{ uri: props.data.image.src }}
                    />
                </View>
                <View style={{ width: "50%", paddingLeft: 12 }}>
                    <View style={{ width: "100%", height: 140 }}>
                        <Text style={{ fontSize: 22, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                            {props.data.name}
                        </Text>
                        <View style={{ width: "100%", }}>
                            <Text style={{ fontSize: 13, fontFamily: "Monstret_med", color: appearance.primaryLightColor, }}>
                                {props.data.size !== "" ? `Size - ${props.data.size}` : ""}
                            </Text>
                            <Text style={{ fontSize: 13, fontFamily: "Monstret_med", color: appearance.primaryLightColor, }}>
                                {props.data.color !== "" ? `Color - ${props.data.color}` : ""}
                            </Text>
                        </View>
                        <View style={{ width: "100%", }}>
                            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 16, marginTop: 4, fontFamily: "Monstret_bold", color: appearance.primaryLightColor }}>
                                {`${appearance.currency}.${props.data.price * props.data.quantity} `}

                            </Text>
                            <Text style={{ fontSize: 17, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                                {`${appearance.currency}.${amount}`}

                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", flexDirection: "row", height: 40 ,}}>
                        <View style={{ width: 100, height: 35, flexDirection: "row", backgroundColor: appearance.secondaryColor, borderRadius: 12 }}>
                            <View style={{ ...styles.addBtnContainer, justifyContent: "center", height: 35, width: "33%" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (quantity === 1) {
                                            setQuantity(quantity)
                                            setAmount(amount)
                                        } else {
                                            minus()
                                        }
                                    }}
                                    style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color={appearance.backgroundColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ ...styles.addBtnContainer, justifyContent: "center", height: 35, width: "33%", alignItems: "center" }}>
                                <Text style={{ fontSize: 15, fontFamily: "Monstret_bold", color: appearance.backgroundColor }}>
                                    {quantity}
                                </Text>
                            </View>
                            <View style={{ ...styles.addBtnContainer, justifyContent: "center", height: 35, width: "33%" }}>
                                <TouchableOpacity
                                    onPress={() => plus()}
                                    style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialIcons name="keyboard-arrow-up" size={24} color={appearance.backgroundColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        

                    </View>
                </View>
                        <TouchableOpacity
                            onPress={props.onDelete}
                            style={{ width: 35, height: 35, borderRadius: 8, backgroundColor: appearance.contrastBackgroundColor, alignItems: "center", justifyContent: "center",position:"absolute",right:10,bottom:12 }}>
                            <MaterialCommunityIcons name="delete-outline" size={18} color={appearance.primaryLightColor} />
                        </TouchableOpacity>
            </View>

        </View>
    )
}




const styles = StyleSheet.create({
    cardMain: {
        width: "95%",
        flexDirection: "row",
        borderRadius: 12,
        padding: 7,
        borderWidth:.5,
        marginVertical: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    addBtnContainer: {
        width: "100%",
        alignItems: "center",
    }
})




export default Index;






