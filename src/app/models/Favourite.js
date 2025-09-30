const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Favourite = new Schema({
    accId : { type : String , },
    vendors : [{ type : String , }],

})

module.exports = mongoose.model('Favourite' , Favourite)