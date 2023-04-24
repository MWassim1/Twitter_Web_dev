const mongoose = require('mongoose')

const sch = mongoose.Schema({
    id : {
        type:String,
        required:true
    },
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
    },
    bio : {
        type:String
    },
    age : {
        type:Number
    },
    ville : {
        type:String
    },
    pays : {
        type:String
    },
    
},{
    timestamps:true
})

module.exports = mongoose.model('user_info',sch)