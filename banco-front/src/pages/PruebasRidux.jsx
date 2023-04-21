import React, { useState } from 'react'
import {useGetUserLoginQuery} from '../api/apiSlice'
import {Spinner,Alert,Table } from 'react-bootstrap'

const PruebasRidux = () => {



  var array = localStorage.getItem('user');
  // Se parsea para poder ser usado en js con JSON.parse :)
  array = JSON.parse(array);
  
  /* const {data:users,isError,error,isLoading} = useGetUserLoginQuery({email:`${JSON.stringify(array[2]).toString()}`,password:`${JSON.stringify(array[3]).toString()}`}); */
  const {data:users,isError,error,isLoading} = useGetUserLoginQuery(array[2]?array[2]:array[2]);
  const [show, setShow] = useState(true);

   if(isLoading){
          return <Spinner animation="grow" className='mt-5'/>
    }else if(isError){    return <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                  <Alert.Heading>Oh! Error en la carga de datos!</Alert.Heading>
                                  <p>
                                  Error: {error.message};
                                  </p>
                                  </Alert>;
    }
    console.log("servidor respondiendo",users);

  return (
    <div>
      <h1>dataaaaaaaaaaa</h1>
    </div>
  )
}

export default PruebasRidux
