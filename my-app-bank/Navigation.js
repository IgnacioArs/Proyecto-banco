import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//icon
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

//screen necesarias
import Others from './src/screens/Others'
import Account from './src/screens/Account'
import Profile from './src/screens/Profile';







const Tab = createBottomTabNavigator();

function MyTabs(){
  
  return (
  <Tab.Navigator /* initialRouteName='Profile' */ screenOptions={{
    tabBarActiveTintColor:'#808080',
    tabBarInactiveTintColor:'white',
    tabBarInactiveBackgroundColor:'white',
    tabBarActiveBackgroundColor:'#D3D3D3',
    tabBarIcon:'#808080',
    headerShown:false}}>
    <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel:'Perfil',
    tabBarIcon:({color,size}) =>(
      <SimpleLineIcons name="user" size={24} color="#00d4ff" />
    ),}}/>
    <Tab.Screen name="Account" component={Account} options={{tabBarLabel:'Cuenta',
   tabBarIcon:({color,size}) =>( 
    <Fontisto name="wallet" size={24} color="#00d4ff" />
  ),}}/>


 <Tab.Screen name="Other" component={Others} options={{tabBarLabel:'Otros',
   tabBarIcon:({color,size}) =>(
    <FontAwesome name="book" size={24} color="#00d4ff" />
  ),}}/>

  </Tab.Navigator>

  
  )
}

export default function Navigation(){
    return (
        <MyDrawer/>
    )
}

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator >
    <Drawer.Screen name="Inicio" component={MyTabs}  options={{tabBarLabel:'Inicio',headerShadowVisible:false,headerShown:false,
    drawerIcon:({color,size}) =>(
      <FontAwesome name="home" size={24} color="#00d4ff" />
    ),}}/>
    </Drawer.Navigator>
  );
}
