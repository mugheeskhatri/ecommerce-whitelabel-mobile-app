import React from "react";
import { useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native"
import { AuthContext } from "../../../context";





const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <TouchableOpacity
            onPress={props.onClick}
            key={props.index}
            style={{ ...styles.mainCard, backgroundColor: appearance.contrastBackgroundColor, }}>
            <Image
                source={{ uri: props.data.categoryImage }}
                style={styles.image}
            />
            <Text style={{ ...styles.name, color: appearance.primaryColor, }}>
                {props.data.name}
            </Text>
            <Text style={{ ...styles.description, color: appearance.primaryColor }}>
                {props.data.shortDescription}
            </Text>
        </TouchableOpacity>
    )

}



const styles = StyleSheet.create({
    mainCard: {
        width: "45%",
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
        borderRadius: 10
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 100
    },
    name: {
        fontSize: 20,
        fontFamily:"Monstret_bold",
        fontWeight: "600",
        marginTop: 8
    },
    description: {
        fontSize: 12,
        fontWeight: "300",
        fontFamily:"Monstret_light"
    }
})






export default Index;
