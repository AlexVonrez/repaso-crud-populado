const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterModel = new Schema({
    name:{
        type:String,
        unique:true,
    },
    description:{
        type:String,
    },
    inversions:{
        type:Number,
        min:0
    },
    length:{
        type:Number,
        min:0
    },
    active:{
        type:Boolean,
    },
    park_id:{
        type: mongoose.SchemaTypes.ObjectId, ref:'Park',
    }
})

module.exports = mongoose.model('Coaster', coasterModel)