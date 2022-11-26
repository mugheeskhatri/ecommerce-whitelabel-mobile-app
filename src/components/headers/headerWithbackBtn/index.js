import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../../../context";



const Index = (props) => {

    const {appearance} = useContext(AuthContext)

    return (
        <View style={styles.headerMain}>
            <View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                onPress={props.onBack}
                style={{...styles.iconContainer,backgroundColor: appearance.backgroundColor,}}>
                    <Ionicons name="arrow-back" size={18} color={appearance.primaryLightColor} />
                </TouchableOpacity>
            </View>
            <View style={{width:"60%",alignItems:"center",justifyContent:"center",paddingBottom:props.shortDescription ? 0 : 4}}>
                <Text style={{fontSize:20,color:appearance.primaryColor , fontWeight:"500",fontFamily:"Monstret_bold"}}>
                    {props.title}
                </Text>
                {props.shortDescription ? <Text style={{fontSize:11,fontFamily:"Monstret_med",color:appearance.primaryLightColor}}>
                    {props.shortDescription}
                </Text> : null}
            </View>
            <View style={{width:"20%",alignItems:"center",justifyContent:"center"}}>
                
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










