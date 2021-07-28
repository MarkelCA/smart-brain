//Test Schema
import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    email : String,
    password: String
  });

export default UserSchema
