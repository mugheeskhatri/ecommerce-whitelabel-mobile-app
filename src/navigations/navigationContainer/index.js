import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//import navigations
import AuthNavigation from '../authNavigation'
import AppNavigation from '../appNavigation'
import { AuthContext } from '../../context';
import API from '../../config/api';
import { useEffect } from 'react';
import axios from 'axios';
import Drawer from '../drawer'



export default function App() {

    const { setIsAuthenticated, isAuthenticated, setUser, setAppearance , appearance } = React.useContext(AuthContext)


    useEffect(() => {
        axios.get(`${API}/admin/appearance/get`)
            .then(async (res) => {
                await setAppearance(res.data)
            })
    }, [])

    const getToken = async () => {
        var token = await AsyncStorage.getItem('ecommerce_token')
        axios.get(`${API}/getUser/me`, {
            headers: {
                token: token
            }
        }).then((res) => {
            if (token !== null) {
                setIsAuthenticated(true)
                setUser(res.data)
            }
        }).catch((err) => {
            console.log("err", err);
        })
    }

    useEffect(() => {
        getToken()
    }, [])


    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    );
}