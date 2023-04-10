
const mongoose = require('mongoose')

const connectDataBase= async ()=>{


    try{
        mongoose.set("strictQuery",false)
        mongoose.connect(process.env.MONGO_URI_USERS)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDataBase;


