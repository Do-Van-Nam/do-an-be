const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    accId : {type: String},
    items : [
        {
            itemId: {type: String},
            quantity: {type: Number, default: 1},
        }
    ],  
    status: {type: String, default: 'pending'}, // pending, completed, cancelled, shipping  
    totalAmount: {type: Number, default: 0}, 
    orderDate: {type: Date, default: Date.now},  
})

module.exports = mongoose.model('Order' , Order)