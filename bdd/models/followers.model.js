const mongoose = require('mongoose')

const sch = mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    followedBy : {
        type:Array,
        required:false
    },
    follow : {
        type:Array,
        required:false
    },
    

},{
    timestamps:true
})

module.exports = mongoose.model('follow',sch)