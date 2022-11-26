import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../../context";


const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <TouchableOpacity
            onPress={props.onClick}
            style={{ backgroundColor: appearance.contrastBackgroundColor, ...styles.cardMain }}
            key={props.index}
        >
            <View style={{ backgroundColor: appearance.backgroundColor, ...styles.arrowSection }}>
                <AntDesign name="arrowright" size={18} color={appearance.secondaryColor} />
            </View>
            <Text
                style={{ fontSize: 12, color: appearance.secondaryColor, marginTop: 10, fontWeight: "500" }}
            >
                View More</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    cardMain: {
        width: 120,

        marginHorizontal: 17,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    arrowSection: {
        width: 40,
        height: 40,
        borderRadius: 100,

        alignItems: "center",
        justifyContent: "center"
    }
})


export default Index;












