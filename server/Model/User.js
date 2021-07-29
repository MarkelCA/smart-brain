//Test Schema
import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
            //message : 'Username must have more than 3 characters.'
    },
    email   : String,
    password: {
        type : String,
            //message : "The password must be 8 characters or longer and must contain at least 1 lowercase, one uppercase, one number and one special character"
    }
 });


export default UserSchema
