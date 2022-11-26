import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    ToastAndroid,
    StyleSheet,
    Modal,
    TouchableOpacity
} from "react-native";


//import components
import CheckoutInput from '../../../components/inputs/checkoutInputs'
import Header from '../../../components/headers/headerWithbackBtn'
import { AuthContext } from "../../../context";
import CountryPicker from 'react-native-country-picker-modal'
//import components
import Input from '../../../components/inputs/checkoutInputs'
import TextArea from '../../../components/inputs/textArea'
import LoginBtn from '../../../components/buttons/loginBtn'
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from "react-native";
import { color } from "react-native-reanimated";




const Index = ({ navigation }) => {

    const [countryCode, setCountryCode] = useState('PK')
    const [country, setCountry] = useState(null)
    const [withCountryNameButton, setWithCountryNameButton] = useState('Pakistan')
    const [pickerVisible, setPickerVisible] = useState(false)
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const [cities, setCities] = useState([])
    const [modalVisible, setModalVisible] = useState(false)



    const onSelect = (country) => {
        setCountryCode(country?.cca2)
        setCountry(country)
        console.log(country)
        axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
            country: country.name
        })
            .then((res) => {
                console.log("res", res.data.data)
                const mughees = res.data.data.map((v, i) => {
                    return {
                        id: v,
                        name: v,
                    }
                })
                setCities(mughees)
                setFilteredCities(mughees)
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }
    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };

    useEffect(() => {
        axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
            country: withCountryNameButton
        })
            .then((res) => {
                console.log("res", res.data.data)
                const mughees = res.data.data.map((v, i) => {
                    return {
                        id: v,
                        name: v,
                    }
                })
                setCities(mughees)
                setFilteredCities(mughees)
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }, [])



    const { appearance, user, myCart, discount, setOrderData } = useContext(AuthContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [userId, setUserId] = useState(user ? user._id : null)
    const [coupen, setCoupen] = useState("")
    const [address, setAddress] = useState("")
    const [payment, setPayment] = useState("")
    const [amountDiscount, setAmountDiscount] = useState()
    const [deliveryCharge, setDeliveryCharge] = useState(200)
    const [filteredCities, setFilteredCities] = useState([])
    const [citySearch, setCitySearch] = useState("")




    // products: { type: Array },
    useEffect(() => {
        var price = 0
        for (var i = 0; i < myCart.length; i++) {
            price += (Number(myCart[i].price) * Number(myCart[i].quantity))
        }
        setAmount(price)
        setAmountDiscount(discount)
    }, [myCart])
    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const preview = () => {
        if (name === undefined || name === "") {
            showToast("Please Enter Name")
        } else if (email === undefined || email.length === 0) {
            showToast("Please Enter Email")
        } else if (validateEmail(email) === false) {
            showToast("Please Enter valid email")
        } else if (phone === undefined || phone === "") {
            showToast("Please Enter Phone Number")
        } else if (city === undefined | city.length === 0) {
            showToast("Please Select City")
        } else if (address === undefined || address.length === 0) {
            showToast("Please enter address")
        } else {
            const form = {
                name,
                email,
                phone,
                address,
                city,
                products: myCart,
                grossAmount: amount,
                netAmount: amount - amountDiscount,
                coupen,
                userId,
                deliveryCharge,
                discount: amountDiscount,
                payment,
                description
            }
            setOrderData(form)
            navigation.navigate("PreviewOrder")
        }
    }


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = cities.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredCities(newData);
            setCitySearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredCities(cities);
            setCitySearch(text);
        }
    };





    return (
        <View style={{ width: "100%", backgroundColor: appearance.backgroundColor, flex: 1 }}>
            <View style={{ width: "100%", flex: 9 }}>
                <ScrollView
                    style={{ width: "100%" }}
                >
                    <Header
                        title="Personal Details"
                        onBack={() => {
                            navigation.goBack()
                        }}
                    />
                    <View style={{ width: "100%", marginTop: 30 }}>
                        <View style={{ width: "100%", paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 18, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                                Kindly Give us some details to deliver your order
                            </Text>
                        </View>
                        <View style={{ width: "100%", marginTop: 12 }}>
                            <Input
                                title="Enter Name"
                                placeholder="Enter your name:"
                                value={name}
                                onChange={(e) => setName(e)}
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 12 }}>
                            <Input
                                title="Enter Email"
                                placeholder="Enter your email:"
                                value={email}
                                onChange={(e) => setEmail(e)}
                            />
                        </View>
                        <View style={{ width: "100%", marginTop: 12 }}>

                            <Input
                                title="Enter Phone Number:"
                                placeholder="Enter your Phone no."
                                value={phone}
                                onChange={(e) => setPhone(e)}
                                number
                            />
                        </View>

                        <View style={{ width: "100%", marginTop: 12, alignItems: "center" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontSize: 13, color: appearance.primaryLightColor, fontFamily: "Monstret_bold", marginBottom: 2 }}>
                                    Enter Your Address :
                                </Text>
                            </View>
                            <TextArea
                                placeholder="Enter Address:"
                                onChange={(e) => setAddress(e)}
                                value={address}
                            />
                        </View>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontSize: 13, color: appearance.primaryLightColor, fontFamily: "Monstret_bold", marginBottom: 2 }}>
                                    Enter Description:(optional)
                                </Text>
                            </View>
                            <TextArea
                                placeholder="Enter Description:(optional)"
                                onChange={(e) => setDescription(e)}
                                value={description}
                            />
                        </View>
                        <View style={{ width: "100%", alignItems: "center", marginVertical: 4 }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontSize: 14, color: appearance.primaryLightColor, fontFamily: "Monstret_bold", marginBottom: 2 }}>
                                    Select Country :
                                </Text>
                            </View>
                            <TouchableOpacity style={{ width: "90%", justifyContent: "center", paddingLeft: 20, height: 40, borderWidth: .5, borderColor: appearance.primaryLightColor, borderRadius: 10 }}
                                onPress={() => setPickerVisible(true)}
                            >
                                <CountryPicker
                                    containerButtonStyle={{ color: appearance.primaryLightColor }}
                                    {...{
                                        countryCode,
                                        withFilter,
                                        withFlag,
                                        withCountryNameButton,
                                        withAlphaFilter,
                                        withCallingCode,
                                        withEmoji,
                                        onSelect,
                                    }}
                                    visible={pickerVisible}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                            {cities.length !== 0 ?
                                <View style={{ width: "90%" }}>
                                    <Text style={{ fontSize: 13, color: appearance.primaryLightColor, fontFamily: "Monstret_bold", marginBottom: 2 }}>
                                        Select City :
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(true)}
                                        style={{ width: "100%", borderWidth: .5, borderColor: appearance.primaryLightColor, justifyContent: "center", paddingLeft: 20, height: 48, borderRadius: 12, marginBottom: 20 }}>
                                        <Text style={{ color: appearance.primaryLightColor, fontSize: 14, fontFamily: "Monstret_bold" }}>
                                            {city !== "" ? city : "Select City"}
                                        </Text>
                                    </TouchableOpacity>
                                </View> : null}
                        </View>
                        <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
                            <LoginBtn
                                onClick={() => preview()}
                                textColor={appearance.backgroundColor}
                                title="Preview Order"
                            />

                        </View>


                    </View>
                </ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: "100%", height: 60, borderBottomColor: appearance.primaryLightColor, borderBottomWidth: .5, flexDirection: "row" }}>
                            <View style={{ width: "80%", justifyContent: "flex-end", paddingBottom: 10 }}>
                                <TextInput
                                    value={citySearch}
                                    onChangeText={(e) => searchFilterFunction(e)}
                                    placeholder="Search"
                                    placeholderTextColor={appearance.primaryLightColor}
                                    style={{ width: "100%", paddingLeft: 30, fontSize: 15, fontFamily: "Monstret_bold", color: appearance.primaryLightColor }}
                                />
                            </View>
                            <View style={{ width: "20%", alignItems: "center", justifyContent: "flex-end", paddingBottom: 10 }}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                >
                                    <AntDesign name="close" size={24} color={appearance.primaryColor} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView style={{ width: "100%", marginTop: 15 }}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                {filteredCities.length !== 0 ? filteredCities?.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCity(v.name)
                                                setModalVisible(false)
                                            }}
                                            style={{ width: "90%", backgroundColor: appearance.contrastBackgroundColor, padding: 10, marginVertical: 5 }}
                                            key={i}
                                        >
                                            <Text style={{ fontSize: 15, color: appearance.primaryLightColor, fontFamily: "Monstret_bold" }}>
                                                {v.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }) : null}
                            </View>
                        </ScrollView>


                    </View>
                </View>
            </Modal>
        </View >
    )
}





const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        alignItems: "center",
        flex: 1,
        width: "100%"
    },

});


export default Index;