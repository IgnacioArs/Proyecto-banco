import { Navigate, Outlet }  from "react-router-dom"
import {useGetUserLoginQuery} from '../api/apiSlice'
import {Spinner,Alert,Table } from 'react-bootstrap'
import React,{useState} from 'react'

const ProtectedRoutesNoLogin = () => {
   
  let isLogged = localStorage.getItem('user');
  isLogged = JSON.parse(isLogged);
  const {data:users,isError,error,isLoading} = useGetUserLoginQuery(isLogged?isLogged[2]:isLogged)
  const [show, setShow] = useState(true);
  
    if(isLoading){
          return <Spinner animation="grow"  />
    }else if(isError){ return <Navigate to="/usuario"/>
    }
    console.log("miremos users no login",users)
    if(isLogged){
       return <Navigate to="/usuario"/>
    }


  return (
    <Outlet/>
  )
}

export default ProtectedRoutesNoLogin
