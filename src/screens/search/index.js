import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import API from "../../config/api";
import { AuthContext } from "../../context";



//import componenttts
import ProductCard from '../../components/cards/productCard'
import SearchHeader from '../../components/headers/searchHeader'




const Index = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const { setCurrentProduct, appearance } = useContext(AuthContext)
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    useEffect(() => {
        axios.get(`${API}/products/get`)
            .then(async (res) => {
                await setFilteredDataSource(res.data)
                await setMasterDataSource(res.data)
            })
    }, [])


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


    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView
                style={{ width: "100%" }}
            >
                <View style={{ flexDirection: "row" }}>
                    <SearchHeader
                        placeholder="Search Product"
                        value={search}
                        onChangeText={(text) => searchFilterFunction(text)}
                    />
                </View>
                <View style={{ width: "100%", justifyContent: "space-around", paddingHorizontal: 5, flexDirection: "row", flexWrap: "wrap" }}>
                    {filteredDataSource.length !== 0 ? filteredDataSource.map((v, i) => {
                        return (
                            <ProductCard
                                onEyeClick={() => {
                                    navigation.navigate("ProductDetail")
                                    setCurrentProduct(v)
                                }}
                                data={v}
                                index={i}
                            />
                        )
                    }) :
                        <View style={{ width: "100%", height: 400, paddingHorizontal: 15, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, fontFamily: "Monstret_bold", color: appearance.secondaryColor, textAlign: "center" }}>
                                No Product Found with this search result
                            </Text>
                        </View>
                    }

                </View>
            </ScrollView>
        </View>
    )
}










export default Index;