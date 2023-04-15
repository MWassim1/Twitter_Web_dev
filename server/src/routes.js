

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
  .get("/api/getlogin",(req,res)=>{
    console.log("/api/getlogin")
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
  

  

  




}


// const users = [{
//   firstname:'test',
//   lastname:'nomtest',
//   email:'test@gmail.com',
//   login:'Test',
//   password:'test_password'
// }];


// app.get((`/api/users`),(req,res) => {
//       res.send({
//           data : [
//               {
//                   firstname:'test',
//                   lastname:'nomtest',
//                   email:'test@gmail.com',
//                   login:'Test',
//                   password:'test_password'
//               }

//           ]
//       })

//   })

//   app.get((`/api/users/:id`),(req,res) => {

//     const id = req.params.id-1;
//     res.send({
//         data : users[id] || null
//     })

// })


// //POST /api/users (récupère un formulaire)
// app.post(`/api/users`,(req,res)=>{
//   const data = req.body
//   users.push(data)
//   res.send({
//     index: users.length,
//     data : users[users.length-1]

//   })
// })




