import mongoose from 'mongoose'
import UserSchema from './User.js'

export default class Model {

    static loadModel() {

        const User = mongoose.model('User', UserSchema)

        const markel = new User({
            username : 'MarkelCA',
            email : 'markel@gmail.com',
            password : '1234'
        })
        
        console.log('a')
        markel.save()
    }
}

