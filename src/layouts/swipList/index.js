import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native"
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';


//import componjents
import CartCard from '../../components/cards/cartCard'
import { AuthContext } from "../../context";




const Index = (props) => {

    const {appearance} = useContext(AuthContext)

    return (
        <View style={{ width: "100%", marginTop: 10 }}>
            <Text>Mughees</Text>
            <SwipeListView
                data={props.data.myCart}
                renderItem={(rowData, rowMap) => (
                    <SwipeRow
                        style={{ width: "100%", marginVertical: 8 }}
                        disableRightSwipe={parseInt(rowData.item.key) % 2 !== 0}
                        disableLeftSwipe={parseInt(rowData.item.key) % 2 === 0}
                        leftOpenValue={20 + parseInt(rowData.item.key) * 5}
                        rightOpenValue={-75}
                        leftActivationValue={200}
                    >
                        <View style={styles.rowBack}>
                            <View style={{ alignItems: "flex-end", width: "95%", backgroundColor: "red", borderRadius: 13 }}>
                                <View style={{ width: 80, alignItems: "center", justifyContent: "center", height: "100%", }}>
                                    <TouchableOpacity style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center" }}>
                                        <AntDesign name="delete" size={24} color={appearance.backgroundColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowFront}>
                            <CartCard
                                data={rowData}
                                index={rowMap}
                            />
                        </View>
                    </SwipeRow>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rowBack: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    checkoutContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        right: 0,
        height: 110,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    }
})



export default Index;