// Import de modules 
const express = require('express');
const server = express();
const router = express.Router()
const connectDataBase = require('../../bdd');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');



// Permet de regler quelques problèmes 
const cors = require('cors');
const app = require('./app');



// Cookies
server.use(cookieParser())
server.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));

server.use(bodyParser.urlencoded({extended:true}))
server.use(session({
  key:"user",
  secret:process.env.TOKEN,
  resave: false , 
  saveUninitialized : false,
  cookie:{
    expires : 3600*24*24,
  }
}))


// lance l'App
require('./app')(server,router);

// Connexion à MongoDB (base de données)

connectDataBase();

const PORT = 7000

server.listen(PORT,() => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
  })
