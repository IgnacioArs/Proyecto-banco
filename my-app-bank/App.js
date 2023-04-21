import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Navigation from './Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import RoutesBloqued from './src/components/bloqueade/RoutesBloqued';

const stack = createNativeStackNavigator();

export default function App() {

const [auth,setAuth] = useState(null);

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('secretKey')
    setAuth(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
      console.log(e);
  }
}

useEffect(() => {
getData();
},[auth])




  return (
    <NavigationContainer>
      <stack.Navigator /* initialRouteName='Login' */>
          {auth? (<stack.Screen name='Navigation' component={Navigation} options={{headerShown:false}}/>):(<stack.Screen name='Login' component={Login} options={{headerShown:false}}/>)}
          {!auth? (<stack.Screen name='bloqueoDeRutas' component={RoutesBloqued} options={{headerShown:false}}/>):(<stack.Screen name='Login' component={Login} options={{headerShown:false}}/>)}
      </stack.Navigator>
      <StatusBar/>
   </NavigationContainer>

  );
}
