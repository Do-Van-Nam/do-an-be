const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Building = new Schema({
    name : { type : String , },
    ownerId : { type : String, },
    address : { type : String, },
    noRoom : { type : Number, },
    noFloor : { type : Number, },
})

module.exports = mongoose.model('Building' , Building)