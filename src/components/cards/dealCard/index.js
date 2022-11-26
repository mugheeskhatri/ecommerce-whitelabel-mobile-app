import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native"
import API from "../../../config/api";

import { AuthContext } from "../../../context";


const Index = (props) => {
    const { appearance } = useContext(AuthContext)
    const [product, setProduct] = useState()


    useEffect(() => {
        axios.get(`${API}/product/get/single/${props.data}`)
            .then((res) => {
                setProduct(res.data)
            })
    }, [])


    return (
        <TouchableOpacity
            onPress={props.onClick}
            style={{ ...styles.cardMain, backgroundColor: appearance.contrastBackgroundColor, }}
            key={props.index}
        >
          {product?.image ?  <Image
                style={styles.image}
                source={{ uri: product?.image[0]?.src }}
            /> : null}
            <View style={{ ...styles.saleBtn, backgroundColor: appearance.secondaryColor, }}>
                <Text style={{ fontSize: 11, fontFamily: "Monstret_med", color: appearance.backgroundColor }}>
                    {props.percent}% Off
                </Text>
            </View>
            <View style={styles.detailSection}>
                <Text style={{ ...styles.productName, color: appearance.primaryLightColor }}>
                    {product?.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ position: "relative" }}>
                        <View style={{ width: "100%", borderWidth: .5, borderColor: appearance.primaryLightColor, position: "absolute", top: 8 }}>

                        </View>
                        <Text style={{ ...styles.price, color: appearance.primaryLightColor, fontSize: 12 }}>
                            {`${appearance.currency}.${product?.regularPrice}`}
                        </Text>
                    </View>
                    <Text style={{ ...styles.price, marginLeft: 10, color: appearance.primaryLightColor, fontSize: 12 }}>
                        {`${appearance.currency}.${(product?.regularPrice) - (product?.regularPrice / 100) * props.percent}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    cardMain: {
        width: 120,
        height: 150,

        marginLeft: 17,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 5,
        elevation: 1,
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        // borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    productName: {
        fontFamily: "Monstret_med",
    },
    price: {
        fontFamily: "Monstret_med",
    },
    detailSection: {
        width: "100%",
        paddingHorizontal: 5,
        paddingVertical: 7
    },
    saleBtn: {
        paddingHorizontal: 7,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        paddingVertical: 5,

        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999

    }
})


export default Index;












