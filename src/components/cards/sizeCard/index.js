import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import {
    TouchableOpacity,
    Text
} from "react-native";
import { AuthContext } from "../../../context";





const Index = (props) => {

    const { appearance } = useContext(AuthContext)


    return (
        <TouchableOpacity
            key={props.index}
            onPress={props.onClick}
            style={{ ...styles.btnMain, marginLeft: props.index < 1 ? 0 : 10, backgroundColor: props.selectedSize === props.size ? appearance.secondaryColor : appearance.backgroundColor, borderColor: appearance.secondaryColor }}>
            <Text style={{ fontSize: 14, fontFamily: "Monstret_bold", color: props.selectedSize === props.size ? appearance.backgroundColor : appearance.secondaryColor }}>
                {props.size}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnMain: {
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: .5,
        marginRight: 1,

    }
})

export default Index;




