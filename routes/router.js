const express=require('express')
const {authentication}=require("../auth/auth")
const router=express.Router()
const {userRegister,userLogin,writepost, userlogut, likeDislikeByPostid,countlikebypostid,countDislikebypostid}=require('../controllers/controller')


router.post('/register',userRegister)

router.post('/login',userLogin)

router.post('/post',authentication,writepost)

router.post('/likeDislike/:post_id',authentication,likeDislikeByPostid)

router.get('/likes/:post_id',countlikebypostid)

router.get("/dislikes/:post_id",countDislikebypostid)

router.get('/logout',authentication,userlogut)


module.exports=router