const FormModel = require('./models/form.model')
const PostModel = require('./models/post_model')
const LoginModel = require('./models/login.model')
// hash
const bcrypt = require('bcrypt')
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