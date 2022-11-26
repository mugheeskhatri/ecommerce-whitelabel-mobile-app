import React, { useContext } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import { AuthContext } from "../../../context";



const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <TouchableOpacity
            onPress={props.onClick}
            style={{ backgroundColor: appearance.secondaryColor, ...styles.btnMain }}
        >
            <Text
                style={{ ...styles.text, color: appearance.backgroundColor }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnMain: {
        width: "80%",

        borderRadius: 30,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",

    }
})




export default Index;






