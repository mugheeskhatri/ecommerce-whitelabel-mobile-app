import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native"
import Carousel from 'react-native-snap-carousel';
import { AuthContext } from "../../context";
import { SliderBox } from "react-native-image-slider-box";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useState } from "react";
import { useEffect } from "react";




const Index = () => {
    const { appearance } = useContext(AuthContext)
    const sliderWidth = Dimensions.get("window").width;
    
    const [slider , setSlider] = useState([])

    var sliderData = appearance.sliderImages
    useEffect(()=>{
        var mughees = []
        sliderData.map((v)=>{
            mughees.push(v.src)
            setSlider(mughees)
        })
    },[])


    console.log(sliderData)


    return (
        <View style={{ width: "100%", marginTop: 20, }}>
            <SliderBox
                autoplay
                images={slider}
                sliderBoxHeight={220}
                dotColor="transparent"
                inactiveDotColor="transparent"
                autoplayInterval={5000}
                ImageComponentStyle={{borderRadius: 20,width: '93%', marginTop: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                
                elevation: 2,marginBottom:10}}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 170,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        width: "100%",
        paddingHorizontal: 10
    }
})



export default Index;