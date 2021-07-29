//Test Schema
import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    
 });

const UserModel = mongoose.model('User', UserSchema)

export { UserSchema, UserModel } 
