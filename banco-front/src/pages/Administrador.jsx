import React, {useEffect, useState } from 'react'
import {Spinner,Alert,Table } from 'react-bootstrap'
import { useGetUsersQuery } from '../api/apiSlice'

const Administrador = () => {

const {data:users,isError,error,isLoading} = useGetUsersQuery()
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

  return (
    <div className='container'>
      <div className='row'>
      <Table striped bordered hover variant="dark" className='col col-md-2 col-sm-3 col-xs-12 mt-5 rounded'>
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Password</th>
        <th>AccountId</th>
      </tr>
    </thead>
    {users? (
       <tbody>
        {users.data.map((u)=>(
          <tr>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.password}</td>
              <td>{u.accountId}</td>
          </tr>
        ))}
        </tbody>
    ):(<div>Error: {error.message};</div>)}
 
  </Table>
      </div>
    </div>
    
  )
     
}

export default Administrador