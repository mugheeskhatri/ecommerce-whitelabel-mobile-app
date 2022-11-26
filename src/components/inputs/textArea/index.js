import React, { useContext } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet
} from "react-native";
import { AuthContext } from "../../../context";






const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <View style={{ width: "100%", alignItems: "center" }}>
            <View style={{ ...styles.container , borderColor:appearance.primaryLightColor }}>
                <TextInput
                value={props.value}
                onChangeText={props.onChange}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={props.placeholder}
                    placeholderTextColor={appearance.primaryLightColor}
                    style={{textAlignVertical: "top" , color:appearance.primaryLightColor,fontSize:14,fontFamily:"Monstret_med"}}
                />
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 100,
        borderWidth: .5,
        borderRadius:10,
        marginBottom:10,
        padding:10,
        
    }
})






export default Index





