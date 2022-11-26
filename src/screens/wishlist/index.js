import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import API from "../../config/api";



//import componenes
import HeaderWithBack from '../../components/headers/headerWithbackBtn'
import WishCard from '../../components/cards/wishlistCard'
import { AuthContext } from "../../context";




const Index = ({ navigation }) => {

    const { appearance , myWishlist } = useContext(AuthContext)
    const [wishData, setWishhData] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('ecommerce_wishlist')
            .then(async (res) => {
                const data = await JSON.parse(res)
                setWishhData(data)
            })
    }, [myWishlist])


    const deleteFromWish = (i) => {
        var data = [...wishData]
        data.splice(i, 1)
        AsyncStorage.setItem('ecommerce_wishlist', JSON.stringify(data))
            .then(() => {
                setWishhData(data)
            })
    }


    return (
        <View
            style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}
        >
            <ScrollView style={{ width: "100%" }}>
                <HeaderWithBack
                    onBack={() => navigation.goBack()}
                    title="My Wishlist"
                />

                {wishData.length < 1 ?
                    <View style={{width:"100%",height:600,alignItems:"center",justifyContent:"center",paddingHorizontal:25}}>
                        <Text
                            style={{ fontSize: 20 , color:appearance.secondaryColor , fontFamily:"Monstret_bold" , textAlign:"center" }}
                        >
                            You Have No Item in your wishhlist
                        </Text>
                    </View> : <View style={{ width: "100%", alignItems: "center" }}>
                        {wishData.map((v, i) => {
                            return (
                                <WishCard
                                    navigate={()=> navigation.navigate("ProductDetail")}
                                    deleteFromWish={() => deleteFromWish(i)}
                                    data={v}
                                    index={i}
                                />
                            )
                        })}
                    </View>}

            </ScrollView >

        </View >
    )
}










export default Index