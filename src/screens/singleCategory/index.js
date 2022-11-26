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
import { SliderBox } from "react-native-image-slider-box";

//import componnents
import Header from '../../components/headers/headerWithbackBtn'
import SearchAndSort from '../../components/searchAndSort'
import ProductCard from '../../components/cards/productCard'





const Index = ({ navigation }) => {

    const [indicator, setIndicator] = useState(true)
    const [products, setProducts] = useState([])
    const { selectedCategory, setCurrentProduct, appearance } = useContext(AuthContext)
    const [discount, setDiscount] = useState("")
    const [discountType, setDiscountType] = useState("")
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false)
    const [slider, setSlider] = useState([])


    useEffect(() => {
        const data = []
        selectedCategory.images.map((v) => {
            data.push(v.src)
        })
        setSlider(data)
    }, [])
    console.log("slider", slider)

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };


    useEffect(() => {
        axios.get(`${API}/product/get/category/${selectedCategory._id}`)
            .then((res) => {
                setFilteredDataSource(res.data)
                setMasterDataSource(res.data)
                setIndicator(false)
            })
        if (selectedCategory.saleId !== "") {
            axios.get(`${API}/categorySale/get/single/${selectedCategory.saleId}`)
                .then(async (res) => {
                    console.log("res", res.data)
                    if (res.data.length !== 0) {
                        setDiscount(res.data.percentOrAmount)
                        setDiscountType(res.data.discountType)
                    }
                })
        }
    }, [])

    console.log("selectedCategory.images", selectedCategory.images)

    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView style={{ width: "100%" }}>
                <Header
                    onBack={() => navigation.goBack()}
                    title={'Flash Sale'}
                    shortDescription={selectedCategory.shortDescription}
                />
                {!searchFocus ? <View style={{ width: "100%", marginTop: 20, }}>
                <SliderBox
                autoplay
                images={slider}
                sliderBoxHeight={220}
                dotColor="transparent"
                inactiveDotColor="transparent"
                autoplayInterval={5000}
                ImageComponentStyle={{borderRadius: 20,width: '93%', marginTop: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                
                elevation: 2,marginBottom:10}}
            />
                </View> : null}

                <View style={{ marginTop: searchFocus ? 5 : 0 }}>
                    <SearchAndSort
                        placeholder="Search"
                        value={search}
                        onblur={() => setSearchFocus(false)}
                        onfocus={() => setSearchFocus(true)}
                        onChangeText={(text) => searchFilterFunction(text)}
                    />

                </View>
                {indicator ? <View style={{ width: "100%", height: 400, justifyContent: "center" }}>
                    <ActivityIndicator
                        size={"large"}
                        color={appearance.secondaryColor}
                    />
                </View> :
                    <View style={styles.cardContainer}>
                        {filteredDataSource.length === 0 ? <View style={{ width: "100%", alignItems: "center", height: 400, justifyContent: "center" }}>
                            <Text style={{ fontSize: 20, fontFamily: "Monstret_med", color: appearance.secondaryColor, textAlign: "center" }}>
                                No Product Available in this Category
                            </Text>
                        </View> :
                            filteredDataSource.map((v, i) => {
                                return (
                                    <ProductCard
                                        discountType={discountType}
                                        discount={discount}
                                        onEyeClick={() => {
                                            setCurrentProduct(v)
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




