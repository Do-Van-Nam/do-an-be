const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    accId : {type: String},
    vendors : [
        {
            vendorId: {type: String},
            quantity: {type: Number, default: 1},
        }
    ],    
})

module.exports = mongoose.model('Cart' , Cart)