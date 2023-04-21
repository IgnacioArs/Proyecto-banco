import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {APIIDUSER} from '@env' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {  Card, Button, Icon } from '@rneui/themed';
const API = APIIDUSER;


const Account = () => {

  const navegar = useNavigation();
const [refrescar,setRefrescar] = useState(false);
const [auth,setAuth] = useState();
const [account,setAccount] = useState();

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
  setAccount(false)
  setRefrescar(false)
})

const Account = async () => {

  /*   console.log("EL TOKEN DE VERDAD",auth.split(',')[5].slice(16,-6)); */
    var token = JSON.stringify(auth.split(',')[5].slice(16,-6))
   /*  console.log("TOKEN STRING",token) */
    const config = {
     'Content-Type': 'application/json;charset=UTF-8',
     'Authorization': `Bearer ${token}`
   };
   const nuevoToken = {
     token:token,
     auth:auth
   }
    const response = await axios.post(`${API}`,nuevoToken,config);
    if(response){
     setAccount(response.data.data)
     console.log("respuesta ===>",response.data.data,"ACOUNT",account);
    }
  
}
  
  useEffect(() => {
    getData();
  },[auth])

  return (
    <ScrollView style={{backgroundColor:"black",opacity:0.9}} refreshControl={<RefreshControl refreshing={refrescar} colors={["#1E90FF"]} onRefresh={cargar}/>}>
    <View style={styles.container}>
      <Card containerStyle={{borderRadius:10}}>
        <Card.Title style={{color:"gray"}}>CUENTA APP</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ padding: 0 ,borderRadius:3}}
          source={{
            uri:
              'https://plus.unsplash.com/premium_photo-1661301075857-63868ae88c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          }}
        />
        <Text style={{ marginBottom: 10 }}>
        
        </Text>
        <Card style={{ marginBottom: 10}}>
        {account? (<View><Text h4 style={{color:'red',fontWeight:'bold'}}>INFORMACION DE LA CUENTA</Text>
          <Text >Id:<Text style={{color:'black',fontWeight:'bold'}}> {`${account.id}`}</Text></Text>
          <Text >CodeCity:<Text style={{color:'black',fontWeight:'bold'}}> {`${account.codeCity}`}</Text></Text>
          <Text >CodeCountry: <Text style={{color:'black',fontWeight:'bold'}}> {`${account.codeCountry}`}</Text></Text>
          <Text >codeCounty: <Text style={{color:'black',fontWeight:'bold'}}> {`${account.codeCounty}`}</Text></Text>
          <Text >codeRegion: <Text style={{color:'black',fontWeight:'bold'}}> {`${account.codeRegion}`}</Text></Text>
          <Text >postalCode: <Text style={{color:'black',fontWeight:'bold'}}> {`${account.postalCode}`}</Text></Text>
          <Text >priority: <Text style={{color:'black',fontWeight:'bold'}}> {`${account.priority}`}$</Text></Text>
          <Text >
            Descripcion:
            <Text style={{color:'black',fontWeight:'bold'}}>  {`${account.description}`}</Text>
           
          </Text></View>):(<Text style={{color:'red'}}>(Click!) en obtener cuenta.</Text>)}
        </Card>
        <View>
          {!account? (<View style={{alignItems:'center'}}><Text>
          <Button
          icon={
            <Icon
              name="money"
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
          title="Obtener cuenta"
          onPress={() => Account()}
        /></Text></View>):(<View ><Text style={{color:'green',alignSelf:'center',marginTop:25}}>Activa!</Text></View>)}
        </View>
      </Card>
    </View>
  </ScrollView>
  )
}

export default Account


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

