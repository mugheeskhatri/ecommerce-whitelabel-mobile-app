import React from "react";
import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../context";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Index = ({navigation}) => {

    const { appearance } = useContext(AuthContext)


    return (
        <View
            style={{ width: "100%", flex: 1, backgroundColor: appearance.secondaryColor }}
        >
            <View
                style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "flex-end" }}
            >
                <Text style={{ fontFamily: "Monstret_bold", color: appearance.backgroundColor, fontSize: 24, marginBottom: 10 }}>
                    No Internet
                </Text>
                <MaterialCommunityIcons name="wifi-alert" size={150} color={appearance.backgroundColor} />
                            </View>
            <View
                style={{ width: "100%", flex: 1, alignItems: "center" , paddingTop:25 }}
            >
                <View style={{ width: "70%", padding: 12,alignItems:"center", borderRadius: 15, backgroundColor: appearance.backgroundColor }}>
                    <Text style={{ fontFamily: "Monstret_med", textAlign: "center", fontSize: 16, color: appearance.primaryColor }}>
                        Please Check your internet connection and then try again.
                    </Text>
                    <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    style={{ paddingVertical: 10, backgroundColor: appearance.secondaryColor,marginTop:20, width: 130, alignItems: "center" }}>
                        <Text style={{fontFamily:"Monstret_bold",color:appearance.backgroundColor}}>
                            Try Again
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}








export default Index;