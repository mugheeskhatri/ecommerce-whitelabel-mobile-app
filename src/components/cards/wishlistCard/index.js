import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import API from "../../../config/api";
import { AuthContext } from "../../../context";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from '@expo/vector-icons';




const Index = (props) => {

    const { appearance, setDiscountTypeForThis, setDiscountForThis , setCurrentProduct } = useContext(AuthContext)

    const [productData, setProductData] = useState()
    const [discount, setDiscount] = useState("")
    const [discountType, setDiscountType] = useState("")
    const [show, setShow] = useState(false)



    useEffect(() => {
        axios.get(`${API}/product/get/single/${props.data}`)
            .then(async (res) => {
                await setProductData(res.data)
                if (res.data.saleId === "" || res.data.saleId === undefined || res.data.saleId === null) {
                    axios.get(`${API}/category/get/single/${res.data.categoryId}`)
                        .then(async (res) => {
                            await axios.get(`${API}/categorySale/get/single/${res.data.saleId}`)
                                .then(async (res) => {
                                    if (res.status === 205) {
                                        console.log("Sale not Found")
                                    } else if (res.status === 202) {
                                        await setDiscount(res.data.percentOrAmount)
                                        await setDiscountType(res.data.discountType)
                                        await setShow(true)
                                    }
                                })
                        })
                } else {
                    axios.get(`${API}/flashSale/get/byId/${res.data.saleId}`)
                        .then(async (res) => {
                            if (res.status === 204) {
                                console.log("No Salle in this item")
                            } else if (res.status === 202) {
                                await setDiscount(res.data.percentOrAmount)
                                await setDiscountType(res.data.discountType)
                                await setShow(true)
                            }
                        })
                }
            })
    }, [])



    return (
        <View style={{ width: "100%", alignItems: "center" }}>
            {show ? <View style={{ ...styles.main, backgroundColor: appearance.contrastBackgroundColor }}>
                <View style={{ width: "35%" }}>
                    {productData?.image ? <Image
                        style={{ width: "100%", height: 100, borderRadius: 10 }}
                        source={{ uri: productData.image[0].src }}
                    /> : null}
                </View>
                <View style={{ width: "65%", paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                        {productData?.name}
                    </Text>
                    <Text style={{ fontSize: 13, fontFamily: "Monstret_light", color: appearance.primaryColor }}>
                        {productData?.shortDescription}
                    </Text>
                    {discount === "" ? <Text style={{ fontSize: 17, marginTop: 20, fontFamily: "Monstret_light", color: appearance.primaryColor }}>
                        {appearance.currency}.{productData?.regularPrice}
                    </Text> :
                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <Text style={{ fontSize: 17, marginTop: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: "Monstret_light", color: appearance.primaryColor }}>
                                {appearance.currency}.{productData?.regularPrice}
                            </Text>
                            <Text style={{ fontSize: 17, marginLeft: 10, marginTop: 20, fontFamily: "Monstret_light", color: appearance.primaryColor }}>
                                {appearance.currency}.{discountType === "Percentage" ? productData?.regularPrice - Number(productData.regularPrice / 100 * discount) : productData?.regularPrice - discount}
                            </Text>
                        </View>}
                </View>
                <TouchableOpacity
                    onPress={props.deleteFromWish}
                    style={{ position: "absolute", top: 20, right: 20 }}>
                    <AntDesign name="delete" size={20} color={appearance.primaryLightColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentProduct(productData)
                        setDiscountForThis(discount)
                        setDiscountTypeForThis(discountType)
                        props.navigate()
                    }}
                    style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: appearance.secondaryColor, width: 40, borderBottomEndRadius: 12, height: 30, borderTopLeftRadius: 12, alignItems: "center", justifyContent: "center" }}>
                    <FontAwesome5 name="eye" size={16} color={appearance.contrastBackgroundColor} />
                </TouchableOpacity>
            </View> :
                <View style={{ width: "90%", height: 120, marginVertical: 10, backgroundColor: appearance.contrastBackgroundColor, borderRadius: 12 }}>

                </View>}
        </View>
    )
}




const styles = StyleSheet.create({
    main: {
        width: "90%",
        marginVertical: 10,
        borderRadius: 12,
        flexDirection: "row",
        padding: 8
    }
})



export default Index;