const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const VendorItem = new Schema({
    accId : {type: String},
    name : { type : String, },
    type : { type : String, },
    description : { type : String, },
    address: {type:String},
    subInfo : { type : String, },
    priceFrom : {type: Number},
    priceTo : {type: Number},
    rate : {type: Number,default:0},
    noReview : {type: Number,default:0},
    imgLink: {type:String}
})

module.exports = mongoose.model('VendorItem' , VendorItem)