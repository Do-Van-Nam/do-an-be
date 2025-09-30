const mongoose = require('mongoose')
require('dotenv').config();
const MONGODB_URL  = process.env.MONGODB_URL

async function connect(){
    try { 
        await mongoose.createConnection(MONGODB_URL,
            {useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('connected to db favourite')
    } catch (error) {
        console.log("fail to connect db favourite")
        console.log(error)
    }
}

module.exports= {connect}