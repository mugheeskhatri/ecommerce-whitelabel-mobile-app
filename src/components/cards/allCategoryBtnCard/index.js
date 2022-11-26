import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { AuthContext } from "../../../context";



const Index = (props) => {
    const {appearance} =  useContext(AuthContext)
    return (
        <TouchableOpacity
            onPress={props.onClick}
            style={{...styles.mainCard,backgroundColor: appearance.backgroundColor,}}
        >
            <View style={{...styles.iconSection,backgroundColor: appearance.secondaryColor,}}>
                <MaterialIcons name="category" size={24} color={appearance.backgroundColor} />
            </View>
            <Text
                style={{ fontSize: 12,fontFamily:"Monstret_bold", color: appearance.secondaryColor, marginTop: 4 }}
            >
                All</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    mainCard: {
        width: 80,
        height: 80,
        marginVertical: 7,
        borderRadius: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    iconSection: {
        width: 45,
        height: 45,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    }
})



export default Index


