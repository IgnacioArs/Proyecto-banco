import { Navigate, Outlet }  from "react-router-dom";
import {useGetUserLoginQuery} from '../api/apiSlice';
import {Spinner,Alert,Table } from 'react-bootstrap';
import React,{useState} from 'react';


const ProtectedRoutes = () => {

  var array = localStorage.getItem('user');
  // Se parsea para poder ser usado en js con JSON.parse secretkey:)
  array = JSON.parse(array);
  const {data:users,isError,error,isLoading} = useGetUserLoginQuery(array?array[2]:array)
  const [show, setShow] = useState(true);

   if(isLoading){
          return <Spinner animation="grow"  />
    }else if(isError){ return <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                              <Alert.Heading>Oh! Error en la carga de datos!</Alert.Heading>
                              <p>
                              Error: {error.message};
                              </p>
                              </Alert>;
    }
    console.log("miremos users protected routes",users)
    if(!users.data){
       return <Navigate to="/login"/>
    }

  return (
  <Outlet/>
  )
}

export default ProtectedRoutes
