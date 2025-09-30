const mongoose = require('mongoose')
require('dotenv').config();
const MONGODB_URL  = process.env.MONGODB_URL

async function connect(){
    try { 
        await mongoose.connect(MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to dbaccs")
    } catch (error) {
        console.log("fail to connect dbaccs")
        console.log(error)
    }
}

module.exports  = {connect}