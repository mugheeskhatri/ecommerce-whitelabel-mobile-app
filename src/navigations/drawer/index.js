import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';



//import components
import OrderTrack from '../../screens/orderTracker'
import Home from '../../screens/home'


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      // drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        // drawerActiveBackgroundColor: darkMode ? `rgba(255,255,255, 0.3)` : `rgba(255, 234, 0, 0.3)`,
        // drawerActiveTintColor: darkMode ? 'white' : "black",
        // drawerInactiveTintColor: darkMode ? 'white' : "black",
        drawerLabelStyle: {
          // marginLeft: -10,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        options={{ title: 'Home' }}
        name={'fullList'}
        component={Home}
      />


    </Drawer.Navigator>
  );
}


export default MyDrawer;