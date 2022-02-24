require('dotenv').config()
const jwt=require('jsonwebtoken')


authorization=(data=>{
    const id=data.id
    const token=jwt.sign(JSON.stringify(id),process.env.security)
    console.log(token);
    return token
})


authentication=((req,res,next)=>{
    if(req.headers.cookie){
        const token=req.headers.cookie.split('=')[1]
        const data=jwt.verify(token,process.env.security)
        req.userData=data
        console.log(req.userData);
        next()
    }else{
        next(res.status(404).send({message:'not logged in yet'}))
    }
})

module.exports = {authentication, authorization}
