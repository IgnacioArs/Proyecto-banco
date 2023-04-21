import {useNavigate} from 'react-router-dom'
import React, { useState,useEffect } from 'react'
/* import {useGetUsersAccessQuery} from '../api/apiSlice' */
import {Spinner,Alert,Table } from 'react-bootstrap'
import swal from 'sweetalert';
import axios from 'axios'




const Login = () => {
/* 
  const {data:users,isError,error,isLoading,refetch}= useGetUsersAccessQuery(); */
  const usuarioNavegar = useNavigate();
  const [email,setEmail] =useState('');
  const [password,setPassword]  = useState('');
  const [show, setShow] = useState(true);
  const [userData,setUserData] = useState([]);

/* if(isLoading){
    return <Spinner animation="grow"  />
}else if(isError){ return <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                          <Alert.Heading>Oh! Error en la carga de datos!</Alert.Heading>
                          <p>
                          Error: {error.message};
                          </p>
                          </Alert>;
} */

const Login = async () => {
 /*  console.log("email",email,"password",password);
  const data = await axios.get('http://localhost:3001/users/session/'+email+"/"+password)
  console.log("data antes",data) */
  
  if(email.length ===0 || password.length ===0){
    swal("Ops!", "Existen campos vacios!", "info",{buttons:"Cerrar"});
  }else{
    await axios.get('http://localhost:3001/users/session/'+email+"/"+password).then((user)=>{
    if(user.data.data){
      setUserData(user.data.data.id,user.data.data.name,user.data.data.email,user.data.data.password,user.data.data.token,user.data.accountId);
      var array = [user.data.data.id,user.data.data.name,user.data.data.email,user.data.data.password,user.data.data.token,user.data.data.accountId];
      localStorage.setItem('user',JSON.stringify(array));
      usuarioNavegar("/usuario");
      window.location.reload(true);
      swal("Bienvenido"+"  "+user.data.data.name,"Ok!"+" "+user.data.message.message, "success",{buttons:"Cerrar"});
    }else{
      swal("Error!"+user.data.message.message, "Error al iniciar session!", "error",{buttons:"Cerrar"});
    }
    })
  }
}


  return (
    <div className='Formulario'>  
        <form>
              <div class="form-row align-item-center">
                <div class="form-group col-md-6">
                  <label>Email</label>
                  <input type="email" class="form-control"  placeholder="Email" onChange={(email) => setEmail(email.target.value) }></input>
                </div>
                <div class="form-group col-md-6">
                  <label>Password</label>
                  <input type="password" class="form-control"  placeholder="Password" onChange={(password) => setPassword(password.target.value)}></input>
                </div>
                <div className='from-group col-md-6 boton'>
                <button type="button" class="btn btn-dark" onClick={() => Login()}>Acceder</button>
                </div>
              </div>
        </form>
    </div>
  )
}

export default Login
