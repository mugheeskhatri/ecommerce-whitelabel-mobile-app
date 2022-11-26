import React from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { AuthContext } from "../../../context";

const Index = (props) => {
    const {appearance} = useContext(AuthContext)


    return (
        <View style={styles.headerMain}>
            <View style={{ width: "20%", paddingLeft: 20 }}>
                <TouchableOpacity
                onPress={props.profileClick}
                style={{ ...styles.iconContainer,backgroundColor: appearance.backgroundColor, }}>
                    <Ionicons name="ios-menu-outline" size={20} color={appearance.primaryLightColor} />
                </TouchableOpacity>
            </View>
            <View style={{ width: "80%", flexDirection: "row", paddingRight: 20, }}>
                <TouchableOpacity
                onPress={props.onClick}
                style={{ ...styles.search , backgroundColor: appearance.backgroundColor, }}>
                    <View style={{ width: "80%", paddingLeft: 20 }}>
                        <Text style={{ fontSize: 12,fontFamily:"Monstret_med", color: appearance.primaryLightColor }}>
                            Search What's in your mind
                        </Text>
                    </View>
                    <View style={{ width: "20%", alignItems: "flex-end", paddingRight: 10 }}>
                        <EvilIcons name="search" size={24} color={appearance.primaryLightColor} />
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}



const styles = StyleSheet.create({
    headerMain: {
        width: "100%",
        flexDirection: "row",
        height: 90,
        alignItems: "flex-end",
        paddingBottom: 4
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
    },
    search: {
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
        width: "100%",
        flexDirection: "row"
    }
})



export default Index;










