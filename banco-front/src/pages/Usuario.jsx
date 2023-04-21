import React,{useState} from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Spinner,Table} from 'react-bootstrap'
import {useGetAccountByIdQuery} from '../api/apiSlice'
import Alert from 'react-bootstrap/Alert';
import { FaReadme,FaMoneyCheck } from "react-icons/fa";

const Usuario = () => {
  
  var array = localStorage.getItem('user');
  // Se parsea para poder ser usado en js con JSON.parse :)
  array = JSON.parse(array);
  const {data:account,isError,isLoading,error} = useGetAccountByIdQuery(array?array[5]:array);
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
 
    <Row>
    <Col md={{ span: 6, offset: 3}}>
            <Accordion defaultActiveKey="0" className='mt-5'>
              <Accordion.Item eventKey="0">
                <Accordion.Header> <FaReadme size={24}/> Mis datos </Accordion.Header>
                <Accordion.Body>
                 <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>N° Cuenta</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{array[0]}</td>
                          <td>{array[1]}</td>
                          <td>{array[2]}</td>
                          <td>{array[5]}</td>
                        </tr>
                      </tbody>
                </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header><FaMoneyCheck size={24}/> Datos de cuenta</Accordion.Header>
                <Accordion.Body>
                {account? (<div>
                  <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>codeCity</th>
                          <th>codeCountry</th>
                          <th>codeCounty</th>
                          <th>codeRegion</th>
                          <th>description</th>
                          <th>postalCode</th>
                          <th>priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{account.data.id}</td>
                          <td>{account.data.codeCity}</td>
                          <td>{account.data.codeCountry}</td>
                          <td>{account.data.codeCounty}</td>
                          <td>{account.data.codeRegion}</td>
                          <td>{account.data.description}</td>
                          <td>{account.data.postalCode}</td>
                          <td>{account.data.priority}</td>
                        </tr>
                      </tbody>
                </Table>
                </div>):(
                  <>
                  {[
                    'primary',
                    'secondary',
                    'success',
                    'danger',
                    'warning',
                    'info',
                    'light',
                    'dark',
                  ].map((variant) => (
                    <Alert key={variant} variant={variant}>
                      Error no existe la data
                    </Alert>
                  ))}
                </>
                )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion></Col>
  </Row>
  
        

    
  )
}

export default Usuario
