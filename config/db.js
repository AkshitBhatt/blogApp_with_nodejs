require('dotenv').config()
const knex=require('knex')({
    client:"mysql",
    connection:{
        host:process.env.host,
        password:process.env.password,
        database:process.env.db,
        user:process.env.user,
        multipleStatements:true
    }
})


knex.schema.createTable("user_detail",t=>{
    t.increments('id')
    t.string('name')
    t.string('email')
    t.string('password')
}).then(()=>{
    console.log('user table created');
}).catch(err=>{
    console.log(err.sqlMessage);
})

knex.schema.createTable('post',t=>{
    t.increments('id')
    t.integer('user_id')
    t.string('title')
    t.string('content')
    t.timestamp('date').defaultTo(knex.fn.now())
}).then(()=>{
    console.log('post table created');
}).catch(err=>{
    console.log(err.sqlMessage);
})

knex.schema.createTable('likeDislikeStorage',t=>{
    t.increments('id')
    t.integer('user_id')
    t.integer('post_id')
    t.boolean('like')
    t.boolean('dislike')
}).then(()=>{
    console.log("likedislike table created");
}).catch(err=>{
    console.log(err.sqlMessage);
})


module.exports=knex