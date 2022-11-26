import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { SharedElementRenderer } from 'react-native-motion';
import { AuthProvider } from './src/context'
//import components
import OrderTrack from './src/screens/orderTracker'
import Preview from './src/screens/checkout/preview'
import Form from './src/screens/checkout/dataForm'
import NavigationContainer from './src/navigations/navigationContainer'
import ProductFlat from './src/screens/productFlatlist'
import Internet from './src/screens/internetScreen'
import Testing from './src/testing'


export default function App() {
  

  return (
    <AuthProvider>
      <SharedElementRenderer>
        <NavigationContainer />
      </SharedElementRenderer>
    </AuthProvider>
  )
}