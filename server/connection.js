// getting-started.js


import mongoose from 'mongoose'
import path from 'path'
import User from './model/User.js'
///import User from './model/User'

import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const config = dotenv.config()
//dotenv.config({ path : path.resolve(import.meta.url, '../../.env')})
console.log(process.env)

dotenvExpand(config)


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected')
});
