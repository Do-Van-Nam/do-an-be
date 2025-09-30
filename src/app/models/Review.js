const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Review = new Schema({
    vendorItemId : {type: String},
    accId : { type : String, },
    review : { type : String, },
    rate : {type: Number},
   
})

module.exports = mongoose.model('Review' , Review)