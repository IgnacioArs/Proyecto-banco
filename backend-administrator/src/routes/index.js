import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({path:'./env/.env'})
import { json, Router } from "express";
//Importamos JWT
import  Jwt  from "jsonwebtoken";
//aqui mandamos a llamar la base de datos
import User from "../models/Administrator.js";
//axios importar
import axios from 'axios'
//importamos bcrypt 
import {enrcyptationPassword,decryptpassword} from '../../libs/enrcyptationPassword.js';
const route = Router();

//bff_account_server
const bff_account_server = process.env.bff_account;
const bff_account_id = process.env.bff_account;
const bff_users_session = process.env.bff_users_session;
const bff_account_id_user_session = process.env.bff_account_id_user_session;

route.get("/init", (req, res) => {
  return  res.send("inicio!");
})


route.post("/register", async (req, res) => {
   try {
    const {username,password,name} = req.body;
    const resultEncryptation = await enrcyptationPassword(password)
    const userCreate = await User({username,password:resultEncryptation,name});
    const result=await userCreate.save();
    if(result){
       return res.send(res.status(200).statusCode);
    }
   } catch (error) {
       return error,res.send(res.status(400).statusCode);
   }
});

route.post('/login',async (req, res) => {
        try {
            const {username,password} = req.body;
            const userFound = await User.findOne({username: username});
            if(!userFound){
                return res.send(res.status(404).statusCode);
            }
            const comparePassword = await decryptpassword(password,userFound.password);
            if(comparePassword){
             const token = Jwt.sign({_id:userFound.id},'secretkey')
             return res.status(200).json({token});
            }else{
              return  res.send(res.status(403).statusCode);
            }
        } catch (error) {
            return  res.send(res.status(401).statusCode);
        }
});

route.post('/userSession', async(req,res) => {
      const {username, password} = req.body;
      if(username && password){
        console.log("la data",username, password);
      const resultDataAccount = await axios.get(`${bff_users_session}`+"/"+`${username}`+"/"+`${password}`)
        
      console.log("NUEVO USUARIO",resultDataAccount.data.message);
      //ANQUES DE QUE AGGAMOS UN RES.SEND(ELSUAURIO);
      if(resultDataAccount.data.data){
        const token = Jwt.sign({_id:resultDataAccount.data.data.id},'secretkey')
      const tokenString = JSON.stringify(token)
      const nuevoUsuario = {
        id:resultDataAccount.data.data.id,
        name:resultDataAccount.data.data.name,
        email:resultDataAccount.data.data.email,
        password:resultDataAccount.data.data.password,
        accountId:resultDataAccount.data.data.accountId,
        token:tokenString,
        message:resultDataAccount.data.message
      }
      console.log("viendo nuevo usuario",nuevoUsuario);
      res.json(nuevoUsuario);
      }else{
        res.json(resultDataAccount.data);
      }
      }else if(!username && !password){
        res.send(res.status(204).statusCode);
      }else{
        res.send(res.status(401).statusCode);
      }
})


//CARGANDO SUS CUENTA AL USUARIO
route.post('/private-account-profile', async (req,res)  => {
    console.log(req.body.token.slice(2,-2));
    const tokenString = JSON.stringify(`${req.body.token.slice(2,-2)}`);
    var id = req.body.auth.split(",")[0].slice(19,-1);
    console.log("TOOOKEN",id);
   const response = await axios.get(`${bff_account_id_user_session}`+"/"+`${id}`)
   res.json(response.data);
})

route.get('/accounts',async (req, res) => {
    res.json([
        {
            _id:1,
            numberAccount:11111,
            bank:"banco estado"
        },
        {
            _id:2,
            numberAccount:22222,
            bank:"coopeuch"
        },
        {
            _id:3,
            numberAccount:33333,
            bank:"Scotiabank"
        }
    ])

});




/* route.get('/pruebabff', async (req,res) => {
     const resultDataAccount = await axios.get(`${bff_account_server}`)
   
    res.json(resultDataAccount.data);
}) */

route.get('/private-accounts',verifytoken,async (req, res) => {
    const resultDataAccount = await axios.get(`${bff_account_server}`)
    res.json(resultDataAccount.data);

});

route.get('/private-accounts/:id',verifytoken,async (req, res) => {
    const {id} = req.params;
    const resultDataAccount = await axios.get(`${bff_account_id}`+"/"+id)
    res.json(resultDataAccount.data);

});

route.patch('/private-accounts-update/:id',verifytoken,async (req, res) => {
    const {id} = req.params;
     await axios.patch(`${bff_account_id}`+"/"+id,req.body).then(
        res =>{console.log(res)},
        error => {console.log(error)}
    )

});

route.get('/profile',verifytoken,async (req,res) => {
    res.send(req.userId)
 })

export default route;


//Aqui realizamos la autenticacion
function verifytoken(req, res, next) {
   if(!req.headers.authorization){ 
    return res.status(401).send('not authorization!');
    }
   
   const token = req.headers.authorization.split(" ")[1];
   if(token === 'null'){
        return res.status(401).send("not authorization!");
   }
   
   const payload = Jwt.verify(token,'secretkey');
   req.userId=payload._id
   console.log("viendo la autenticacion del usuario",req.userId);
   next();
}