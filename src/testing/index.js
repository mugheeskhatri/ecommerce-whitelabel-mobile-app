import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch  } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
 
const styles = StyleSheet.create({
  // ...
})
 
export default function Index() {
  const [countryCode, setCountryCode] = useState('FR')
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(
    false)
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(true)
  const onSelect = (country) => {
    setCountryCode(country?.cca2)
    setCountry(country)
    axios.post("https://countriesnow.space/api/v0.1/countries/cities",{
        country:country.name 
    })
    .then((res)=>{
        console.log("res",res.data)
    })
    .catch((e)=>{
        console.log("Err",e)
    })
}

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Country Picker !</Text>
      {/* <Option
        title='With country name on button'
        value={withCountryNameButton}
        onValueChange={setWithCountryNameButton}
      />
      <Option title='With flag' value={withFlag} onValueChange={setWithFlag} />
      <Option
        title='With emoji'
        value={withEmoji}
        onValueChange={setWithEmoji}
      /> */}
      {/* <Option
        title='With filter'
        value={withFilter}
        onValueChange={setWithFilter}
      /> */}
      {/* <Option
        title='With calling code'
        value={withCallingCode}
        onValueChange={setWithCallingCode}
      />
      <Option
        title='With alpha filter code'
        value={withAlphaFilter}
        onValueChange={setWithAlphaFilter}
      /> */}
      <CountryPicker
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
        visible
      />
      <Text style={styles.instructions}>Press on the flag to open modal</Text>
      {country !== null && (
        <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
      )}
    </View>
  )
}