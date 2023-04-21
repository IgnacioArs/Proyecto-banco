import { useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView} from 'react-native-gesture-handler';
import { Button, Text} from 'react-native-elements';
import { StyleSheet, View, NativeModules } from 'react-native';
import RNRestart from 'react-native-restart';




const RoutesBloqued = () => {
    const navegar = useNavigation();
    const [auth,setAuth] = useState();
    const [refrescar,setRefrescar] = useState(false);

    
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
  
const LogOut = () => {
  AsyncStorage.clear();
  NativeModules.DevSettings.reload();
}


  return (  <View style={styles.container}><Text>{auth}</Text><Button title="Cerrar session" onPress={() => LogOut()}/></View>)
  
}   


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });
export default RoutesBloqued
