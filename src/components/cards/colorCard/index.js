import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";





const Index = (props) => {
    return (
        <TouchableOpacity
            key={props.index}
            onPress={props.onClick}
            style={{ width: 30, height: 30, padding: 5, borderWidth: props.data.colorName === props.selectedColor ? 2 : 0, borderColor: props.data.colorCode, borderRadius: 100, marginLeft:props.index < 1 ? 0 : 10 , marginRight:1 }}>
            <View style={{ width: "100%", height: "100%", backgroundColor: props.data.colorCode, borderRadius: 100 }}></View>
        </TouchableOpacity>
    )
}




export default Index




