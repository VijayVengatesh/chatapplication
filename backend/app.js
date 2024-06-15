const express=require('express');
const cors=require('cors');
const router = require('./routes/EmailVerficationRouter');
const dbConnection = require('./config/DbConnection');
const app=express();
const PORT=5000||process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.use(cors())

//db connnection 
dbConnection()
//router middle ware
app.use(router)

app.listen(PORT,"localhost",()=>{
    console.log("server listening on port number ",PORT)
})

