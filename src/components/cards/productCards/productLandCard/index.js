import React, { useContext, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ToastAndroid
} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from "../../../../context";
import axios from "axios";
import API from "../../../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import SizeCard from '../../sizeCard'
import ColorCard from '../../colorCard'
import LoginBtn from '../../../buttons/loginBtn'



const Index = (props) => {
    const [quantity, setQuantity] = useState(0)
    const { appearance, setDiscountForThis, setDiscountTypeForThis, myCart, setMyCart, setMyWishList, myWishlist } = useContext(AuthContext)
    var [addedToWish, setAddedToWish] = useState(false)
    const [discount, setDiscount] = useState(props.discount)
    const [discountType, setDiscountType] = useState(props.discountType)
    const swipeUpDownRef = useRef()
    const [amountWithDiscount, setAmountWithDiscount] = useState()
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [already, setAlready] = useState(false)



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
        if (props.data.saleId !== "" && props.data.saleId !== null && props.data.saleId !== undefined) {
            axios.get(`${API}/flashSale/get/byId/${props.data.saleId}`)
                .then((res) => {
                    console.log("sale response", res.data)
                    setDiscountType(res.data.discountType)
                    setDiscount(res.data.percentOrAmount)
                    setAmountWithDiscount(res.data.discountType === "Percentage" ? (props?.data?.regularPrice) - (props?.data?.regularPrice / 100 * res.data.percentOrAmount) : (props?.data?.regularPrice - res.data.percentOrAmount))
                })
        } else {
            setDiscountType("")
            setDiscount("")
        }
    }, [])

    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };


    useEffect(() => {
        const data = myCart?.filter(product => product?.productId === props.data?._id)
        if (data.length >= 1) {
            setAlready(true)
        }
    }, [])


    const addToCart = async () => {
        if (already) {
            const filteredData = myCart?.filter(product => product?.productId !== props.data?._id)
            await AsyncStorage.setItem('ecommerce_cart', JSON.stringify(filteredData))
                .then(() => {
                    AsyncStorage.getItem('ecommerce_cart')
                        .then(async (res) => {
                            const cartData = await JSON.parse(res)
                            await setMyCart(cartData)
                        })
                    showToast("Removed From Cart")
                    setAlready(false)
                })

        } else {

            if (props.data.differentSizes === "Yes" && selectedSize === "") {
                showToast("Plese Select Size")
            } else if (props.data.differentColors === "Yes" && selectedColor === "") {
                showToast("Plese Select Color")
            } else {
                const form = {
                    name: props.data.name,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: 1,
                    price: props.data.regularPrice,
                    productId: props.data._id,
                    image: props.data?.image[0],
                    discountAmount: props.data.regularPrice - amountWithDiscount,
                    discountType: discountType,
                    discountPercent: discount
                }
                const cart = myCart
                cart.unshift(form)
                await AsyncStorage.setItem('ecommerce_cart', JSON.stringify(cart))
                    .then(() => {
                        AsyncStorage.getItem('ecommerce_cart')
                            .then(async (res) => {
                                const cartData = await JSON.parse(res)
                                await setMyCart(cartData)
                            })
                        showToast("Added to Cart")
                        setAlready(true)
                    })
            }


        }
    }




    useEffect(() => {
        if (props.popular === true) {
            if (props.data.saleId === "" || props.data.saleId === undefined || props.data.saleId === null) {
                axios.get(`${API}/category/get/single/${props.data.categoryId}`)
                    .then(async (res) => {
                        await axios.get(`${API}/categorySale/get/single/${res.data.saleId}`)
                            .then(async (res) => {
                                if (res.status === 205) {
                                    setDiscountType("")
                                    setDiscount("")
                                } else if (res.status === 202) {
                                    await setDiscount(res.data.percentOrAmount)
                                    await setDiscountType(res.data.discountType)
                                    setAmountWithDiscount(res.data.discountType === "Percentage" ? (props?.data?.regularPrice) - (props?.data?.regularPrice / 100 * res.data.percentOrAmount) : (props?.data?.regularPrice - res.data.percentOrAmount))
                                }
                            })
                    })
            } else {
                axios.get(`${API}/flashSale/get/byId/${props.data.saleId}`)
                    .then(async (res) => {
                        if (res.status === 204) {
                            setDiscountType("")
                            setDiscount("")
                        } else if (res.status === 202) {
                            await setDiscount(res.data.percentOrAmount)
                            await setDiscountType(res.data.discountType)
                            setAmountWithDiscount(res.data.discountType === "Percentage" ? (props?.data?.regularPrice) - (props?.data?.regularPrice / 100 * res.data.percentOrAmount) : (props?.data?.regularPrice - res.data.percentOrAmount))
                        }
                    })
            }
        }
    }, [])


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
        <TouchableOpacity
            onPress={() => {
                props.onEyeClick()
                setDiscountTypeForThis(discountType)
                setDiscountForThis(discount)
            }}
            style={{ ...styles.main, backgroundColor: appearance.contrastBackgroundColor }}>
            <View style={{ width: "35%" }}>
                <Image
                    style={styles.image}
                    source={{ uri: props.data.image[0].src }}
                />
            </View>
            <View style={{ width: "65%", flexDirection: "row", padding: 2, paddingHorizontal: 12 }}>
                <View style={{ width: "80%", position: "relative" }}>
                    <Text style={{ fontSize: 18, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                        {props.data.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: appearance.primaryLightColor, lineHeight: 14, fontFamily: "Monstret_med" }}>
                        {props.data.shortDescription}
                    </Text>
                    <View style={{ width: "100%" }}>
                        {discount !== "" ? <View style={{ marginTop: 15, }}>
                            <View>

                                <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 16, lineHeight: 22, color: appearance.primaryLightColor, fontFamily: "Monstret_med" }}>
                                    {`${appearance.currency}.${props.data.regularPrice}`}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 18, lineHeight: 22, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                                {`${appearance.currency}.${discountType === "Percentage" ? (props?.data?.regularPrice) - (props?.data?.regularPrice / 100 * discount) : (props?.data?.regularPrice - discount)}`}
                            </Text>
                        </View> : <Text style={{ fontSize: 18, marginTop: 20, lineHeight: 22, color: appearance.primaryColor, fontFamily: "Monstret_med" }}>
                            {`${appearance.currency}.${props.data.regularPrice}`}
                        </Text>}
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (already) {
                        addToCart()
                    } else {
                        if (props.data.differentColors === " Yes" || props.data.differentSizes === "Yes") {
                            swipeUpDownRef.current.open()
                        } else {
                            addToCart()
                        }
                    }
                }
                }
                style={{ ...styles.addContainer, backgroundColor: appearance.secondaryColor, }}>
                {!already ? <AntDesign name="plus" size={14} color={appearance.backgroundColor} />
                    : <AntDesign name="close" size={14} color={appearance.backgroundColor} />
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => addedToWish ? deleteFromWish() : addToWishlist()}
                style={{ ...styles.loveContainer, backgroundColor: appearance.backgroundColor }}>
                {addedToWish ? <AntDesign name="heart" size={16} color={appearance.secondaryColor} /> : <AntDesign name="hearto" size={20} color={appearance.secondaryColor} />}
            </TouchableOpacity>

            <RBSheet
                ref={swipeUpDownRef}
                height={290}
                openDuration={320}
                closeOnDragDown
                customStyles={{
                    container: {
                        backgroundColor: appearance.backgroundColor,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    },

                }}
            >
                <View style={{ width: "100%", height: 190 }}>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontFamily: "Monstret_bold", color: appearance.secondaryColor }}>
                            {props.data.name}
                        </Text>
                    </View>

                    {props.data.differentSizes === "Yes" ? <View style={{ width: "100%" }}>
                        <Text
                            style={{ fontSize: 18, marginTop: 5, marginLeft: 10, fontFamily: "Monstret_bold", color: appearance.secondaryColor }}
                        >Please Select Size:
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ width: "100%", marginTop: 10, marginLeft: 10 }}>
                            {props.data.sizeAttributes.map((v, i) => {
                                return (
                                    <SizeCard
                                        selectedSize={selectedSize}
                                        onClick={() => setSelectedSize(v.size)}
                                        size={v.size}
                                        index={i}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View> : null}

                    {props.data.differentColors === "Yes" ? <View style={{ width: "100%" }}>
                        <Text
                            style={{ fontSize: 18, marginTop: 10, marginLeft: 10, fontFamily: "Monstret_bold", color: appearance.secondaryColor }}
                        >Please Select Color:
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ width: "100%", marginTop: 10, marginLeft: 10 }}>
                            {props.data.colorAttributes.map((v, i) => {
                                return (
                                    <ColorCard
                                        selectedColor={selectedColor}
                                        onClick={() => setSelectedColor(v.colorName)}
                                        data={v}
                                        index={i}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View> : null}
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <LoginBtn
                        onClick={() => {
                            addToCart()
                            swipeUpDownRef.current.close()
                        }}
                        textColor={appearance.backgroundColor}
                        title="Add to Cart"
                    />

                </View>
            </RBSheet>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    main: {
        width: "95%",
        marginVertical: 8,
        flexDirection: "row",
        borderRadius: 15,
        padding: 5
    },
    image: {
        width: "100%",
        height: 110,
        borderRadius: 15,

    },
    addContainer: {
        width: 35,
        position: "absolute",
        bottom: 10,
        height: 35,
        borderRadius: 100,
        right: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    loveContainer: {
        width: 35,
        position: "absolute",
        top: 10,
        height: 35,
        borderRadius: 100,
        right: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    btnSection: {
        width: "100%",
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})



export default Index;







