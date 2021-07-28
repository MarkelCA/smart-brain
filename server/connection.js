/**
 * Database connection
 * Created by Markel Cuesta
 * Date: 28/07/2021 - 22:13
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import  Model  from './model/model.js'

// Pick the configuration from the .env file
dotenv.config()

let url = ''

if(process.env.FULL_DB_URL)
    url = processs.env.FULL_DB_URL
else {
    const { USER, PASSWORD, DB_NAME, DB_HOST } = process.env
    url = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
}

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('connected')
        Model.loadModel()
});
