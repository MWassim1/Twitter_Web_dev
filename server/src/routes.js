

module.exports=function(router){
  
  router.get(`/`,(req,res)=>{
    res.send(" bvn sur /")
  })
  .post('/api/users',(req,res)=>{
    console.log("new user")
  })
  .get('/api/users',(req,res)=>{
    console.log("bvn sur /api/users")
  })
  .post('/api/login',(req,res)=>{
    console.log(" /api/login")
  })
  .put('/api/user/logout',(req,res)=>{
    console.log('/api/user/logout')
  })
  .post("/api/user/:id",(req,res)=>{
    console.log('/api/user/:id')
  })
  .post("/api/post",(req,res)=>{
    console.log("/api/post")
  })
  .get("/ai/posts",(req,res)=>{
    console.log("/api/posts")
  })
  .get("/api/getlogin/:user_id",(req,res)=>{
    console.log("/api/getlogin/:user_id")
  })
  .get("/api/getsession",(req,res)=>{
    console.log("/api/getsession")
  })
  .put("/api/setlogin",(req,res)=>{
    console.log("/api/setlogin")
  })
  .get("/api/logged",(req,res)=>{
    console.log("/api/logged")
  })
  .put("/api/user/islogged",(req,res)=>{
    console.log("/api/user/islogged")
  })
  .get("/api/user/:id",(req,res)=>{
    console.log("/api/user/:id")
  })
  .put("/api/user/:id",(req,res)=>{
    console.log("/api/user/:id")
  })
  .get("/api/post/:id",(req,res)=>{
    console.log("/api/post/:id")
  })
  .put("/api/post/:id",(req,res)=>{
    console.log("/api/post/:id")
  })
  .delete("/api/post/:id",(req,res)=>{
    console.log(" del /api/post/:id")
  })
  .post("/api/friend/:id1/:id2",(req,res)=>{
    console.log("/api/friend/:id1/:id2")
  })
  .get("/api/friend/:id",(req,res)=>{
    console.log("/api/friend/:id")
  })
  .delete("/api/friend/:id1/:id2",(req,res)=>{
    console.log("/api/friend/:id1/:id2")
  })
  .post("/api/post/comment/:id/:id_post",(req,res)=>{
    console.log("/api/post/comment/:id/:id_post")
  }) 
  .get("/api/post/comment/:id_post",(req,res)=>{
    console.log("/api/post/comment/:id_post")
  })
  .put("/api/post/comment/:id_post",(req,res)=>{
    console.log("/api/post/comment/:id_post")
  })
  .delete("/api/post/comment/:id_post",(req,res)=>{
    console.log("/api/post/comment/:id_post")
  })
  .put("/api/user/:id/:id_follow",(req,res)=>{
    console.log("/api/user/:id/:id_follow")
  })
  .get("/api/user/followers/:id_follow",(req,res)=>{
    console.log("/api/user/followers/:id_follow")
  })
  .get("/api/users/:username",(req,res)=>{
    console.log("/api/users/:username")
  })
  .get("/api/post2/:id_post",(req,res)=>{
    console.log("/api/post2/:id_post")

  })
  .put("/api/savesession",(req,res)=>{
    console.log("/api/savesession")
  })
  .get("/api/getsession/:user_id",(req,res)=>{
    console.log("/api/getsession/:user_id")
  })
  .get("/api/userinfo/:id",(req,res)=>{
    console.log("/api/userinfo/:id")
  })



}







