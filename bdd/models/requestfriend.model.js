const mongoose = require('mongoose')

const sch = mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    friends_id : {
        type:Array,
        required:true
    },
    friends_login : {
        type:Array,
        required:true
    },
    

},{
    timestamps:true
})

module.exports = mongoose.model('requestfriend',sch)