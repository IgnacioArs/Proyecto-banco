import React,{useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useCreateUsersMutation} from '../api/apiSlice'
import swal from 'sweetalert';

const Registro = () => {

const rederigir = useNavigate();

const [createUsers] = useCreateUsersMutation();

const [nombre,setNombre] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [secondPassword,setSecondPassword] = useState('');
const [account,setAccount] = useState('');


const Register = async () => {


   console.log("nombre",nombre,"email",email,"password",password,"secondPassword",secondPassword,"Account",account)
    if(nombre.length === 0 || email.length === 0 || password.length === 0 || secondPassword.length === 0){
      swal("Ops!", "Existen campos vacios!", "info",{buttons:"Cerrar"});
    }else if(password.toString() != secondPassword.toString()){
      swal("Error!", "Las contraseñas no coinciden!", "error",{buttons:"Cerrar"});
    }else if(password.length <=6 && secondPassword.length <=6){
      swal("Error!", "Las contraseñas debe ser mayor a 6 caracteres!", "error",{buttons:"Cerrar"});
    }else if(account.length===0 || account.toString()==="0"){ 
      swal("Error!", "Por favor seleccione una cuenta!", "error",{buttons:"Cerrar"});
    }else{
       createUsers({
         name:nombre,
         email,
         password,
         accountId:account, 
      }).then((e) => {
        console.log("AQUI",e.error)
        if(e.error.status){
          swal("Error"+e.error.status,"Este email ya se encuentra registrado!", "error",{buttons:"Cerrar"});
        }
      }); 
      swal("Ok!", "Se ha registrado correctamente!", "success",{buttons:"Cerrar"});
      rederigir('/login') 
    }


}


  return (
    <div className='Formulario'>  
    <form>
          <div className="form-row align-item-center">
          <div className="form-group col-md-6">
              <label>Nombre</label>
              <input type="text" className="form-control"  placeholder="Nombre" onChange={(nombre) => setNombre(nombre.target.value) }></input>
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input type="email" className="form-control"  placeholder="Email" onChange={(email) => setEmail(email.target.value) }></input>
            </div>
            <div className="form-group col-md-6">
              <label>Password</label>
              <input type="password" className="form-control"  placeholder="Password" onChange={(password) => setPassword(password.target.value)}></input>
            </div>
            <div className="form-group col-md-6">
              <label>Repeat Password</label>
              <input type="password" className="form-control"  placeholder="Repeat password" onChange={(secondPassword) => setSecondPassword(secondPassword.target.value)}></input>
            </div>
            <div className="form-group col-md-6 ">
            <label>Select Acccount</label>
            <Form.Select aria-label="Default select example" onChange={(e) => {setAccount(e.target.value)}}>
              <option value="0">Selecct account</option>
              <option value="1" >One</option>
              <option value="2" >Two</option>
              <option value="3" >Three</option>
         
            </Form.Select>
            </div>
            <div className='from-group col-md-6 boton'>
            <button type="button" class="btn btn-dark" onClick={() => Register()}>Registro</button>
            </div>
          </div>
    </form>
</div>
  )
}

export default Registro
