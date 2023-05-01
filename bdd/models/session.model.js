const mongoose = require('mongoose')

const sch = mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    session : {
        type:String,
        required:true
    },
    

},{
    timestamps:true
})

module.exports = mongoose.model('session',sch)