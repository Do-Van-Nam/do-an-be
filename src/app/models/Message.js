const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    chatRoomId : {type: String},
    senderId : { type : String },
    content : { type : String },
    createdAt : { type : Date },
})

module.exports = mongoose.model('Message' , Message)