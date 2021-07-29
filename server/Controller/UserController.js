import mongoose from 'mongoose'
import  UserSchema from '../Model/User.js'

export default class UserController {

    user = {}

    newUser(username, email, password) {

        const User = mongoose.model('User', UserSchema)

        const newuser = new User({
            username : username ,
            email    : email,
            password : password 
        })

        this.user = newuser

        this.user.save((err, doc) => {

            try {
                this.validateUser(this.user)

                console.log('User inserted:\n', doc)
                return true;
            }
            catch(e) {
                console.log(e.message)
                return false;
            }


        })
    }

    validateUser = (user) => {
        const validPass = this.validatePassword(user)
        const validUser = this.validateUsername(user)

        let message = 'Error:\n'

        if(validPass && validUser)
            return true;
        else {
            if(!validPass) message+= '  - Password not valid\n'
            if(!validUser) message+= '  - User not valid\n'

            throw Error(message)
        }

    }
    validatePassword = ({ password }) => {
        const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-.!@#\$%\^&\*])(?=.{8,})");

        return password.match(strongPass)
    }

    validateUsername = ({ username }) => {
        const validUsername = username.length > 3

        return validUsername
    }

}
