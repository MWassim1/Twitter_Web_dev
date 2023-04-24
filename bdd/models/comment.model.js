const mongoose = require('mongoose')

const sch = mongoose.Schema({

    post_id:{
        type:String,
        required:true
    },
    comments : {
        type:String,
        required:true
    },
    user_comment : {
        type:String,
        required:true
    },
    

},{
    timestamps:true
})

module.exports = mongoose.model('comment',sch)