import mongoose from 'mongoose'
const { Schema } = mongoose;

//const UserController = new Controller().getUserController()


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

//UserSchema.pre('save', async (err, doc) => {
    //try {
        //UserController.validateUserSchema()
        //await UserController.validateUserFields()

        //console.log("User '" + doc.username + "' successfully inserted.\n", )
        //return true;
    //}
    //catch(e) {
        ////console.log('catchhhhh')
        //console.log(e.message)
        //return false;
    //}

//})

const User = mongoose.model('User', UserSchema)
export default User
