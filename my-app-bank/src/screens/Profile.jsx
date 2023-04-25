import React, { useState,useEffect } from 'react'
import { StyleSheet, Text,View,ScrollView,RefreshControl,NativeModules} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  Card, Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Profile = () => {

  const navegar = useNavigation();

const [refrescar,setRefrescar] = useState(false);
const [auth,setAuth] = useState();
//**************************DATA USERS--- */
const [id,setId] =useState();
const [name,setName] =useState();
const [email,setEmail] = useState();
const [accountId,setAccountId] = useState();


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
  
const dataUsersProfile = async () => {
  //.slice(16,-6)
  var userId = JSON.stringify(auth.split(',')[0].slice(19,-1));
  setId(userId.replace(/['"]+/g, ''));
  var userName = auth.split(',')[1].slice(11,-2);
  setName(userName);
  var userEmail = auth.split(',')[2].slice(12,-2);
  setEmail(userEmail);
  var userAccountId = auth.split(',')[4];
  setAccountId(userAccountId);

 //Testing 
 console.log("el id => ",id.replace(/['"]+/g, ''));

  
}

const cargar = React.useCallback(()=> {
  setRefrescar(true); 
/*   dataUsersProfile(); */
  setAuth(false);
  setRefrescar(false);
})
  
  useEffect(() => {
    getData();
  },[auth])

  return (
    <ScrollView style={{backgroundColor:"black",opacity:0.9}} refreshControl={<RefreshControl refreshing={refrescar} colors={["#1E90FF"]} onRefresh={cargar}/>}>
  <View style={styles.container}>
    <Card containerStyle={{borderRadius:10}}>
      <Card.Title style={{color:"gray"}}>BIENVENIDO BANCO APP PROFILE</Card.Title>
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
      {auth? (<Card style={{ marginBottom: 10}}>
      <Text h4 style={{color:'#00bb2d',fontWeight:'bold',alignSelf:'center',fontSize:15}}>IFORMACION PROFILE</Text>
        <Text style={{color:'#000000',fontWeight:'bold',alignSelf:'flex-start',fontSize:13}}>Nombre: <Text style={{fontSize:16,color:'#898176'}}>{name}</Text></Text>
        <Text style={{color:'#000000',fontWeight:'bold',alignSelf:'flex-start',fontSize:13}}>Numero De Cuenta: <Text style={{fontSize:16,color:'#898176'}}>({id})</Text></Text>
        <Text style={{color:'#000000',fontWeight:'bold',alignSelf:'flex-start',fontSize:13}}>
            Email:<Text style={{fontSize:16,color:'#898176'}}>{email}</Text>
        </Text>
      </Card>):(<Text></Text>)}
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
          marginTop:10,
          backgroundColor:'#b32821',
          borderTopEndRadius:10,
          borderTopStartRadius:10,
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10
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

