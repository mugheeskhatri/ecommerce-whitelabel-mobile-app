import React, { useContext } from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { AuthContext } from "../../../context";






const Index = (props) => {

    const { appearance } = useContext(AuthContext)

    return (
        <View style={{ width: "100%", alignItems: "center", }}>
            <View style={{
                ...styles.inputContainer, backgroundColor: appearance.backgroundColor,
                borderBottomColor: appearance.primaryLightColor,
            }}>
                <View style={{ width: "15%", alignItems: "center", justifyContent: "center" }}>
                    {props.icon}
                </View>
                <View style={{ width: props.password ? "70%" : "85%" }}>
                    <TextInput
                        value={props.value}
                        onChangeText={props.onChange}
                        style={styles.input}
                        placeholder={props.placeholder}
                        placeholderTextColor={appearance.primaryLightColor}
                        secureTextEntry={props.secureText}
                    />
                </View>
                {props.password ? <View style={{ width: "15%", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity
                        onPress={props.setSecure}
                    >
                        {props.eye}
                    </TouchableOpacity>
                </View> : null}
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    inputContainer: {
        width: "85%",
        flexDirection: "row",
        borderRadius: 10,

        borderBottomWidth: .5
    },
    input: {
        width: "100%",
        paddingVertical: 5,
        fontSize: 15,
        fontFamily: "Monstret_bold"
    }
})



export default Index