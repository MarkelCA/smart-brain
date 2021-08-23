import mongoose from 'mongoose'
const { Schema } = mongoose;

//const UserController = new Controller().getUserController()


const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        validate: {
            validator: async function(username) {
                return !(await User.countDocuments({ username : username }))
            },
            message : "This username is already in use."
        }
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


const User = mongoose.model('User', UserSchema)
export default User
