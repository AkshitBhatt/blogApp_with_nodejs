const {authorization} = require('../auth/auth')
const knex=require("../config/db")

exports.userRegister=(req,res)=>{
    knex('user_detail').where({email:req.body.email,password:req.body.password}).then(data=>{
        if(data.length==0){
            knex('user_detail').insert(req.body).then(()=>{
                res.send('data inserted')
            }).catch(err=>{
                res.send(err.message)
            })
        }else{
            res.send("user already registered")
        }
    })
}

exports.userLogin=(req,res)=>{
    if(req.headers.cookie){
        res.send('logout first')
    }else{
        knex('user_detail').where({email:req.body.email,password:req.body.password}).then((data)=>{
            if(data.length>0){
                const token=authorization(data[0])
                res.cookie('token',token).send('you are now logged')
            }else{
                res.send('incorrect email or password')
            }
        }).catch(err=>{
            res.send(err.message)
        })
    }
}

exports.writepost=(req,res)=>{
    const userData = req.body;
    userData['user_id']=JSON.parse(req.userData);
    console.log(userData);
    knex('post').insert(userData).then((data)=>{
        res.send("your post created")
    }).catch(err=>{
        res.send(err.message)
        console.log(err);
    })

}

exports.likeDislikeByPostid=(req,res)=>{
    knex('post').where({id:req.params.post_id}).then(data=>{
        if(data.length>0){
           let likeDislike=req.body.like
           let poststatus
           likeDislike ? poststatus='liked':poststatus='dislike'
           knex('likeDislikeStorage').where({user_id:(JSON.parse(req.userData)),post_id:req.params.post_id}).then(presentdata=>{
               if((presentdata.like == false && presentdata.dislike == false) || presentdata. length==0){
                   knex('likeDislikeStorage').insert({
                       post_id:req.params.post_id,
                       user_id:(JSON.parse(req.userData)),
                       like:req.body.like || false,
                       dislike:req.body.dislike || false
                   }).then(()=>{
                       res.send(`post ${poststatus}`)
                   }).catch(err=>{
                       res.send(err.message)
                   })
               }else{
                   res.send('you are already reated')
               }
           }).catch(err=>{
               res.send('err while searching likedislike')
           }) 
        }
    })
}

exports.countlikebypostid=(req,res)=>{
    knex('likeDislikeStorage').where({post_id:req.params.post_id,like:true}).then(data=>{
        res.send(`There are ${data.length} likes in this post`)
    }).catch(err=>{
        res.send(err.message)
    })
}

exports.countDislikebypostid=(req,res)=>{
    knex('likeDislikeStorage').where({post_id:req.params.post_id,dislike:true}).then(data=>{
        res.send(`There are ${data.length} dislikes in this post`)
    }).catch(err=>{
        res.send(err.message)
    })
}

exports.userlogut=(req,res)=>{
    res.clearCookie('token').send("user logout")
}
