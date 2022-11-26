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
            style={{ ...styles.btnMain, backgroundColor: props.bgColor ? props.bgColor : appearance.secondaryColor, width: props.width ? props.width : "80%", }}
        >
            <Text
                style={{ ...styles.text, color: props.textColor }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnMain: {

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
        fontFamily: "Monstret_bold"
    }
})




export default Index;






