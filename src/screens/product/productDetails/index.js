import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AntDesign } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import { MaterialIcons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";

//import components
import Header from '../../../components/headers/headerWithbackBtn'
import SizeCard from '../../../components/cards/sizeCard'
import ColorCard from '../../../components/cards/colorCard'
import { useContext } from "react";
import { AuthContext } from "../../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";








const Index = ({ navigation }) => {


    var [addedToWish, setAddedToWish] = useState(false)
    const { appearance, discountForThis, discountTypeForThis } = useContext(AuthContext)
    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };
    const _renderItem = ({ item, index }) => {
        return (
            <View
                key={index}
                style={{ backgroundColor: appearance.backgroundColor, ...styles.imageContainer }}>
                <Image
                    style={{ borderColor: appearance.contrastBackgroundColor, ...styles.image }}
                    source={{ uri: item.src }}

                />
            </View>
        );
    }
    useEffect(() => {
        for (var i = 0; i < myWishlist.length; i++) {
            if (myWishlist[i] === currentProduct._id) {
                setAddedToWish(true)
                break;
            }
        }
    }, [])

    const { currentProduct, myCart, setMyCart, myWishlist, setMyWishList } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(1)
    const [selectedTab, setSelectedTab] = useState("description")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [activeSlide, setActiveSlide] = useState(0)
    const [slider, setSlider] = useState([])
    const [amountWithoutDiscount, setAmountWithoutDiscount] = useState(currentProduct.regularPrice * quantity)
    const [amountOfProduct, setAmountOfProduct] = useState(discountTypeForThis === "Percentage" ? quantity * (currentProduct.regularPrice - currentProduct.regularPrice / 100 * discountForThis) : quantity * (currentProduct.regularPrice - discountForThis))
    const [discountAmount, setDiscountAmount] = useState(discountTypeForThis === "Percentage" ? amountWithoutDiscount / 100 * discountForThis : discountForThis * quantity)
    const sliderWidth = Dimensions.get("window").width;
    console.log("discountAmount", discountAmount)
    console.log("discountAmount", discountTypeForThis)
    const addProduct = async () => {
        if (currentProduct.differentSizes === "Yes" && selectedSize === "") {
            showToast("Plese Select Size")
        } else if (currentProduct.differentColors === "Yes" && selectedColor === "") {
            showToast("Plese Select Color")
        } else {
            const data = myCart?.filter(product => product?.productId === currentProduct?._id)
            if (data.length >= 1) {
                showToast("Already Added to Cart")
            } else {
                const form = {
                    name: currentProduct.name,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: quantity,
                    price: currentProduct.regularPrice,
                    productId: currentProduct._id,
                    image: currentProduct?.image[0],
                    discountAmount,
                    discountType: discountTypeForThis,
                    discountPercent: discountForThis
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
                            navigation.navigate("Home1")
                    })
            }
        }
    }

    const addToWishlist = () => {
        var wish = [...myWishlist]
        wish.unshift(currentProduct._id)
        setAddedToWish(true)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(wish))
            .then(async (res) => {
                setMyWishList(wish)
            })
        console.log(wish)
    }


    const deleteFromWish = () => {
        var wish = [...myWishlist]
        const filtered = wish.filter(id => id !== currentProduct._id)
        setAddedToWish(false)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(filtered))
            .then(() => {
                setMyWishList(filtered)
            })
    }


    useEffect(() => {
        var mughees = []
        currentProduct?.image.map((v) => {
            mughees.push(v.src)
            setSlider(mughees)
        })
    }, [])



    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <View style={{ width: "100%", flex: 8 }}>
                <ScrollView
                    style={{ width: "100%" }}
                >
                    <Header
                        onBack={() => navigation.goBack()}
                        title="Product Detail"
                    />
                    <View style={{ marginTop: 5 }}>
                        <SliderBox
                            autoplay
                            images={slider}
                            sliderBoxHeight={220}
                            dotColor="transparent"
                            inactiveDotColor="transparent"
                            autoplayInterval={5000}
                            ImageComponentStyle={{
                                borderRadius: 20, width: '93%', marginTop: 5,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,

                                elevation: 2, marginBottom: 10
                            }}
                        />
                        {/* <View style={{width:"100%"}}>
                        <Pagination
                            dotsLength={currentProduct.colorAttributes.length}
                            activeDotIndex={activeSlide}
                            containerStyle={{ backgroundColor: appearance.backgroundColor }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 8,
                                backgroundColor: 'black'
                            }}
                            inactiveDotStyle={{
                                // Define styles for inactive dots here
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View> */}
                    </View>
                    {/* <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ width: "100%", borderBottomColor: appearance.contrastBackgroundColor, borderBottomWidth: 1, paddingBottom: 15 }}>
                    {currentProduct.colorAttributes.map((v, i) => {
                        return (
                            <TouchableOpacity style={{ marginLeft: 6, width: 100, height: 40, backgroundColor: v.colorCode, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, color: v.colorCode === "black" || v.colorCode === "#000" || v.colorCode === "#fff" ? "white" : "black", fontWeight: "bold" }}>
                                    {v.colorName}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView> */}



                    {/* name and ProductDetails */}


                    <View style={{ width: "100%", paddingHorizontal: 20 }}>
                        <View
                            style={{ width: "100%", flexDirection: "row" }}
                        >
                            <View style={{ width: "87%", paddingTop: 5 }}>
                                <Text style={{ ...styles.name, color: appearance.primaryColor, }}>
                                    {currentProduct.name}
                                </Text>
                                <Text style={{ color: appearance.primaryLightColor, ...styles.shortDescription }}>
                                    {currentProduct.shortDescription}
                                </Text>
                            </View>
                            <View style={{ width: "13%", alignItems: "flex-end", padding: 8 }}>
                                <TouchableOpacity
                                    onPress={() => addedToWish ? deleteFromWish() : addToWishlist()}
                                >
                                    {addedToWish ? <AntDesign name="heart" size={20} color={appearance.secondaryColor} /> : <AntDesign name="hearto" size={20} color={appearance.secondaryColor} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", marginTop: 10, paddingBottom: 10, borderBottomColor: appearance.contrastBackgroundColor, borderBottomWidth: 2 }}>
                            <View style={{ width: "50%", flexDirection: "row", }}>
                                <View style={{ justifyContent: "center" }}>
                                    <AntDesign name="star" size={20} color="#F5E633" />
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                    <Text style={{ color: appearance.primaryColor, fontSize: 16, fontWeight: "500" }}>
                                        4.9
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center", fontFamily: "Monstret_med" }}>
                                    <Text style={{ color: appearance.primaryColor, fontSize: 13, fontWeight: "300" }}>
                                        {` (${currentProduct.reviews.length})`}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: "50%", alignItems: "flex-end", fontFamily: "Monstret_med" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ ...styles.price, color: appearance.secondaryColor, }}>
                                        {`${appearance.currency}.${discountTypeForThis === "Percentage" ? (currentProduct.regularPrice) - (currentProduct.regularPrice / 100 * discountForThis) : (currentProduct.regularPrice) - (discountForThis)}`}
                                    </Text>
                                    {discountForThis !== "" ? <View style={{ marginLeft: 10, justifyContent: "center", position: "relative" }}>
                                        <View style={{ borderWidth: .5, borderColor: appearance.secondaryColor, width: "100%", position: "absolute", top: 12 }}>
                                        </View>
                                        <Text style={{ ...styles.regularPrice, color: appearance.secondaryColor, }}>
                                            {`${appearance.currency}.${currentProduct?.regularPrice}`}
                                        </Text>
                                    </View> : null}
                                </View>
                            </View>





                        </View>
                    </View>

                    {/* name and ProductDetails */}

                    {/* size */}

                    {currentProduct.differentSizes === "Yes" ? <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 14, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                            Available Sizes
                        </Text>
                        <ScrollView
                            style={{ marginTop: 5 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {currentProduct.sizeAttributes.map((v, i) => {
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

                    {/* size */}


                    {/* colors */}

                    {currentProduct.differentColors === "Yes" ? <View style={{ width: "100%", paddingHorizontal: 20, }}>
                        <View style={{ width: "100%", borderBottomColor: appearance.contrastBackgroundColor, borderBottomWidth: 2, paddingBottom: 5 }}>
                            <Text style={{ fontSize: 14, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                                Colors
                            </Text>
                            <ScrollView
                                style={{ marginTop: 5 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {currentProduct.colorAttributes.map((v, i) => {
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
                        </View>
                    </View> : null}

                    {/* colors */}

                    {/* description and reviews */}


                    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
                        <View style={{ marginLeft: 20, borderBottomColor: appearance.primaryLightColor, borderBottomWidth: selectedTab === "description" ? 1 : 0 }}>
                            <TouchableOpacity
                                onPress={() => setSelectedTab("description")}
                            >
                                <Text style={{ color: appearance.primaryColor, fontFamily: "Monstret_bold", fontSize: 15 }}>
                                    Description
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 20, borderBottomColor: appearance.primaryLightColor, borderBottomWidth: selectedTab !== "description" ? 1 : 0, paddingBottom: 4 }}>
                            <TouchableOpacity
                                onPress={() => setSelectedTab("reviews")}
                            >
                                <Text style={{ color: appearance.primaryColor, fontFamily: "Monstret_bold", fontSize: 15 }}>
                                    Reviews
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {selectedTab === "description" ?
                        <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontFamily: "Monstret_med", color: appearance.primaryLightColor }}>
                                {currentProduct.longDescription}
                            </Text>
                        </View> :
                        <View style={{ width: "100%" }}>
                            {currentProduct.reviews.length === 0 ?
                                <View style={{ width: "100%", alignItems: "center", paddingTop: 40 }}>
                                    <Text style={{ fontSize: 20, fontFamily: "Monstret_med", color: appearance.secondaryColor }}>
                                        No Review For this product
                                    </Text>
                                </View> :
                                <View style={{ width: "100%" }}>
                                    {currentProduct.reviews.map((v, i) => {
                                        return (
                                            <View></View>
                                        )
                                    })}
                                </View>
                            }
                        </View>
                    }

                    {/* description and reviews */}

                </ScrollView>
            </View>
            <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: appearance.secondaryColor, ...styles.addToCartSection }}>
                    <View style={{ width: "38%", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: "80%", height: 45, alignItems: "center", justifyContent: "center", backgroundColor: appearance.secondaryColor, backgroundColor: appearance.contrastBackgroundColor, borderRadius: 20, flexDirection: "row" }}>
                            <View style={{ width: "33%", alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setQuantity(quantity === 1 ? quantity : quantity - 1)
                                        setDiscountAmount(quantity === 1 ? discountAmount : discountTypeForThis === "Percentage" ? discountAmount - currentProduct.regularPrice / 100 * discountForThis : discountAmount - discountForThis)
                                        setAmountOfProduct(quantity === 1 ? amountOfProduct : discountTypeForThis === "Percentage" ? amountOfProduct - Number((currentProduct.regularPrice) - (currentProduct.regularPrice / 100 * discountForThis)) : amountOfProduct - Number((currentProduct.regularPrice - discountForThis)))
                                    }}
                                >
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color={appearance.secondaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "33%", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 18, fontFamily: "Monstret_bold", color: appearance.secondaryColor }}>
                                    {quantity}
                                </Text>
                            </View>
                            <View style={{ width: "33%", alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setQuantity(quantity + 1)
                                        setDiscountAmount(discountTypeForThis === "Percentage" ? discountAmount + currentProduct.regularPrice / 100 * discountForThis : Number(discountAmount) + Number(discountForThis))
                                        setAmountOfProduct(amountOfProduct + Number((currentProduct.regularPrice) - (discountTypeForThis === "Percentage" ? currentProduct.regularPrice / 100 * discountForThis : discountForThis)))
                                    }}
                                >
                                    <MaterialIcons name="keyboard-arrow-up" size={24} color={appearance.secondaryColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "25%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Monstret_bold", fontSize: 18, color: appearance.backgroundColor }}>
                            Rs.{amountOfProduct}
                        </Text>
                    </View>
                    <View style={{ width: "37%", alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => addProduct()}
                            style={{ width: "90%", height: 45, alignItems: "center", justifyContent: "center", backgroundColor: appearance.secondaryColor, backgroundColor: appearance.contrastBackgroundColor, borderRadius: 15, }}>
                            <Text style={{ fontSize: 15, fontFamily: "Monstret_bold", color: appearance.secondaryColor }}>
                                Add to Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )

}



const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 270,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 10,
        borderRadius: 10,
        marginBottom: 5,
        borderWidth: 1
    },
    imageContainer: {
        width: "100%",

        padding: 10
    },
    name: {
        fontSize: 24,
        fontWeight: "600",

        lineHeight: 25,
        fontFamily: "Monstret_bold"
    },
    shortDescription: {
        fontSize: 12,

        lineHeight: 13,
        fontFamily: "Monstret_med"
    },
    price: {
        fontSize: 18,

        fontWeight: "600",
        letterSpacing: 0,
        fontFamily: "Monstret_bold"
    },
    regularPrice: {
        fontSize: 14,

        fontWeight: "400",
        fontFamily: "Monstret_med"
    },
    addToCartSection: {
        width: "95%",
        flexDirection: "row",
        height: 60,
        borderRadius: 25
    }
})



export default Index;