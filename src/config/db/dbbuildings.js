const mongoose = require('mongoose')
require('dotenv').config();
const MONGODB_URL  = process.env.MONGODB_URL
// const MONGODB_URL = 'mongodb+srv://nam:1234@cluster0.sqajz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


async function connect(){
    try { 
        await mongoose.createConnection(MONGODB_URL,
            {    useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to dbbuildings")
    } catch (error) {
        console.log("fail to connect dbbuildings")
        console.log(error)
    }
}

module.exports  = {connect}