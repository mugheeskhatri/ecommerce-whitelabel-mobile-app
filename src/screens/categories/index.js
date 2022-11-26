import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from "react-native"
import axios from "axios";

//import components
import Header from '../../components/headers/header'
import CategoryCard from '../../components/cards/categoryCard'
import API from "../../config/api";
import { useContext } from "react";
import { AuthContext } from "../../context";



const Index = ({ navigation }) => {

    const {appearance} = useContext(AuthContext)
    const { setSelectedCategory } = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const [indicator, setIndicator] = useState(true)


    useEffect(() => {
        axios.get(`${API}/category/get`)
            .then((res) => {
                setCategories(res.data)
                setIndicator(false)
            })
    }, [])

    if (indicator) {
        return <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator
                color={appearance.secondaryColor}
                size={"large"}
            />
        </View>
    }
    return (

        <View style={{ width: "100%", flex: 1, backgroundColor: appearance.backgroundColor }}>
            <ScrollView>
                <Header />
                <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 8, justifyContent: "space-around" }}>
                    {categories.map((v, i) => {
                        return (
                            <CategoryCard
                                onClick={() => {
                                    setSelectedCategory(v)
                                    navigation.navigate("SelectedCategory")
                                }}
                                data={v}
                                index={i}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )

}



export default Index;








