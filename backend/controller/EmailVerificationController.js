const session = require("express-session");
const nodemailer = require("nodemailer");
const users = require("../model/UserModel");
const Users = require("../model/UserModel");
const { check, validationResult } = require("express-validator");

exports.insertUser = async (req, res) => {
  console.log("insert user router called");
  // const errors=validationResult(req);
  console.log(req.body);
  const user = new Users(req.body);

  try {
    const userExists = await users.exists({ email: req.body.email });
    if (userExists) {
      res
        .status(200)
        .json({ message: "email id already exists", insertResult: false });
    } else {
      await user.save(req.body);
      res.status(200).json({message:"insert email id success",insertResult:true})
    }
  } catch (error) {
    res.status(200).json({ errormessages: error });
  }
};

exports.findAllUsers=async(req,res)=>{
  console.log("findAllUsers Router Called");
  const allUsers=await Users.find();
  res.status(200).send(allUsers)
}
exports.otpGenerator = async (req, res) => {
  const { email } = req.body;
  console.log("optgenerator router called");
  let otp=""
  for (let i = 1; i <= 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  console.log(otp);
  try {

    await Users.findOne({email:email})
    .then((result)=>{
      users.findByIdAndUpdate({_id:result._id},{$set:{otpCode:otp}},{new:true})
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use other services like 'Yahoo', 'Outlook', etc.
      auth: {
        user: "vijay.v@anjaconline.org", // Your email address
        pass: "apple560", // Your email password
      },
    });
  
    // Function to send an email
    const sendEmail = () => {
      const mailOptions = {
        from: "vijay.v@anjaconline.org", // Sender address
        to: email, // List of recipients
        subject: "email verification otp", // Subject line
        text: `${otp}`, // Plain text body
        html: `<h1>Your OTP code is: <b>${otp}</b></h1>`, // HTML body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Error: ${error}`);
          res.status(200).json({ message: "otp send failed", sts: false });
        } else {
          res.status(200).json({ message: "otp send successfully", sts: true });
        }
      });
    };
  
    sendEmail();
    otp=""
  } catch (error) {
    console.error(error)
  }
};
exports.verfiedOtp = async(req, res) => {
  // console.log("otp",otp)
  console.log("verified otp router called");
  const { emailid, clientotp } = req.body;
  console.log("clientotp",clientotp)
  try {
    const re=await users.findOne({email:emailid})
    if(clientotp===re.otpCode){
      res.json({message:"verfied success",verfiedStatus:true})
    }
    else{
      res.json({message:"verfication failed",verfiedStatus:false})
    }
  console.log(re);
  } catch (error) {
    console.log(error)
  }
};
