import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import screens
import Home from '../../screens/home'
import ProductDetail from '../../screens/product/productDetails'
import Category from '../../screens/categories'
import ChangePassword from '../../screens/auth/newPassword'
import OTP from '../../screens/auth/otp'
import SelectedCategory from '../../screens/singleCategory'
import MyCart from '../../screens/myCart'
import Checkout from '../../screens/checkout/dataForm'
import PreviewOrder from '../../screens/checkout/preview'
import FlashSale from '../../screens/flashSale'
import OrderTrack from '../../screens/orderTracker'
import Profile from '../../screens/auth/profile'
import EditProfile from '../../screens/auth/editProfile'
import MyWishlist from '../../screens/wishlist'
import Search from '../../screens/search'
import Internet from '../../screens/internetScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={Home}
        >
            <Drawer.Screen name="Mughees" component={Home} />
        </Drawer.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function Index() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home1" component={Home} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Checkout" component={Checkout} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="ProductDetail" component={ProductDetail} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="FlashSale" component={FlashSale} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Category" component={Category} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="OrderTrack" component={OrderTrack} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="ChangePassword" component={ChangePassword} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="OTP" component={OTP} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="SelectedCategory" component={SelectedCategory} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="MyCart" component={MyCart} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="PreviewOrder" component={PreviewOrder} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Profile" component={Profile} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="EditProfile" component={EditProfile} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="MyWishlist" component={MyWishlist} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Search" component={Search} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Internet" component={Internet} />

        </Stack.Navigator>
    );
}


export default Index;






