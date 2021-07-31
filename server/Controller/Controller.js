import mongoose from 'mongoose'
import UserController from './UserController.js'

class Controller {

    getUserController() {
        return UserController
    }

}


export default Controller
