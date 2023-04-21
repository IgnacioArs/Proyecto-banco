import { Schema,model } from "mongoose";

const administratorSchema = new Schema({
        username:String,
        password:String,
        name:String,
},{
        timestamps:true
});

const modelAdministrator = model("administrator",administratorSchema);

export default modelAdministrator;