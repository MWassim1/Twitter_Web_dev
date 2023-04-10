const FormModel = require('./models/form.model')
const PostModel = require('./models/post_model')
const jwt = require('jsonwebtoken')
const maxAge = 1800000;





module.exports.formSignIn = async (req,res)=>{
    const {email,password} = req.body
    let k_email = email.trim()
    const check_user  = (await FormModel.findOne({email: k_email,password:password}))
    if(check_user === null){
        return res.status(401).send("Compte inexistant")
    }
    const token = jwt.sign({check_user},process.env.TOKEN,{expiresIn:maxAge})
    res.cookie('jwt',token,{httpOnly:true,maxAge})
    return res.status(200).send(check_user._id)
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

    const form = await FormModel.create({
        lastname:k_lastname,
        firstname:k_firstname,
        email:k_email,
        username:k_username,
        password:password
    })
    const token = jwt.sign({user:form._id},process.env.TOKEN,{expiresIn:maxAge})
    res.cookie('jwt',token,{httpOnly:true,maxAge})
    return res.status(200).json(form)
}


module.exports.logout = async (req,res) => {
    res.cookie('jwt','',{maxAge:1})
    res.status(200).send("logout OK")


}

module.exports.user_id = async(req,res)=>{
    console.log(req.body)
    const user = await FormModel.findById(req.body)
    console.log(user)
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
    const date = posts[0].createdAt
    console.log(date.getHours()+':'+date.getMinutes()+ ' - '+ date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear())
    return res.status(200).send(posts)
}