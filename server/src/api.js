const { formSignIn, formSignUp,logout,user_id,new_post,get_post,setlogin,getlogged,get_user, islogged,setUser,get_post_id,setPost,delPost,addFriend,getFriend,delFriend,addComment,getComments,setComment,delComment,addFollow,getFollowers} = require('../../bdd/function');

  
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
.put("/api/user/:id",setUser)

//GET /api/logged (obtention des utilisateurs connectés)
.get("/api/logged",getlogged)





// Publication de contenu: \\

//POST /api/post (création d'une publication)

.post("/api/post",new_post)


//GET /api/posts(obtention de toutes les publications)

.get("/api/posts",get_post)

//GET /api/post/:id (obtention d'une publication specifique)
.get("/api/post/:id",get_post_id)

//PUT /api/post/:id (mise à jour du post id )
.put("/api/post/:id",setPost)

//DELETE /api/post/:id (Suppression du post id)
.delete("/api/post/:id",delPost)




// Gestion des amis : \\

//POST /api/friend/:id1/:id2 (id1 ajoute en ami id2)
.post("/api/friend/:id1/:id2",addFriend)

//GET /api/friend/:id (Obtention de  de toutes les informations liées aux amis de :id)
.get("/api/friend/:id",getFriend)

//DELETE /api/friend/:id1/:id2 ( id1 supprime id2)
.delete("/api/friend/:id1/:id2",delFriend)



// Gestion des commentaires : \\

//POST /api/post/comment/:id/:id_post (id ajoute un commentaire sous le post id_post)
.post("/api/post/comment/:id/:id_post",addComment) 


//GET /api/post/comment/:id_post (Obtention de  de toutes les informations liées aux commentaires de la publication :id_post)
.get("/api/post/comment/:id_post",getComments)


//PUT  /api/post/comment/:id_post (met à jour un commentaire sous le post id_post)
.put("/api/post/comment/:id_post",setComment)


//DELETE /api/post/comment/:id_post (supprime un commentaire sous le post id_post)

.delete("/api/post/comment/:id_post",delComment)



// Gestion des follows : \\

//PUT /api/user/:id/:id_follow (Ajoute id1 comme followers pour id_follow)

.put("/api/user/:id/:id_follow",addFollow)

//GET /api/user/followers/:id_follow (Obtention de toutes les informations liées aux follows de :id_follow )
.get("/api/user/followers/:id_follow",getFollowers)


} 



