require('dotenv').config();
const express=require('express')
const app=express()
const Router=require("../routes/router")
const port=process.env.port || 5000

app.use(express.json())
app.use("/",Router)


app.listen(port,()=>{
    console.log(`your port is listening ${port}`);
})