import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable,TouchableOpacity,RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import {API} from '@env' 
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../../Navigation';


const bff_users_session = API;

export default function Login() {

  const navigation = useNavigation();


  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerta,setAlerta] = useState();
  const [errorAlerta,setErrorAlerta] = useState();
  const [messageAlert,setMessageAlert] = useState('');
  const [refresh,setRefresh] = useState(false);
  const [auth,setAuth] = useState(false);

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('secretKey')
    setAuth(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
      console.log(e);
  }
}

  refreshSession =() =>{
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    },4000);
  }
  
  const showAlert = () => {
    setAlerta(true);
    };
  
    const showAlertError =() => {
      setErrorAlerta(true);
    }
  
    const hideAlertMessage = () => {
      setErrorAlerta(false);
     }
  
    const hideAlert = () => {
      setAlerta(false);
    };
  
    const access = async () => {
        try {
          if(email.length ===0 || password.length ===0){
            setMessageAlert("Campos vacios");  
            showAlertError();
          }
          const user={
            username:email,
            password:password
          }
          console.log(`${bff_users_session}`)
          const result = await axios.post("http://192.168.248.35:3003/api/userSession",user)
          console.log("Viendo la alerta",result.data.message.status);
          if(result.data.message.status=== 202) {
              /* console.log(result.data.data); */
              const jsonData = JSON.stringify(result)
              storeData(jsonData);
              getData();
              showAlert();
          }else if(result.data.message.status === 204){
            setMessageAlert("Email no exist!");  
            showAlertError();
          }else{
            setMessageAlert(result.data.message.response);  
            showAlertError();
          } 
        } catch (error) {
            console.log(error);
        }
    } 
  
  
  
  
  
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('secretKey', jsonValue);
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
      getData()
      setAlerta(false);
      setErrorAlerta(false);
    },[auth])


        return (    
         <>
         {!auth?  <View style={styles.container}>
        <Text>Success</Text>
             <AwesomeAlert
             show={alerta}
             showProgress={false}
             title="Bienvenido"
             message="Acceso correcto!"
             closeOnTouchOutside={true}
             closeOnHardwareBackPress={false}
             /* showCancelButton={true} */
             showConfirmButton={true}
          /*    cancelText="No, cancel" */
             confirmText="Ok"
             confirmButtonColor="#33FF7A"
             /* onCancelPressed={() => {hideAlert()}} */
             onConfirmPressed={() => {hideAlert()}}
           />
           <AwesomeAlert
             show={errorAlerta}
             showProgress={false}
             title="Error"
             message={messageAlert}
             closeOnTouchOutside={true}
             closeOnHardwareBackPress={false}
            /*  showCancelButton={true} */
             showConfirmButton={true}
          /*    cancelText="No, cancel" */
             confirmText="Ok"
             confirmButtonColor="#33FF7A"
             /* onCancelPressed={() => {hideAlert()}} */
             onConfirmPressed={() => {hideAlertMessage()}}
           />
         <Text style={styles.titulos}>Bienvenido!</Text>
         <Text style={styles.subtitulo}>Por favor ingrese sus credenciales</Text>
         <TextInput style={styles.textIput} placeholder='insert Email - User' onChangeText={(email) => setEmail(email)}/>
         <TextInput style={styles.textIput} placeholder='Password' secureTextEntry={true} onChangeText={(pass) => setPassword(pass)}/>
         <TouchableOpacity style={styles.button} onPress={() => access()}>
               <LinearGradient
                       // Background Linear Gradient
                       colors={['rgba(0,0,0,0.8)', 'transparent']}
                       style={styles.background}
                   />
                   <LinearGradient
                       // Button Linear Gradient
                       colors={['#4c669f', '#3b5998', '#000080']}
                       start={{x: 0, y: 0}}
                       end={{x: 1, y: 1}}
                       style={styles.button}
                       >
                       <Text style={styles.subtituloButton}>Acceder</Text>
               </LinearGradient>
           </TouchableOpacity>
       </View>:
       (<Navigation/>)
       }
         </>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulos:{
    fontSize:40,
    color: '#ffffff',
    fontWeight:'bold'
  },
  subtitulo:{
    fontSize:20,
    color: '#808080',
  },
  subtituloButton:{
    fontSize:14,
    marginTop:5,
    color: '#fff',
    fontWeight:'bold'
  },
  textIput:{
    borderWidth:1,
    borderColor:'white',
    paddingStart:30,
    padding:10,
    width:'80%',
    height:50,
    marginTop:10,
    borderRadius:30,
    backgroundColor:'#fff',
    textAlign:'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  button:{
    padding:10,
    width:'80%',
    height:'25%',
    borderRadius:25,
    textAlign:'center',
    color:'#fff',
    alignItems:'center',
    marginTop:60
}
});
