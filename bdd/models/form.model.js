const mongoose = require('mongoose')

const sch = mongoose.Schema({

    lastname : {
        type:String,
        required:true
    },

    firstname : {
        type:String,
        required:true
    },

    email : {
        type:String,
        required:true
    },

    username : {
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

module.exports = mongoose.model('formSignUp',sch)