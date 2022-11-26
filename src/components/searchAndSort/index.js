import React from "react";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { AuthContext } from "../../context";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";


const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5 }}>
            <View style={{ width: "82%", justifyContent: "center" }}>
                <View style={{ ...styles.searchContainer, backgroundColor: appearance.backgroundColor, }}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <AntDesign name="search1" size={20} color={appearance.primaryLightColor} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        onBlur={props.onblur}
                        onFocus={props.onfocus}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChangeText={props.onChangeText}
                        style={{ ...styles.input, color: appearance.primaryLightColor }}
                        placeholderTextColor={appearance.primaryLightColor}
                    />
                </View>
            </View>
            <View style={{ width: "18%" }}>
                <TouchableOpacity style={{ ...styles.sortBtn, backgroundColor: appearance.backgroundColor }}>
                    <Ionicons name="filter" size={24} color={appearance.primaryLightColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    searchContainer: {
        width: "95%",
        flexDirection: "row",
        height: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
        borderRadius: 15
    },
    iconContainer: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "100%",
        fontFamily: "Monstret_med"
    },
    sortBtn: {
        width: "100%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
    }
})



export default Index



