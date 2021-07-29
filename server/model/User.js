//Test Schema
import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        validate : {
            validator : function(name) {
                return name.length > 3
            },
            message : 'Username must have more than 3 characters.'
        }
    },
    email   : String,
    password: {
        type : String,
        validate: {
            validator : function (pass) {
                var strongPass = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                return pass.match(strongPass)
            },
            message : "The password must be 8 characters or longer and must contain at least 1 lowercase, one uppercase, one number and one special character"
        }
    }
  });

export default UserSchema
