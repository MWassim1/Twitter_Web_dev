const mongoose = require('mongoose')

const sch = mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    posts_liked: {
        type:Array,
        required:true
    },
    

},{
    timestamps:true
})

module.exports = mongoose.model('like_post',sch)