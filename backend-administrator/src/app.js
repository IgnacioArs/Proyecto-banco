import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({path:'./env/.env'})
import express from "express";
import cors from 'cors'
import morgan from "morgan";
import index from '../src/routes/index.js'



const app = express();

//settings
app.set('port',process.env.PORT || 3003);



//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));


//routes
app.use('/api',index);



export default app;


