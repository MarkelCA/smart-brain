//import mongoose from 'mongoose'
import  Model from '../Model/model.js'
const User = new Model().getUser()

export default class UserController {

    user = {}

    getUser = async (username) => {
        const user = await User.find({ username : username}
            ).exec()
        return user
    }

    newUser = async (username, email, password) => {


        const newuser = new User({
            username : username ,
            email    : email,
            password : password 
        })

        this.user = newuser
        await this.user.save( async (err, doc) => {
            try {
                this.validateUserSchema()
                await this.validateUserFields()

                console.log("User '" + doc.username + "' successfully inserted.\n", )
                return true;
            }
            catch(e) {
                //console.log('catchhhhh')
                console.log(e.message)
                return false;
            }


        })
    }

    validateUserSchema = () => {
        const userErrors = this.user.validateSync() || null

        if(userErrors) {
        let message = 'Error inserting user:'
            for(const field in userErrors.errors) 
                message += '\n   - ' + userErrors.errors[field].message

            //console.log(userErrors.errors)
            throw Error(message)
        }

    }
    validateUserFields = async () => {

        const validPass = this.validatePassword(this.user)
        const validUser = await this.validateUsername(this.user)

        if(validPass.valid && validUser.valid) {
            return true;
        }

        else {
            let message = 'Error:\n'
            if(!validPass.valid) message+= validPass.message
            if(!validUser.valid) message+= validUser.message

            throw Error(message)
        }

    }

    /*
     * Strong password Regex
     * 
     * ^	            The password string will start this way
     * (?=.*[a-z])	    The string must contain at least 1 lowercase alphabetical character
     * (?=.*[A-Z])	    The string must contain at least 1 uppercase alphabetical character
     * (?=.*[0-9])	    The string must contain at least 1 numeric character
     * (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
     * (?=.{8,})	    The string must be eight characters or longer
     */
    validatePassword = ({ password }) => {
        const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-.!@#\$%\^&\*])(?=.{8,})");

        return {
            valid    : password.match(strongPass),
            message  : '  - Password must cointain at least 8 characters, a number, an uppercase and lowercase letter and a special character.\n'
        }
    }

    /*
     * Valid Username Regex
     *        
     *  ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
     *   └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
     *         │         │         │            │           no _ or . at the end
     *         │         │         │            │
     *         │         │         │            allowed characters
     *         │         │         │
     *         │         │         no __ or _. or ._ or .. inside
     *         │         │
     *         │         no _ or . at the beginning
     *         │
     *         username is 8-20 characters long
     */
    validateUsername = async ({ username }) => {
        const validUser = new RegExp("^(?=.{8,20}$)[a-zA-Z0-9._]+(?<![_.])$");

        const identicNames = await this.validateUniqueUser(username)

        console.log(identicNames)

       if(identicNames) 
            return {
                valid    : false,
                message  : '  - The username is already in use.\n'
            }

        else if(!validUser)
            return {
                valid    : false,
                message  : '  - The user must contain between 8 and 20 characters.\n'
            }

        else
            return { valid : true }

    }
    validateUniqueUser = async (username) => {
        return await User.countDocuments({ username : username })
    }

}
