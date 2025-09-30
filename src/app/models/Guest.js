const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Guest = new Schema({
    accId : {type: String},
    guestList: [
        {
            name:{type:String},
            email:{type:String},
            phone: {type:String}
        }
    ]
})

module.exports = mongoose.model('Guest' , Guest)