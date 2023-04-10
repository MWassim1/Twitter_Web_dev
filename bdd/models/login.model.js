const mongoose = require('mongoose')

const sch = mongoose.Schema({

    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('login',sch)