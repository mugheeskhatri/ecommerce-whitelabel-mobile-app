import React, { useContext, useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    TextInput
} from "react-native";
import { AuthContext } from "../../../context";

import { StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
//import components
import LoginBtn from '../../../components/buttons/loginBtn'
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderWithBack from '../../../components/headers/headerWithbackBtn'
import Input from '../../../components/inputs/loginInputs'
import Textarea from '../../../components/inputs/textArea'
import axios from "axios";
import API from "../../../config/api";
import { Alert } from "react-native";
import { ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal'





const Index = ({ navigation }) => {

    const { user, appearance, setIsAuthenticated, setUser } = useContext(AuthContext)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [city, setCity] = useState(user?.city)
    const [phone, setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)
    const [image, setImage] = useState(user?.image)
    const [loading, setLoading] = useState(false)
    const askGallery = useRef()
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
    const [filteredCities, setFilteredCities] = useState([])
    const [citySearch, setCitySearch] = useState("")
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



    const updatePRofile = () => {
        const form = {
            name,
            email,
            city,
            phone,
            address,
            image
        }
        axios.post(`${API}/user/update-profile`, form)
            .then((res) => {
                Alert.alert("Updated", "Profile Updated Successfully")
                setUser(res.data.user)
            })
    }



    const openGallery = async () => {
        // No permissions request is necessary for launching the image library
        setLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {

            let base64Img = `data:image/jpg;base64,${result.base64}`

            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/dnoyzcu1u/image/upload';

            let data = {
                "file": base64Img,
                "upload_preset": "userProfileImage",

            }

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                let data = await r.json()
                setImage(data.secure_url)
                setLoading(false)
                return data.secure_url
            }).catch(err => console.log(err))
        }
    };




    const openCamera = async () => {
        // No permissions request is necessary for launching the image library
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        setLoading(true)

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {

            let base64Img = `data:image/jpg;base64,${result.base64}`

            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/dnoyzcu1u/image/upload';

            let data = {
                "file": base64Img,
                "upload_preset": "userProfileImage",
            }

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                let data = await r.json()
                setImage(data.secure_url)
                setLoading(false)
                return data.secure_url
            }).catch(err => console.log(err))
        }
    };

    console.log(image)




    return (
        <View style={{ flex: 1, width: "100%", backgroundColor: appearance.secondaryColor }}>
            <View style={{ flex: 1, width: "100%", }}>
                <HeaderWithBack
                    onBack={() => navigation.goBack()}
                    title="Edit Profile"
                />

                <View style={{ width: "100%", flex: 2, alignItems: "center", justifyContent: "center" }}>
                    <View
                        style={{ width: 120, height: 120, borderRadius: 100 }}
                    >
                        <TouchableOpacity
                            onPress={() => askGallery.current.open()}
                            style={{ width: 30, alignItems: "center", justifyContent: "center", height: 30, position: "absolute", bottom: 0, zIndex: 999, right: 5, borderRadius: 100, backgroundColor: appearance.contrastBackgroundColor }}>
                            <Feather name="edit-3" size={15} color={appearance.primaryLightColor} />
                        </TouchableOpacity>
                        <Image
                            style={{ width: "100%", height: "100%", borderRadius: 100 }}
                            source={{ uri: image === "" || image === null || image === undefined ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqGSpRSWM2LH7fa_Vvrr4V0IGlvG_QWXpJofT1-E&s" : image }}
                        />
                    </View>
                </View>
                <View style={{ width: "100%", flex: 5, backgroundColor: appearance.backgroundColor, borderTopEndRadius: 40, borderTopLeftRadius: 40 }}>

                    <ScrollView
                        style={{ width: "100%" }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: "Monstret_bold", color: appearance.primaryColor, marginLeft: 30, marginTop: 20 }}>
                            Personal Details
                        </Text>

                        <View style={{ width: "100%", alignItems: "center", marginTop: 3 }}>


                            <View style={{ width: "100%", alignItems: "center", marginTop: 25 }}>


                                <View style={{ width: "100%" }}>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e)}
                                        icon={<FontAwesome name="user" size={20} color={appearance.primaryLightColor} />}
                                        placeholder="Your Name"
                                    />
                                </View>
                                <View style={{ width: "100%", marginVertical: 12 }}>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e)}
                                        icon={<Feather name="user" size={20} color={appearance.primaryLightColor} />}
                                        placeholder="Your Email"
                                    />
                                </View>
                                <View style={{ width: "100%", marginVertical: 12 }}>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e)}
                                        icon={<Feather name="phone" size={20} color={appearance.primaryLightColor} />}
                                        placeholder="Your Phone"
                                    />
                                </View>
                                <TouchableOpacity style={{ width: "85%", justifyContent: "center", paddingLeft: 10, height: 40, borderBottomWidth: .5, borderColor: appearance.primaryLightColor, borderRadius: 10 }}
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
                                <View style={{ width: "100%", marginVertical: 12, alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(true)}
                                        style={{ width: "80%", flexDirection: "row", height: 40, borderBottomWidth: .5, borderColor: appearance.primaryLightColor }}
                                    >
                                        <View style={{ width: "12%", height: 40, alignItems: "center", justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="city" size={24} color={appearance.primaryLightColor} />
                                        </View>
                                        <View style={{ width: "88%", height: 40, justifyContent: "center", paddingLeft: 2 }}>
                                            <Text style={{ fontSize: 15, fontFamily: "Monstret_bold", color: appearance.primaryColor }}>
                                                {city !== "" && city !== undefined && city !== null ? city : "Select City"}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: "100%", alignItems: "center" }}>
                                    <View style={{ width: "95%", alignItems: "center", marginTop: 10 }}>
                                        <Textarea
                                            value={address}
                                            onChange={(e) => setAddress(e)}
                                            placeholder="Enter Address"
                                        />
                                    </View>
                                </View>





                                <View style={{ width: "100%", marginTop: 12, marginBottom: 15, alignItems: "center" }}>
                                    <LoginBtn
                                        onClick={!loading ? () => updatePRofile() : null}
                                        textColor={appearance.backgroundColor}
                                        width="70%"
                                        title="Save Changes"
                                    />
                                </View>
                            </View>



                        </View>
                    </ScrollView>

                </View>
                <RBSheet
                    ref={askGallery}
                    height={300}
                    openDuration={250}
                    customStyles={{
                        container: {
                            height: 110,
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center", justifyContent: "center" }}
                                onPress={() => {
                                    askGallery.current.close()
                                    openCamera()
                                }}
                            >
                                <Feather name="camera" size={24} color={appearance.primaryColor} />
                                <Text style={{ fontFamily: "Monstret_bold", fontSize: 13, color: appearance.primaryColor, marginTop: 10 }}>
                                    Camera
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center", justifyContent: "center" }}
                                onPress={() => {
                                    askGallery.current.close()
                                    openGallery()
                                }}
                            >
                                <MaterialIcons name="photo" size={24} color="black" />
                                <Text style={{ fontFamily: "Monstret_bold", fontSize: 13, color: appearance.primaryColor, marginTop: 10 }}>
                                    Gallery
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </RBSheet>

            </View>
            {loading ? <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", position: "absolute", top: 0, bottom: 0, backgroundColor: "white", opacity: loading ? .5 : 1 }}>
                <ActivityIndicator
                    size="large"
                    color={appearance.secondaryColor}
                />
            </View> : null}




            {/* city modal */}


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


            {/* city modal */}








        </View>
    )
}




const styles = StyleSheet.create({
    btn: {
        width: "90%",
        marginVertical: 10,
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    btnIconSection: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    btnIconContainer: {
        borderRadius: 100,
        opacity: .6,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    textSection: {
        fontSize: 18,
        fontFamily: "Monstret_med",

    },
    goIconSection: {
        width: "15%",
        justifyContent: "center"
    },
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

})









export default Index;





