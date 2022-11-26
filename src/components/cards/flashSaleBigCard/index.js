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
    var [addedToWish, setAddedToWish] = useState(false)
    const [product, setProduct] = useState()
    const [quantity, setQuantity] = useState(0)
    const { appearance, setCurrentProduct, setDiscountTypeForThis, myWishlist, setMyWishList, setDiscountForThis } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`${API}/product/get/single/${props.data.value}`)
            .then((res) => {
                setProduct(res.data)
            })
    }, [])
    useEffect(() => {
        for (var i = 0; i < myWishlist.length; i++) {
            if (product?._id === myWishlist[i]) {
                setAddedToWish(true)
                break;
            }
        }
    }, [])


    const addToWishlist = () => {
        var wish = [...myWishlist]
        wish.unshift(product?._id)
        setAddedToWish(true)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(wish))
            .then(async (res) => {
                setMyWishList(wish)
            })
        console.log(wish)
    }


    const deleteFromWish = () => {
        var wish = [...myWishlist]
        const filtered = wish.filter(id => id !== product?._id)
        setAddedToWish(false)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(filtered))
            .then(() => {
                setMyWishList(filtered)
            })
    }

    return (
        <View style={{ ...styles.main, backgroundColor: appearance.contrastBackgroundColor, }}>
            {product?.image ? <Image
                style={styles.image}
                source={{ uri: product?.image[0]?.src }}
            /> : null}
            <View style={{ width: "100%", padding: 2, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: "400", color: appearance.primaryColor, lineHeight: 20, fontFamily: "Monstret_med" }}>
                    {product?.name}
                </Text>
                <View style={{ width: "100%" }}>
                    {props?.discount !== "" ? <View style={{ marginTop: 5 }}>
                        <View>

                            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 12, lineHeight: 13, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                                {`${appearance.currency}.${product?.regularPrice}`}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, lineHeight: 13, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                            {props.discountType === "Percentage" ? `${appearance.currency}.${(product?.regularPrice) - (product?.regularPrice / 100 * props.discount)}` : `${appearance.currency}.${(product?.regularPrice) - (product?.regularPrice - props.discount)}`}
                        </Text>
                    </View> : <Text style={{ fontSize: 12, lineHeight: 13, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                        {`${appearance.currency}.${product?.regularPrice}`}
                    </Text>}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setDiscountTypeForThis(props.discountType)
                    setDiscountForThis(props.discount)
                    setCurrentProduct(product)
                    props.onEyeClick()
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







