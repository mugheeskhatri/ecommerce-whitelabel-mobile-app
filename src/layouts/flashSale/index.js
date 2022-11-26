import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native"
import CountDown from 'react-native-countdown-component';



//import components
import DealCard from '../../components/cards/dealCard'
import ViewMore from '../../components/cards/viewMore'
import { AuthContext } from "../../context";
import axios from "axios";
import API from "../../config/api";



const Index = (props) => {
    const { appearance } = useContext(AuthContext)
    const [sale, setSale] = useState([])
    const [available, setAvailable] = useState(false)
    const [saleEndDate, setSaleEndDate] = useState(new Date())
    const currentDate = new Date()


    useEffect(() => {
        axios.get(`${API}/flashSale/get`)
            .then(async (res) => {
                var startDate = await new Date(res.data[0].startDate) 
                if (currentDate.getTime() - startDate.getTime() <= 1) {
                    console.log(startDate.getDate())
                } else {
                    setSale(res.data)
                    setSaleEndDate(new Date(res.data[0].endDate))
                    setAvailable(true)
                }
            })
    }, [])



    return (
        <View style={{ width: "100%", marginTop: 12, }}>
            {available ? <View style={{ width: "100%" }}>
                <View style={styles.headingSection}>
                    <View style={{ width: "40%", paddingLeft: 18, justifyContent: "center" }}>
                        <Text style={{ ...styles.heading, color: appearance.primaryColor, fontFamily: "Monstret_bold" }}>
                            Flash Sale
                        </Text>
                    </View>
                    <View style={{ width: "60%", justifyContent: "flex-end", paddingRight: 14, flexDirection: "row" }}>
                        <View style={{ marginRight: 10, justifyContent: "center" }}>
                            <Text style={{ fontFamily: "Monstret_reg", fontSize: appearance.lightFont, color: appearance.primaryLightColor }}>
                                Closing In :
                            </Text>
                        </View>
                        <View>
                            <CountDown
                                size={12}
                                until={Number(saleEndDate.getTime() - currentDate.getTime()) / 1000}
                                digitStyle={{ backgroundColor: appearance.contrastBackgroundColor, }}
                                digitTxtStyle={{ color: appearance.primaryLightColor, fontFamily: "Monstret_bold" }}
                                timeLabelStyle={{ color: appearance.primaryColor }}
                                separatorStyle={{ color: appearance.primaryColor }}
                                timeToShow={['D', 'H', 'M']}
                                timeLabels={{ m: null, d: null, h: null }}
                                showSeparator
                            />
                        </View>
                    </View>
                </View>
                <ScrollView
                    style={{ width: "100%", marginTop: 12 }}
                    nestedScrollEnabled
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        sale[0]?.products?.map((v, i) => {
                            return (
                                <DealCard
                                    onClick={props.onClick}
                                    percent={sale[0].percentOrAmount}
                                    data={v.value}
                                    index={i}
                                />
                            )
                        })
                    }
                    <ViewMore
                        onClick={props.onClick}
                    />
                </ScrollView>
            </View> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    headingSection: {
        width: "100%",
        flexDirection: "row"
    },
    heading: {
        fontSize: 20,
        fontWeight: "600",

    }
})




export default Index






