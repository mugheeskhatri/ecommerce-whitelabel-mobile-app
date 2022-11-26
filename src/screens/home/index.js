import React, { useContext, useState } from "react";
import {
    View,
    Text,
    ScrollView
} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";



//import components
import Header from '../../components/headers/header'
import Carousel from '../../components/caruosel'
import FlashSale from '../../layouts/flashSale'
import Category from '../../layouts/category'
import PopularCategoryLayout from '../../layouts/popular'
import { useEffect } from "react";
import { AuthContext } from "../../context";
import NetInfo from "@react-native-community/netinfo";




const Index = ({ navigation }) => {
    const { appearance, setMyCart, myCart, user, setMyWishList } = useContext(AuthContext)
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        if(state.isConnected === false){
            navigation.navigate("Internet")
        }
      });
  

    useEffect(() => {
        AsyncStorage.getItem('ecommerce_cart')
            .then(async (res) => {
                const cartData = await res
                if (cartData !== null) {
                    setMyCart(JSON.parse(cartData))
                }
            })
        AsyncStorage.getItem('ecommerce_wishlist')
            .then(async (res) => {
                const wishlist = await res
                if (wishlist !== null) {
                    
                    setMyWishList(JSON.parse(res))
                }
            })
            
            unsubscribe();
        }, [navigation])
        
    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView
                nestedScrollEnabled
                style={{ width: "100%" }}
            >
                <Header
                    profileClick={() => navigation.navigate("Profile")}
                    onClick={() => navigation.navigate("Search")}
                />
                <Carousel />
                <Category
                    onOneCategory={() => navigation.navigate("SelectedCategory")}
                    onAllClick={() => navigation.navigate("Category")}
                />
                <FlashSale
                    onClick={() => navigation.navigate('FlashSale')}
                />
                <PopularCategoryLayout
                    onEyeClick={() => navigation.navigate("ProductDetail")}
                />
            </ScrollView>
        </View>
    )
}




export default Index;