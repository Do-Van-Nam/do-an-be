const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema({
    roomName : { type : String , },
    tenantId : { type : String, },
    buildingId : { type : String, },
    floor : { type : Number, },
    isRented: {type:Boolean},
    price: {type:Number},
    startday : {type: Date},
    noPrepaidMonths: {type: Number},
})

module.exports = mongoose.model('Room' , Room)