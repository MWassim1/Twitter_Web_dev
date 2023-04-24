const FormModel = require('./models/form.model')
const PostModel = require('./models/post_model')
const LoginModel = require('./models/login.model')
const UserModel = require('./models/user.model')
const FriendModel = require('./models/friend.model')
const CommentModel = require('./models/comment.model')
const FollowModel = require('./models/followers.model')

// hash
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const salt =  10






module.exports.formSignIn = async (req,res)=>{
    const {email,password} = req.body
    let k_email = email.trim()
    const check_user  = (await FormModel.findOne({email: k_email}))
    console.log(check_user)
    if(check_user === null ){
        return res.status(401).send("Compte inexistant")
    }
    bcrypt.compare(password,check_user.password,(_,r)=>{
        if(r){
           // console.log("OK hash")
            req.session.user = check_user
            console.log("OK session : ")
            console.log(req.session.user)
            return res.status(200).send(check_user)
        }
        else {
            return res.status(401).send("Compte inexistant")
        }
    })
}



module.exports.formSignUp = async (req,res) => {
    const {lastname,firstname,email,username,password} = req.body
    if(!lastname || !firstname || !email || !username || !password){
       return  res.status(400).send("Requte invalide -> nom, prénom, email, nom d'utilisateur et le mot de passe doivent être renseignés ")
    }

    let k_lastname=lastname.trim()
    let k_firstname=firstname.trim()
    let k_email=email.trim()
    let k_username=username.trim()
    if(k_email === ""){return res.status(430).send("Saissez une adresse mail")}
    if(k_lastname===""){return res.status(430).send("Saissez votre nom")}
    if(k_firstname===""){return res.status(430).send("Saissez votre prénom")}
    if(k_username===""){return res.status(430).send("Entrez un mot de passe")}

    if((await FormModel.find({email :  k_email})).length !== 0){
       return  res.status(403).send("Erreur l'adresse mail est déjà utlisée. Essayez une autre adresse.")
    }
    bcrypt.hash(password,salt)
        .then(hash=>{
            new FormModel({
                lastname:k_lastname,
                firstname:k_firstname,
                email:k_email,
                username:k_username,
                password:hash
            })
            .save()
            .then((new_user)=>{
                console.log(new_user)
                return res.status(201).json(new_user)
            })
            .catch((err)=>{res.status(500).json(err)})
        })
        .catch((err)=>{res.status(500).json(err)})
}


module.exports.logout = async (req,res) => {
    
    const {id, email , password, isconnected } = req.body
    const user_updated = await LoginModel.updateOne({id: id, email :email,password:password},{$set :{isconnected: isconnected}})
    console.log("iciiciccici :"+ req.body)
    res.cookie('user','',{maxAge:1})
    res.status(200).send("logout OK")



}

module.exports.user_id = async(req,res)=>{
    console.log(req.body)
    const user = await FormModel.findById(req.body)
    console.log("ok user : ",user)
    if(user===null){
        console.log("401")
        return res.status(401).send(user)
    }
    return res.status(200).send(user)
}

module.exports.new_post= async(req,res)=>{
    //console.log(req.body) 
    const {user_id,username,post} = req.body
    const new_post = await PostModel.create({
        user_id:user_id,
        username:username,
        post:post
    })
    return res.status(200).send(new_post)
}

module.exports.get_post=async(req,res)=>{

    const posts = await PostModel.find()
    console.log(Object.keys(posts).length)
    console.log(posts[0])
    if(posts[0]!==undefined){
        const date = posts[0].createdAt
        console.log(date.getHours()+':'+date.getMinutes()+ ' - '+ date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear())
        return res.status(200).send(posts)
    }
    return res.status(403)
}

module.exports.setlogin= async(req,res)=>{
    const {id , email , password, isconnected } = req.body
    let k_email=email.trim()
    const user = (await LoginModel.find({id:id ,email :  k_email,password:password}))
    console.log(user,user.length === 0)
    if(user.length === 0){
            await LoginModel.create({
            id: id,
            email : email,
            password : password,
            isconnected : isconnected

        })
    }
    else {  
            const user_updated = await LoginModel.updateOne({id:id , email :  k_email,password:password},{$set :{isconnected: isconnected}})
            return res.status(200).send(user_updated)
    }
    return res.status(201).send(user)
    
}

module.exports.getlogged = async (req,res)=>{


    const user_logged = await LoginModel.find({isconnected:true})
    res.status(200).send(user_logged)
}

module.exports.islogged = async(req,res)=>{
    const user = await LoginModel.find({id : req.body.id})
    console.log(req.body)
    if(user.length === 0){
      return  res.status(401).send(req.body)
    }
    console.log(user[0].isconnected)
    return res.status(200).send(user[0].isconnected)
    
}

module.exports.get_user = async(req,res)=>{
  
    const user = await FormModel.find({_id :req.params.id})
    if(user.length === 0 ){
        return res.status(404).send(user)
    }
    console.log(user)
    return res.status(200).send(user)
}


module.exports.setUser = async (req,res)=>{

    const {lastname,firstname,email,username,password,bio,age,pays,ville} = req.body
    const user  = await UserModel.find({id :req.params.id})
    if(user.length === 0){
       const new_user=  await UserModel.create({
            id : req.params.id,
            lastname:lastname,
            firstname:firstname,
            email:email,
            username:username,
            password:password,
            bio:bio,
            age:age,
            pays:pays,
            ville:ville

        })
        return res.status(201).send(new_user)
    }
    const user_updated = await UserModel.updateOne({id:req.params.id},{$set : {lastname:lastname,firstname:firstname,email:email,username:username,password:password,bio:bio,age:age,pays:pays,ville:ville}})
    return res.status(200).send(user_updated)

}

//obtention d'une publication specifique
module.exports.get_post_id = async(req,res)=> {
    const posts = await PostModel.find({user_id:req.params.id})
    console.log(req.params.id)
    if(posts.length === 0 ){
        return res.status(404).send(posts)
    }
    return res.status(200).send(posts)

}

module.exports.setPost = async(req,res) =>{
    const {post} = req.body
    const post_id = new ObjectId(req.params.id)
    const post_updated =  await PostModel.updateOne({_id:post_id},{$set : {post:post}})
    if(post_updated.matchedCount === 0){
        return res.status(404).send("Post not found")
    }
    
    return res.status(200).send(post_updated)

}

module.exports.delPost = async(req,res) =>{
    const post_id = new ObjectId(req.params.id)
    const post_deleted = await PostModel.deleteOne({_id:post_id})
    if(post_deleted.deletedCount === 0){
        return res.status(404).send("Post not found")
    }
    return res.status(200).send(post_deleted)
}

module.exports.addFriend = async(req,res) =>{
    const friends = await FriendModel.findOne({user_id:req.params.id1})
    const friends2 = await FriendModel.findOne({user_id:req.params.id2})
    const id2 = new ObjectId(req.params.id2)
    const id1 = new ObjectId(req.params.id1)
    const friend = await FormModel.findOne({_id:id2})
    const friend2 = await FormModel.findOne({_id:id1})
    if(friends === null){
       const  new_friend = await FriendModel.create({
            user_id : req.params.id1,
            friends_id: req.params.id2,
            friends_login : friend.username 
        })
        if(friends2 === null){
            await FriendModel.create({
                user_id : req.params.id2,
                friends_id: req.params.id1,
                friends_login : friend2.username 
            }) // Par symétrie
        }
        return res.status(201).send(new_friend)
    }
      
    // Test si id1 a déjà en ami id2
    if(Object.keys(friends.friends_id).find(key => friends.friends_id[key] === req.params.id2) !== undefined){ // Donc ils sont déjà amis 
        return res.status(208).send(friends)
    }
    // console.log(friend2)
    if(friends2 === null){
        await FriendModel.create({
            user_id : req.params.id2,
            friends_id: req.params.id1,
            friends_login : friend2.username 
        }) // Par symétrie
    }
    else {
        await FriendModel.updateOne({user_id:req.params.id2},{$set : {friends_id : friends2.friends_id.concat(req.params.id1),friends_login:friends2.friends_login.concat(friend2.username)}})
    }
    const add_friend = await FriendModel.updateOne({user_id:req.params.id1},{$set : {friends_id : friends.friends_id.concat(req.params.id2),friends_login:friends.friends_login.concat(friend.username)}})
    return res.status(200).send(add_friend)

}

module.exports.getFriend = async(req,res)=>{
    const friends = await FriendModel.find({user_id:req.params.id})
    if(friends.length ===0){
        return res.status(200).send("No friends")

    }
    return res.status(200).send(friends[0].friends_login)
}

module.exports.delFriend = async(req,res)=>{
    const friends = await FriendModel.find({user_id:req.params.id1})
    const friends2 = await FriendModel.find({user_id:req.params.id2})
    if(friends.length === 0){
        return res.status(200).send(friends)
    }
    const index = Object.keys(friends[0].friends_id).find(key => friends[0].friends_id[key] === req.params.id2 )
    delete friends[0].friends_id[index]
    delete friends[0].friends_login[index]
    const f1_id = friends[0].friends_id.filter(x => x!== undefined)
    const f1_login = friends[0].friends_login.filter(x => x!== undefined)
    await FriendModel.updateOne({user_id:req.params.id1},{$set :{friends_id :f1_id,friends_login:f1_login}})
    const friend_deleted = await FriendModel.find({user_id:req.params.id1})

    //Par symétrie 
    const index2 = Object.keys(friends2[0].friends_id).find(key => friends2[0].friends_id[key] === req.params.id1 )
    delete friends2[0].friends_id[index2]
    delete friends2[0].friends_login[index2]
    const f2_id = friends2[0].friends_id.filter(x => x!== undefined)
    const f2_login = friends2[0].friends_login.filter(x => x!== undefined)
    await FriendModel.updateOne({user_id:req.params.id2},{$set :{friends_id :f2_id,friends_login:f2_login}})
    
    return res.status(200).send(friend_deleted)
}

module.exports.addComment = async(req,res) =>{
    const {comment}  = req.body 
    const id_post  = new ObjectId(req.params.id_post)
    const post = await PostModel.find({_id:id_post})
    if(post.length === 0 ){
        return res.status(404).send("POST not found")
    }
    const new_post_w_comments = await CommentModel.create({
        post_id : req.params.id_post,
        comments : comment,
        user_comment : req.params.id
    })
    return res.status(201).send(new_post_w_comments)
}

module.exports.getComments = async(req,res)=>{

    const comments = await CommentModel.find({post_id:req.params.id_post})
    if(comments === 0 ){
        return res.status(404).send("POST not found")
    }
    return res.status(200).send(comments)
}

module.exports.setComment = async(req,res)=>{
    const {old_comment,new_comment,user_comment,createdAt} = req.body 
    const comment_updated = await CommentModel.updateOne({post_id:req.params.id_post,comments:old_comment,user_comment:user_comment,createdAt:createdAt},{$set : {comments : new_comment}})
    return res.status(200).send(comment_updated)


}

module.exports.delComment = async(req,res) =>{
    const {comment,user_comment,createdAt} = req.body 
    const comment_deleted = await CommentModel.deleteOne({post_id:req.params.id_post,comments:comment,user_comment:user_comment,createdAt:createdAt})
    return res.status(200).send(comment_deleted)
    
}

module.exports.addFollow = async(req,res)=>{
    const user_followed = await  FollowModel.findOne({user_id:req.params.id_follow})
    if(user_followed === null){
        const new_user_followed = await FollowModel.create({
            user_id: req.params.id_follow,
            followedBy : req.params.id,
            follow : undefined
        })
        const user_id = await  FollowModel.findOne({user_id:req.params.id})
        if(user_id === null ){
            await FollowModel.create({
                user_id: req.params.id,
                followedBy : undefined,
                follow : req.params.id_follow
            })
        }
        else {
            await FollowModel.updateOne({user_id:req.params.id},{$set : {follow : user_id.follow.concat(req.params.id_follow)}})
        }
        return res.status(200).send(new_user_followed)
    }


    await FollowModel.updateOne({user_id:req.params.id_follow},{$set : {followedBy : user_followed.followedBy.concat(req.params.id)}})
    const user_id = await  FollowModel.findOne({user_id:req.params.id})
    if(user_id === null ){
        await FollowModel.create({
            user_id: req.params.id,
            followedBy : undefined,
            follow : req.params.id_follow
        })
    }
    else {
        await FollowModel.updateOne({user_id:req.params.id},{$set : {follow : user_id.follow.concat(req.params.id_follow)}})
    }
    const user_followed_updated = await  FollowModel.findOne({user_id:req.params.id_follow})
    return res.status(200).send(user_followed_updated)
}

module.exports.getFollowers = async(req,res)=>{
    const getfollowers = await FollowModel.find({user_id:req.params.id_follow})
    if(getfollowers.length === 0 ){
        return res.status(404).send("User not found")
    }
    return res.status(200).send(getfollowers[0])
}