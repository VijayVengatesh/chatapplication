import React, { useState } from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const navigate=useNavigate();
  const [emailid, setEmailid] = useState("");
  const[emailReq,setEmailReq]=useState("");
  // const[emailidRequired,setEmailidRequired]=useState(false)
  // const[emailReqMsg,setEmailReqMsg]=useState("")
  const emailre=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/
  
  const signup = async (event) => {
    event.preventDefault()
    try {
      
    const req=emailid.trim().length==0?(<span className="text-danger">required</span>):emailre.test(emailid)?(<span className="text-success">Valid email address</span>):(<span className="text-danger">Invalid email address</span>)
    setEmailReq(req)

    if(emailre.test(emailid)){
      const iData=await axios.post("http://localhost:5000/insertuser",{email:emailid,otpCode:''});
      if(iData.data.insertResult){
        
        const otpRes=await axios.post("http://localhost:5000/sendotp",{email:emailid});
        console.log(otpRes.data)
        if(otpRes.data.sts){
          alert("otpsend successfully")
          navigate(`/signup/verification/${emailid}`)
        }
        else{
          alert("otp send failed")
        }
      }
      else{
        alert("email id already exists")
      }
    }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="outer-container">
      <div className="signup-container">
        <div className="row row-cols-1 border rounded p-3">
          <div className="col">
            <p className="text-center fs-3 fw-bold">Login Account</p>
            <p className="text-center">
              You will receive a 4 digit code to verfiy next
            </p>
          </div>
          <form action="">
          <div className="col">
            <label htmlFor="" className="text-start mb-2 ">
              Email id:
            </label>{" "}
            <br />
            <input
              type="text"
              placeholder="example@gmail.com"
              name="gmail"
              className="text-center"
              onChange={(e) => {
                setEmailid(e.target.value);
              }}
              required
            />
            {emailReq}
          </div>
          <div className="col mt-4">
            <button
              className="d-flex justify-content-center align-items-center"
              onClick={signup}
            >
              
                <p className="mt-2 fw-bolder fs-6 text-light">Continue</p>
           
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};
