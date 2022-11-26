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
import { AuthContext } from "../../../context";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";





const Index = (props) => {

    const { appearance, setMyCart, myCart , setAmountBeforeCoupen , amountBeforeCoupen } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(props.data.item.quantity)
    const [amount, setAmount] = useState(props.data.item.discountType === "Percentage" ? (Number(props.data.item.price)-Number(props.data.item.price /100)*props.data.item.discountPercent) * Number(quantity):(Number(props.data.item.price)-Number(props.data.item.discountPercent)) * Number(quantity))
    const plus = () => {
        props.setCoupen("")
        props.setAvailable(false)
        setAmount(props.data.item.discountType === "Percentage" ? Number(amount) + (Number(props.data.item.price)-Number(props.data.item.price /100)*props.data.item.discountPercent):Number(amount) + (Number(props.data.item.price)-Number(props.data.item.discountPercent)))
        var data = myCart
        data[props.data.index].quantity += 1
        data[props.data.index].discountAmount += props.data.item.discountType === "Percentage" ? Number(props.data.item.price / 100 * props.data.item.discountPercent) : Number(props.data.item.discountAmount + props.data.item.discountPercent)
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
        setAmount(props.data.item.discountType === "Percentage" ? Number(amount) - (Number(props.data.item.price)-Number(props.data.item.price /100)*props.data.item.discountPercent):Number(amount) - (Number(props.data.item.price)-Number(props.data.item.discountPercent)))
        var data = myCart
        data[props.data.index].quantity = data[props.data.index].quantity - 1
        data[props.data.index].discountAmount = data[props.data.index].discountAmount - props.data.item.discountType === "Percentage" ? Number(props.data.item.price / 100 * props.data.item.discountPercent) : Number(props.data.item.discountAmount - props.data.item.discountPercent)
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
                key={props.data.index}
                style={{ ...styles.cardMain, backgroundColor: appearance.contrastBackgroundColor }}
            >
                <View style={{ width: "30%", alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{ width: "100%", height: 80, borderRadius: 10 }}
                        source={{ uri: props.data.item.image.src }}
                    />
                </View>
                <View style={{ width: "58%", paddingLeft: 12 }}>
                    <Text style={{ fontSize: 19, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                        {props.data.item.name}
                    </Text>
                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Text style={{ fontSize: 12, fontFamily: "Monstret_med", color: appearance.primaryLightColor, }}>
                            {props.data.item.size !== "" ? `Size - ${props.data.item.size}` : ""}
                        </Text>
                        <Text style={{ fontSize: 12, fontFamily: "Monstret_med", color: appearance.primaryLightColor, }}>
                            {props.data.item.size === "" ? "" : props.data.item.color === "" ? "" : " / "}
                        </Text>
                        <Text style={{ fontSize: 12, fontFamily: "Monstret_med", color: appearance.primaryLightColor, }}>
                            {props.data.item.color !== "" ? `Color - ${props.data.item.color}` : ""}
                        </Text>
                    </View>
                    <View style={{width:"100%",flexDirection:"row"}}>
                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid',fontSize: 17, marginTop: 10, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                        {`${appearance.currency}.${props.data.item.price * props.data.item.quantity} `}

                    </Text>
                    <Text style={{ fontSize: 17, marginLeft:10,marginTop: 10, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                        {`${appearance.currency}.${amount}`}

                    </Text>
                    </View>
                </View>
                <View style={{ width: "12%", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ width: "100%", height: 75, backgroundColor: appearance.secondaryColor, borderRadius: 18 }}>
                        <View style={{ ...styles.addBtnContainer, justifyContent: "flex-end", height: 28, }}>
                            <TouchableOpacity
                                onPress={() => plus()}
                                style={{ alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons name="keyboard-arrow-up" size={24} color={appearance.backgroundColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.addBtnContainer, justifyContent: "center", height: 19, }}>
                            <Text style={{ fontSize: 15, fontFamily: "Monstret_bold", color: appearance.backgroundColor }}>
                                {quantity}
                            </Text>
                        </View>
                        <View style={{ ...styles.addBtnContainer, justifyContent: "flex-start", height: 28, }}>
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
                    </View>
                </View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    cardMain: {
        width: "95%",
        flexDirection: "row",
        borderRadius: 12, padding: 10,
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






