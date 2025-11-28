const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');
const sendMail = require('../utils/sendMail');

router.post('/goevent/sendemail', async (req, res) => {
    console.log(req.body);
    try{
        const OTP = CreateOTP();
        const response =await sendMail({UserEmail:req.body.Data.UserEmail,OTP:OTP});
        console.log(response);
        res.send(response);
        // if(response.STATUS == 200){
        //     return res.send({STATUS:200,OTP:OTP,MES:"Otp send sucessfully."});
        // }
        // return res.send({STATUS:500,MES:"There is an server error."})
    }catch(err){
        res.send({STATUS:500,MES:"There is an server error."});
    }
    
});

// ---------------------------------------------- functions ---------------------------------------------- 
// Create OTP

const CreateOTP = () => {
    let OTP=0;
    for(let i=0;i<4;i++){
        let Random = Math.floor(Math.random()*8)+1;
        OTP += Random;
        if(i<3){
            OTP *= 10;
        }
    }
    return OTP;
}

module.exports = router;
