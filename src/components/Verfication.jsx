import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../css/Verify.css'
import axios from 'axios';

export const Verfication = () => {
const[clientotp,setClientotp]=useState("");
const {emailid}=useParams();
    
const verify=async()=>{
    try {
        const verfiyRes=await axios.post("http://localhost:5000/verfiedotp",{emailid:emailid,clientotp:clientotp})
        console.log(verfiyRes.data)
        if(verfiyRes.data.verfiedStatus){
            alert("verfied successfully")
        }
        else{
            alert("verfied failed")
        }
    } catch (error) {
        console.error(error);
    }
}
  return (
    <>
    <div className="outer-container">
        <div className="verify-container border">
            <div className="row row-cols-1 p-2 ">
                <div className="col">
                    <p className='text-center fs-3 fw-bold'>Verify Email</p>
                    <p className='text-center'>Code is send to <b className='text-primary'>{emailid}</b> </p>
                </div>
                <div className="col">
                <input type="text" placeholder=' Enter your OTP code' className='text-center fs-4' onChange={(e)=>{setClientotp(e.target.value)}}/>
            </div>
            <div className="col mt-4">
                <button className='d-flex justify-content-center align-items-center' onClick={verify}><p className='mt-2 fw-bolder fs-6 text-light'><Link className='text-decoration-none text-light'>Continue</Link></p></button>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
