// Import de modules 
const express = require('express');
const server = express();
const router = express.Router()
const connectDataBase = require('../../bdd');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const {checkUser,auth} = require('./middleware/checkUsers')


// Permet de regler quelques problèmes 
const cors = require('cors');
const app = require('./app');
server.use(cookieParser())
server.use(cors());


//jwt 

server.get('*',checkUser);
server.get('/jwtid',auth,(_,res)=>{
  //console.log(res.locals.user.check_user._id)
  res.status(200).send(res.locals.user.check_user._id)
})

// lance l'App
require('./app')(server,router);

// Connexion à MongoDB (base de données)

connectDataBase();

const PORT = 7000

server.listen(PORT,() => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
  })
