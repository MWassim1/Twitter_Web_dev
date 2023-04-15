const { formSignIn, formSignUp,logout,user_id,new_post,get_post,setlogin,getlogged,get_user, islogged} = require('../../bdd/function');

  
module.exports=function(app){

  require('dotenv').config()
  const path = require('path')
  const bodyParser = require('body-parser');
  const { userInfo } = require('os');
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  


// Système d'authentification et de gestion des utilisateurs: \\


//POST /api/users (récupère le formulaire d'inscription + création de compte utilisateur)
app.post(`/api/users`,formSignUp)


//PUT /api/users/:id (mise à jour  de compte utilisateur)



//POST /api/login (connexion d'un utilisateur)
.post("/api/login",formSignIn)

    
//GET /api/getlogin (vérifie si l'utilisateur est connecté)
.get("/api/getlogin",(req,res)=>{
  if(req.session.user){
    console.log(req.session.user)
    res.send({loggedIn: true,user: req.session.user})
  }else { res.send({loggedIn: false})}
})

//put /api/user/logout (déconnexion d'un utilisateur + mise à jour de l'état de l'utilisateur )

.put("/api/user/logout",logout)


//PUT /api/setlogin (met à jour l'état de l'utilisateur)

.put("/api/setlogin",setlogin)



//GET /api/users/:id (obtention des informations sur un utilisateur)

.get("/api/user/:id",get_user)

//PUT /api/users/islogged (savoir si l'utilisateur est connecté)

.put("/api/user/islogged",islogged)

//POST /api/user/:id (met à jour l'utilisateur connecté)
.post("/api/user/:id",user_id)


//PUT /api/users/:id (mise à jour des informations d'un utilisateur)


//GET /api/logged (obtention des utilisateurs connectés)
.get("/api/logged",getlogged)





// Publication de contenu: \\

//POST /api/post (création d'une publication)

.post("/api/post",new_post)


//GET /api/posts(obtention de toutes les publications)

.get("/api/posts",get_post)

  
} 



