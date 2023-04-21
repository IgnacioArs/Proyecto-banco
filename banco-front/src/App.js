import {useGetUsersAccessQuery} from '../src/api/apiSlice'
import {Spinner,Alert,Table } from 'react-bootstrap'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Usuario from './pages/Usuario';
import Administrador from './pages/Administrador';
import Registro from './pages/Registro';
import Navegacion from './components/Navegacion';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import PruebasRidux from './pages/PruebasRidux';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect,useState } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedRoutesNoLogin from './components/ProtectedRoutesNoLogin';

function App() {



  return (

        <div className="App">
        <BrowserRouter>
        <Navegacion/>
            <Routes>
              
              <Route element={<ProtectedRoutesNoLogin/>}>
              <Route path='/' element={<Inicio/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/registro' element={<Registro/>}></Route>
              </Route>
               
              <Route element={<ProtectedRoutes/>}>
              <Route path='/usuario' element={<Usuario/>}></Route>
              <Route path='/administrador' element={<Administrador/>}></Route>
              <Route path='/pruebas' element={<PruebasRidux/>}></Route>
              </Route>

              <Route path="*" element={<Navigate to={"/"}/>}></Route>
            </Routes>
          <Footer/>
        </BrowserRouter>
        </div>

  );
  }


export default App;
