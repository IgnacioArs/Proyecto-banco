import React, { useState,useEffect } from 'react'
import { StyleSheet, Text,View,ScrollView,RefreshControl,NativeModules} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  Card, Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Profile = () => {

  const navegar = useNavigation();

const [refrescar,setRefrescar] = useState(false);
const [auth,setAuth] = useState();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('secretKey')
      setAuth(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
  }

  const logOut = () => {
    console.log("mostrando token en profile",auth);
    AsyncStorage.removeItem('secretKey');
    getData();
    cargar();
    NativeModules.DevSettings.reload();
  }
  
  

const cargar = React.useCallback(()=> {
  setRefrescar(true)
  setAuth(false)
  setRefrescar(false)
})
  
  useEffect(() => {
    getData();
  },[auth])

  return (
    <ScrollView style={{backgroundColor:"black",opacity:0.9}} refreshControl={<RefreshControl refreshing={refrescar} colors={["#1E90FF"]} onRefresh={cargar}/>}>
  <View style={styles.container}>
    <Card containerStyle={{borderRadius:10}}>
      <Card.Title style={{color:"gray"}}>BIENVENIDO BANCO APP</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{ padding: 0 }}
        source={{
          uri:
            'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        }}
      />
      <Text style={{ marginBottom: 10 }}>
      
      </Text>
      <Card style={{ marginBottom: 10}}>
      <Text h4>Informacion</Text>
        <Text>Nombre: Datos del usuario</Text>
        <Text>Cuenta: adjective</Text>
        <Text>
          Otro: well meaning and kindly.
          
          {'"a benevolent smile"'}
        </Text>
      </Card>
      <Button
        icon={
          <Icon
            name="logout"
            color="#ffffff"
            iconStyle={{ marginRight: 10 }}
          />
        }
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop:10
        }}
        title="Cerrar Session"
        onPress={() => logOut()}
      />
    </Card>
  </View>
</ScrollView>
  )
}

export default Profile


const styles = StyleSheet.create({
container: {
  flex: 1,
  marginTop:25,
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



const logOut = () => {
  console.log("mostrando token en profile",auth)
  AsyncStorage.clear();
  getData();
  cargar();
  return <App/>
}

