import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import {FaWhmcs,FaDoorClosed,FaUserAlt,FaDoorOpen,FaRegistered,FaHome} from 'react-icons/fa'

const Navegacion = () => {
  const logOutSessions = useNavigate();
  const [user,setUser] = useState(false);

useEffect(()=>{
 validationAccess();
},[user])



const validationAccess = () => {
    var array =  localStorage.getItem('user'); 
    // Se parsea para poder ser usado en js con JSON.parse :)
    var dataUser = JSON.parse(array);
    /* let isLogged = localStorage.getItem('user'); */
    setUser(dataUser);
}


const LogOut = () => {
  localStorage.clear();
  logOutSessions("/login")
  window.location.reload(true);
}

  return (
<>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">Banco estado</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              {user? (<div></div>):(<div> <NavLink to={"/"} style={{color:'GrayText',fontSize:19,textDecoration:"none"}}>Inicio <FaHome/></NavLink></div>)}
          </Nav>
          <Nav>
          <Navbar.Brand href="#">{user? (<p><FaUserAlt/> {user[1]}</p>):(<p></p>)}</Navbar.Brand>
            {user? (<NavDropdown
              id="nav-dropdown-dark-example"
              title={<FaWhmcs/>}
              menuVariant="dark"
              >
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={() => LogOut()}>
                Log Out <FaDoorClosed/>
              </NavDropdown.Item>
            </NavDropdown>):(<div><NavLink to={"/registro"} style={{color:'GrayText',fontSize:19,marginRight:10,textDecoration:"none"}}>Registro <FaRegistered/></NavLink>
            <NavLink to={"/login"} style={{color:'GrayText',fontSize:19,textDecoration:"none"}}>Login <FaDoorOpen/> </NavLink></div>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</>
  )
}

export default Navegacion
