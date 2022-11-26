import React, { useContext } from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import { AuthContext } from "../../../context";






const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <View style={{ width: "100%", alignItems: "center", }}>
               <View style={{width:"90%"}}>
               <Text style={{fontFamily:"Monstret_bold",fontSize:13,color:appearance.primaryLightColor,marginBottom:2}}>
                {props.title} :
                </Text>
               </View>
            <View style={{ borderColor: appearance.primaryLightColor,backgroundColor: appearance.backgroundColor,...styles.inputContainer}}>
                <TextInput
                    value={props.value}
                    onChangeText={props.onChange}
                    style={{ ...styles.input, color: appearance.primaryLightColor }}
                    placeholder={props.placeholder}
                    placeholderTextColor={appearance.primaryLightColor}
                    keyboardType={props.number ? "numeric" : "default"} />

            </View>
        </View >

    )
}


const styles = StyleSheet.create({
    inputContainer: {
        width: "90%",
        flexDirection: "row",
        borderWidth: .5,
        paddingLeft: 10,
        paddingVertical: 3,
        borderRadius: 10
    },
    input: {
        width: "100%",
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: "Monstret_bold",
    }
})



export default Index