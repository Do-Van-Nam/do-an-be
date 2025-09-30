const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const ChatRoom = new Schema({
    user1Id : {type: String},
    user2Id : { type : String },
})

module.exports = mongoose.model('ChatRoom' , ChatRoom)