import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from "../../../context";
import axios from "axios";
import API from "../../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Index = (props) => {
    const [quantity, setQuantity] = useState(0)
    const { appearance, setDiscountForThis, setDiscountTypeForThis, setMyWishList, myWishlist } = useContext(AuthContext)
    var [addedToWish, setAddedToWish] = useState(false)
    const [discount, setDiscount] = useState(props.discount)
    const [discountType, setDiscountType] = useState(props.discountType)


    useEffect(() => {
        for (var i = 0; i < myWishlist.length; i++) {
            if (props.data._id === myWishlist[i]) {
                setAddedToWish(true)
                break;
            }
        }
    }, [])


    const deleteFromWish = () => {
        var wish = [...myWishlist]
        const filtered = wish.filter(id => id !== props.data._id)
        setAddedToWish(false)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(filtered))
            .then(() => {
                setMyWishList(filtered)
            })
    }

    useEffect(() => {
        if (props.data.saleId !== "") {
            axios.get(`${API}/flashSale/get/byId/${props.data.saleId}`)
                .then((res) => {
                    console.log("sale response", res.data)
                    setDiscountType(res.data.discountType)
                    setDiscount(res.data.percentOrAmount)
                })
        }
    }, [])

    useEffect(() => {
        if (props.popular === true) {
            if (props.data.saleId === "" || props.data.saleId === undefined || props.data.saleId === null) {
                axios.get(`${API}/category/get/single/${props.data.categoryId}`)
                    .then(async (res) => {
                        await axios.get(`${API}/categorySale/get/single/${res.data.saleId}`)
                            .then(async (res) => {
                                if (res.status === 205) {
                                    console.log("Sale not Found")
                                } else if (res.status === 202) {
                                    await setDiscount(res.data.percentOrAmount)
                                    await setDiscountType(res.data.discountType)
                                }
                            })
                    })
            } else {
                axios.get(`${API}/flashSale/get/byId/${props.data.saleId}`)
                    .then(async (res) => {
                        if (res.status === 204) {
                            console.log("No Salle in this item")
                        } else if (res.status === 202) {
                            await setDiscount(res.data.percentOrAmount)
                            await setDiscountType(res.data.discountType)
                        }
                    })
            }
        }
    },[])

    console.log("mughees",discount, discountType)

    const addToWishlist = () => {
        var wish = myWishlist
        wish.unshift(props.data._id)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(wish))
            .then(async (res) => {
                setAddedToWish(true)
                setMyWishList(wish)
            })
    }




    return (
        <View style={{ ...styles.main, backgroundColor: appearance.contrastBackgroundColor, }}>
            <Image
                style={styles.image}
                source={{ uri: props.data.image[0].src }}
            />
            <View style={{ width: "100%", padding: 2, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: "400", color: appearance.primaryColor, lineHeight: 20, fontFamily: "Monstret_med" }}>
                    {props.data.name}
                </Text>
                <View style={{ width: "100%" }}>
                    {discount !== "" ? <View style={{ marginTop: 5 }}>
                        <View>

                            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 12, lineHeight: 13, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                                {`${appearance.currency}.${props.data.regularPrice}`}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, lineHeight: 13, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                            {`${appearance.currency}.${discountType === "Percentage" ? (props?.data?.regularPrice) - (props?.data?.regularPrice / 100 * discount) : (props?.data?.regularPrice - discount)}`}
                        </Text>
                    </View> : <Text style={{ fontSize: 12, lineHeight: 13, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                        {`${appearance.currency}.${props.data.regularPrice}`}
                    </Text>}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    props.onEyeClick()
                    setDiscountTypeForThis(discountType)
                    setDiscountForThis(discount)
                }
                }
                style={{ ...styles.addContainer, backgroundColor: appearance.secondaryColor, }}>
                <FontAwesome5 name="eye" size={16} color={appearance.contrastBackgroundColor} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => addedToWish ? deleteFromWish() : addToWishlist()}
                style={styles.loveContainer}>
                {addedToWish ? <AntDesign name="heart" size={20} color={appearance.secondaryColor} /> : <AntDesign name="hearto" size={20} color={appearance.secondaryColor} />}
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        width: "45%",
        marginVertical: 8,
        padding: 8,
        borderRadius: 20,
        shadowColor: "gray",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    addContainer: {

        paddingVertical: 4,
        borderBottomEndRadius: 12,
        borderTopLeftRadius: 12,
        width: 45,
        position: "absolute",
        bottom: 0,
        right: 0,
        alignItems: "center"
    },
    loveContainer: {
        width: 45,
        position: "absolute",
        top: 20,
        left: 5,
        alignItems: "center"
    },
    btnSection: {
        width: "100%",
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})



export default Index;







