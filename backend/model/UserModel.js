const mongoose=require('mongoose')
const Users=mongoose.model("user",new mongoose.Schema({
    email:String,
    otpCode:String
}))

module.exports=Users