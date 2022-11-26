import React, { useContext, useState } from "react";
import {
    Text,
    View,
    ScrollView,
    TextInput
} from "react-native";
import { AuthContext } from "../../context";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';



//import components
import Header from '../../components/headers/headerWithbackBtn'
import CartCard from '../../components/cards/cartCard'
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



//import components
import LoginBtn from '../../components/buttons/loginBtn'
import { useEffect } from "react";
import axios from "axios";
import API from "../../config/api";
import CartBorderCard from '../../components/cards/cartCards/cartBorderCard'
import CartBigImageCard from '../../components/cards/cartCards/cartBigImageCard'



const Index = ({ navigation }) => {

    const { appearance, myCart, setMyCart, discount, setDiscount, } = useContext(AuthContext)
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalAmounWithouDiscount, setTotalAmountWithoutDiscount] = useState("")
    const [coupen, setCoupen] = useState("")
    
    const [amountDiscount, setAmountDiscount] = useState()
    const [available, setAvailable] = useState(false)
    const swipeUpDownRef = useRef()

    useEffect(() => {
        var price = 0
        var without = 0
        var totalDiscount = 0
        for (var i = 0; i < myCart.length; i++) {
            price += (myCart[i].discountType === "Percentage" ? (Number(myCart[i].price) - Number(Number(myCart[i].price) / 100) * myCart[i].discountPercent) * Number(myCart[i].quantity) : (myCart[i].price - myCart[i].discountPercent) * Number(myCart[i].quantity))
            without += Number(myCart[i].price) * Number(myCart[i].quantity)
        }
        setTotalAmountWithoutDiscount(without)
        setTotalAmount(price)
        setAmountDiscount(without - price)
    }, [myCart, discount])

    const changeCoupenText = (e) => {
        setCoupen(e)
        if (e.length === 6) {
            axios.get(`${API}/coupen/find/${e}`)
                .then(async (res) => {
                    if (res.status === 202) {
                        setAvailable(true)
                        if (res.data.allDeal === "true") {
                            var afterCoupen = res.data.discountType === "Percentage" ? totalAmounWithouDiscount - (totalAmounWithouDiscount / 100 * res.data.percentOrAmount) : (totalAmounWithouDiscount - res.data.percentOrAmount)
                            setAmountDiscount(totalAmounWithouDiscount - afterCoupen)
                        } else if (res.data.allDeal === "false") {
                            var afterCoupen = res.data.discountType === "Percentage" ? (totalAmounWithouDiscount - amountDiscount) / 100 * res.data.percentOrAmount : res.data.percentOrAmount
                            setAmountDiscount(Number(amountDiscount) + Number(afterCoupen))
                        }

                    }
                })
        }

    }

    const deleteFromCart = (index) => {
        AsyncStorage.getItem('ecommerce_cart')
            .then(async (res) => {
                var cart = await JSON.parse(res)
                cart.splice(index, 1)
                AsyncStorage.setItem('ecommerce_cart', JSON.stringify(cart))
                    .then(() => {
                        setMyCart(cart)
                    })
            })
    }



    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            {myCart.length !== 0 ?
                <View style={{ width: "100%", flex: 1 }}>
                    <View style={{ width: "100%", flex: 1, paddingBottom: 115 }}>
                        <ScrollView>
                            <Header
                                onBack={() => navigation.goBack()}
                                title="My Cart"
                            />
                            {myCart?.length !== 0 ? <View style={{ width: "100%", marginTop: 10 }}>
                                <SwipeListView
                                    data={myCart}
                                    renderItem={(rowData, rowMap) => (
                                        <SwipeRow
                                            style={{ width: "100%", marginVertical: 8 }}
                                            disableRightSwipe={parseInt(rowData.item.key) % 2 !== 0}
                                            disableLeftSwipe={parseInt(rowData.item.key) % 2 === 0}
                                            leftOpenValue={20 + parseInt(rowData.item.key) * 5}
                                            rightOpenValue={-75}
                                            leftActivationValue={200}
                                        >
                                            <View style={styles.rowBack}>
                                                <View style={{ alignItems: "flex-end", width: "95%", backgroundColor: "red", borderRadius: 13 }}>
                                                    <View style={{ width: 80, alignItems: "center", justifyContent: "center", height: "100%", }}>
                                                        <TouchableOpacity
                                                            onPress={() => deleteFromCart(rowData.index)}
                                                            style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center" }}>
                                                            <AntDesign name="delete" size={24} color={appearance.backgroundColor} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.rowFront}>
                                                <CartCard
                                                    setAvailable={setAvailable}
                                                    setCoupen={setCoupen}
                                                    data={rowData}
                                                    index={rowMap}
                                                />
                                            </View>
                                        </SwipeRow>
                                    )}
                                />
                            </View> : null}
                            {/* {myCart?.length !== 0 ? myCart.map((v,i)=>{
                                return(
                                    <CartBorderCard
                                    onDelete={()=> deleteFromCart(i)}
                                    setAvailable={setAvailable}
                                    setCoupen={setCoupen}
                                    data={v}
                                    index={i}
                                    />
                                )
                            }):null} */}
                        </ScrollView>
                    </View>
                    <View style={{ ...styles.checkoutContainer, backgroundColor: appearance.secondaryColor }}>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ width: "50%", paddingLeft: 20, }}>
                                <Text style={{ fontSize: 20, fontFamily: "Monstret_bold", color: appearance.backgroundColor }}>
                                    Total
                                </Text>
                            </View>
                            <View style={{ width: "50%", alignItems: "flex-end", paddingRight: 20 }}>
                                <Text style={{ fontSize: 20, fontFamily: "Monstret_bold", color: appearance.backgroundColor }}>
                                    {appearance.currency}.{totalAmounWithouDiscount - amountDiscount}
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                            <LoginBtn
                                onClick={() => swipeUpDownRef.current.open()}
                                textColor={appearance.secondaryColor}
                                width="90%"
                                title="DETAILS"
                                bgColor={appearance.contrastBackgroundColor}
                            />
                        </View>
                    </View>

                    <RBSheet
                        ref={swipeUpDownRef}
                        height={280}
                        openDuration={320}
                        closeOnDragDown
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: appearance.secondaryColor,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20
                            },

                        }}
                    >
                        <View style={{ width: "100%", flex: 6, paddingHorizontal: 20 }}>
                            <ScrollView style={{ width: "100%" }}>
                                <View style={{ width: "100%", alignItems: "center" }}>
                                    <View style={{ width: "95%", flexDirection: "row", marginTop: 5, borderRadius: 12, paddingVertical: 5, borderWidth: .5, borderColor: appearance.contrastBackgroundColor }}>
                                        <TextInput
                                            editable={available ? false : true}
                                            value={coupen}
                                            onChangeText={(e) => changeCoupenText(e)}
                                            placeholder="Enter Coupen if you have"
                                            placeholderTextColor={appearance.contrastBackgroundColor}
                                            style={{ width: "65%", fontFamily: "Monstret_light", paddingLeft: 10, color: appearance.contrastBackgroundColor }}
                                        />
                                        <View style={{ width: "35%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingRight: 10 }}>
                                            <Text style={{ fontFamily: "Monstret_light", color: appearance.contrastBackgroundColor, fontSize: 11 }}>
                                                {available ? "Available" : "Not Available"}
                                            </Text>
                                            <AntDesign name={available ? "checkcircleo" : "closecircleo"} size={15} color={appearance.contrastBackgroundColor}
                                                style={{ marginLeft: 5 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", paddingBottom: 3, marginTop: 20, }}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={{ fontFamily: "Monstret_light", fontSize: 18, color: appearance.backgroundColor }}>
                                            Sub Total
                                        </Text>
                                    </View>
                                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                                        <Text style={{ fontFamily: "Monstret_bold", fontSize: 18, color: appearance.backgroundColor }}>
                                            {appearance.currency}.{totalAmounWithouDiscount}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", marginTop: 5, paddingBottom: 10, borderBottomColor: appearance.backgroundColor, borderBottomWidth: 1 }}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={{ fontFamily: "Monstret_light", fontSize: 18, color: appearance.backgroundColor }}>
                                            Discount
                                        </Text>
                                    </View>
                                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                                        <Text style={{ fontFamily: "Monstret_bold", fontSize: 18, color: appearance.backgroundColor }}>
                                            {appearance.currency}.{amountDiscount}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", marginTop: 10, paddingBottom: 10, }}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={{ fontFamily: "Monstret_light", fontSize: 18, color: appearance.backgroundColor }}>
                                            Total
                                        </Text>
                                    </View>
                                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                                        <Text style={{ fontFamily: "Monstret_bold", fontSize: 18, color: appearance.backgroundColor }}>
                                            {appearance.currency}.{totalAmounWithouDiscount - amountDiscount}
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ width: "100%", flex: 2, alignItems: "center" }}>
                            <LoginBtn
                                onClick={() => {
                                    navigation.navigate("Checkout")
                                    setDiscount(amountDiscount)
                                }}
                                textColor={appearance.secondaryColor}
                                width="90%"
                                title="CHECKOUT"
                                bgColor={appearance.contrastBackgroundColor}
                            />
                        </View>
                    </RBSheet>
                </View>
                : <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 22, fontFamily: "Monstret_bold", color: appearance.secondaryColor }}>
                        You Have No Items In Your Cart
                    </Text>
                    <TouchableOpacity
                    onPress={()=> navigation.navigate("Home1")}
                    style={{ backgroundColor: appearance.secondaryColor, ...styles.continueShoppingBtn}}>
                        <Text style={{ fontFamily: "Monstret_med", fontSize: 18, color: appearance.backgroundColor }}>
                            Continue Shopping
                        </Text>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    rowBack: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    checkoutContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        right: 0,
        height: 110,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    continueShoppingBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        marginVertical:30
    }
})



export default Index;