const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Plan=new Schema({
    accId:{type:String},
    budget:{type:Number},
    paid:{type:Number},
    date:{type:Date},
    location:{type:String},
    partner:{type:String},
    vendors:[
        {vendorType:{type:String},
            vendorId: {type:String}
        }
    ]
})


module.exports = mongoose.model('Plan',Plan)