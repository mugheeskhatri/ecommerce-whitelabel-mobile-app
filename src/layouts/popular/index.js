import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";



//import components
import ProductCard from '../../components/cards/productCard'
import ProductImageBoxCard from '../../components/cards/productCards/productImageBoxCard'
import ProductLandCard from '../../components/cards/productCards/productLandCard'
import API from "../../config/api";
import { AuthContext } from "../../context";




const Index = (props) => {

    const { setCurrentProduct, appearance } = useContext(AuthContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API}/products/get`)
            .then((res) => {
                setProducts(res.data.length > 10 ? res.data.slice(-10) : res.data)
            })
    }, [])




    return (
        <View style={styles.main}>
            <Text style={{ ...styles.heading, color: appearance.primaryColor, }}>
                Popular Products
            </Text>
            <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", marginTop: 8, justifyContent: "space-around", paddingHorizontal: 8 }}>

                {products.map((v, i) => {
                    return (
                        <ProductImageBoxCard
                            popular={true}
                            onEyeClick={() => {
                                setCurrentProduct(v)
                                props.onEyeClick()
                            }
                            }
                            data={v}
                            index={i}
                        />
                    )
                })}

            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    main: {
        width: "100%",
        marginTop: 5
    },
    heading: {
        fontSize: 22,
        fontFamily:"Monstret_bold",
        marginLeft: 15
    }
})





export default Index