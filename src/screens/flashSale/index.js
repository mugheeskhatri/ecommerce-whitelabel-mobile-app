import React, { useContext, useState, useEffect } from "react";
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image,
    ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import API from "../../config/api";
import { AuthContext } from "../../context";
import Carousel from 'react-native-snap-carousel';


//import componnents
import Header from '../../components/headers/headerWithbackBtn'
import SearchAndSort from '../../components/searchAndSort'
import FlashSaleCard from '../../components/cards/flashSaleBigCard'





const Index = ({ navigation }) => {

    const [indicator, setIndicator] = useState(true)
    const [products, setProducts] = useState([])
    const { selectedCategory, setCurrentProduct, appearance, setDiscountForThis } = useContext(AuthContext)
    const [discount, setDiscount] = useState("")
    const [sale, setSale] = useState([])
    const [discountType, setDiscountType] = useState("")

    useEffect(() => {
        axios.get(`${API}/flashSale/get`)
            .then((res) => {
                setSale(res.data[0])
                setDiscount(res.data[0].percentOrAmount)
                setIndicator(false)
                setDiscountType(res.data[0].discountType)
            })
    }, [])


    const sliderWidth = Dimensions.get("window").width;
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ ...styles.imageContainer, backgroundColor: appearance.backgroundColor, }}>
                <Image
                    style={styles.image}
                    source={{ uri: item.src }}

                />
            </View>
        );
    }





    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView style={{ width: "100%" }}>
                <Header
                    onBack={() => navigation.goBack()}
                    title="Flash Sale"
                />
                <View style={{ width: "100%", marginTop: 20, }}>
                    <Carousel
                        layout={'default'}
                        data={sale.sliderImage}
                        renderItem={_renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={sliderWidth}
                        loop={true}
                        autoplay={true}
                        autoplayInterval={4000}

                    />
                </View>

                <SearchAndSort />

                {indicator ? <View style={{ width: "100%", height: 400, justifyContent: "center" }}>
                    <ActivityIndicator
                        size={"large"}
                        color={appearance.secondaryColor}
                    />
                </View> :
                    <View style={styles.cardContainer}>
                        {sale.products.length === 0 ? <View style={{ width: "100%", alignItems: "center", height: 400, justifyContent: "center" }}>
                            <Text style={{ fontSize: 20, fontFamily: "Monstret_med", color: appearance.secondaryColor, textAlign: "center" }}>
                                No Product Available in this Category
                            </Text>
                        </View> :
                            sale?.products?.map((v, i) => {
                                return (
                                    <FlashSaleCard
                                        discountType={discountType}
                                        discount={discount}
                                        onEyeClick={() => {
                                            setDiscountForThis(discount)
                                            navigation.navigate("ProductDetail")
                                        }}
                                        data={v}
                                        index={i}
                                    />

                                )
                            })
                        }
                    </View>
                }


            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 170,
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
        marginBottom: 10,
    },
    imageContainer: {
        width: "100%",

        paddingHorizontal: 10
    },
    cardContainer: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 8,
        flexWrap: "wrap",
        justifyContent: "space-around"
    }
})


export default Index;




