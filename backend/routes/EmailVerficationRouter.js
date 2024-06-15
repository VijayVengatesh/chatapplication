const express=require('express');
const { otpGenerator, verfiedOtp, insertUser, findAllUsers } = require('../controller/EmailVerificationController');
const router=express.Router();

router.post("/insertuser",insertUser)
router.get("/allusers",findAllUsers)
router.post ("/sendotp",otpGenerator)
router.post("/verfiedotp",verfiedOtp)

module.exports=router