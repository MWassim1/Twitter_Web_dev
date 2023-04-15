const mongoose = require('mongoose')

const sch = mongoose.Schema({

    id : {
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    isconnected : {
        type:Boolean,
        required : true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('login',sch)