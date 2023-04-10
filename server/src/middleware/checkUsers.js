const jwt = require('jsonwebtoken')


module.exports.checkUser = (req,res,next)=>{

    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.TOKEN, async (err,resToken)=>{
            if(err){
                res.locals.user = null;
                res.cookie('jwt','',{maxAge:1})
                next()
            }else{
               // console.log(resToken.check_user._id)
                res.locals.user=resToken;
                //console.log(res.locals.user)
                next()
            }
        })
    }else{
        res.locals.user=null
        next()
    }
}

module.exports.auth = (req,_,next)=>{

    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.TOKEN, async (err,resToken)=>{
            if(err){
                console.log(err);
            }else{
                console.log(resToken.check_user._id)
                next()
            }
        })
    }else{
        console.log("No token")
    }


}