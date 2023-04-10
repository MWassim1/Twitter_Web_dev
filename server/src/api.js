const { formSignIn, formSignUp,logout,user_id,new_post,get_post} = require('../../bdd/function');

  
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

    


//GET /api/user/logout (déconnexion d'un utilisateur)

.get("/api/user/logout",logout)






//GET /api/users/:id (obtention des informations sur un utilisateur)

.post("/api/user/:id",user_id)


//PUT /api/users/:id (mise à jour des informations d'un utilisateur)




// Publication de contenu: \\

//POST /api/post (création d'une publication)

.post("/api/post",new_post)


//GET /api/posts(obtention de toutes les publications)

.get("/api/posts",get_post)

  
} 



