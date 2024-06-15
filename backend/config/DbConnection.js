const mongoose=require('mongoose');

const dburl="mongodb://localhost:27017/chatapp";
const dbConnection=()=>mongoose.connect(dburl)
.then(()=>{
    console.log("db connected successfully");
})
.catch((err)=>{
    console.log("db connected failed",err)
})

module.exports=dbConnection