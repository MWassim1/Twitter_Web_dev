const mongoose = require('mongoose')

const sch = mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    post : {
        type:String,
        required:true
    },
},{
    timestamps:true
})

module.exports = mongoose.model('posts',sch)