import mongoose from 'mongoose'
import UserSchema from './User.js'

export default class Model {

    static newUser(username, email, password) {

        const User = mongoose.model('User', UserSchema)

        const newuser = new User({
            username : username ,
            email    : email,
            password : password 
        })
        
        newuser.save(function(err, doc) {
            if(err) {
                let message = 'Error: \n'
                for (var errName in err.errors) 
                    message += '  - ' +err.errors[errName].message + '\n'

                return console.log(message)
            }
            
            console.log('User inserted:\n', doc)
        })
    }
}

