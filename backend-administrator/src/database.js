import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/angular-auth',{
    useNewUrlParser:true,
    useunifiedtopology:true
}).then(db=>console.log("Connected to MONGODB!"))
  .catch(error =>console.log("Error=>",error));