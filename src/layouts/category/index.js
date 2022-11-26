import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

//import components
import CategorySmallCard from '../../components/cards/categorySmallCard'
import AllCategoryBtn from '../../components/cards/allCategoryBtnCard'
import { useEffect } from "react";
import axios from "axios";
import API from "../../config/api";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context";



const Index = (props) => {

    const {appearance} = useContext(AuthContext)
    const [categories, setCategories] = useState([])


    useEffect(() => {
        axios.get(`${API}/category/get`)
            .then((res) => {
                const category = res.data
                if (categories.length > 7) {
                    setCategories(category.slice(0, 7))
                } else {
                    setCategories(res.data)
                }
            })
    }, [])

    return (
        <View style={{...styles.main,backgroundColor: appearance.backgroundColor,}}>
            <AllCategoryBtn
                onClick={props.onAllClick}
            />
            {categories?.map((v, i) => {
                return (
                    <CategorySmallCard
                        onClick={props.onOneCategory}
                        data={v}
                        index={i}
                    />
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({

    main: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 8,
        shadowColor: "gray",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        paddingHorizontal:10
    }
})




export default Index;










