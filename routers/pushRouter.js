const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');
const eventsSchema = require('../Database/Schema/events');

router.post('/goevent/create/user', async (req, res) => {
    const data = {UserEmail:req.body.Data.UserEmail,UserName:req.body.Data.UserName,UserNumber:req.body.Data.UserNumber,UserPassword:req.body.Data.UserPassword,Country:req.body.Country};
    if(!req.body.Data.UserEmail || !req.body.Data.UserName || !req.body.Data.UserNumber || !req.body.Data.UserPassword || !req.body.Country ){res.send({err:"data mising",status:404})};
    let response = await userSchema.insertOne(data);
    res.send(response);
});

router.post('/goevent/user/email', async (req,res) => {
    const Users = await userSchema.findOne({UserEmail:req.body.UserEmail});
    if(Users == null){
        console.log('No User Found!');
        res.send({status:false,res:Users});
    }else{
        console.log("User Found!");  
        res.send({status:true,res:Users});
    }
});

// fixed
router.post('/goevent/user/account/login', async (req,res) => {
    let Users
    if(req.body.Data.task==='login'){
        try{
            Users = await userSchema.findOne({
              $and: [
                { UserEmail: req.body.Data.UserEmail },
                { UserPassword: req.body.Data.UserPassword }
              ]
            }); 
        }
        catch(error){
            console.log("There is Server Error"); 
            res.send({status:false,res:{data:null,mes:'There is an Server Error',status:500,err:error}});
        } 
    }
    else if(req.body.Data.task==='reset'){
        try{
            Users = await userSchema.findOne({
              $and: [
                { UserEmail: req.body.Data.UserEmail },
                { UserNumber: req.body.Data.UserNumber }
              ]
            }); 
        }
        catch(error){
            console.log("There is Server Error"); 
            res.send({status:false,res:{data:null,mes:'There is an Server Error',status:500,err:error}});
        } 
    }
    else{
        try{
            Users = await userSchema.findOne(
                { UserEmail: req.body.Data.UserEmail }
            ); 
        }
        catch(error){
            console.log("There is Server Error"); 
            res.send({status:false,res:{data:null,mes:'There is an Server Error',status:500,err:error}});
        } 
    }
    console.log(Users);
    if(Users == null){
        console.log('No User Found!');
        res.send({status:false,res:{data:Users,mes:"There no Account with this Email or Password",status:404,err:'No User Found'}});
    }
    else{ 
        console.log("User Found!");  
        res.send({status:true,res:{data:Users,mes:'Got Your Account.',status:200,}});
    }
});

router.post('/goevent/update/user/account', async (req,res) => {
    const updatedUser = await userSchema.findOneAndUpdate(
        { UserEmail: req.body.Data.UserEmail },               // find condition
        { $set: { UserPassword: req.body.Data.UserPassword }}, // update operation
        { new: true }                                    // return the updated document
    );
    const Users = await userSchema.findOne({_id:updatedUser._id});
    if(Users == null){
        console.log('User Password Not Updated!');
        res.send({status:false,res:Users});
    }
    else{ 
        console.log("User Password Updated!");  
        res.send({status:true,res:Users});
    }
});


// events Routers 
router.post('/goevent/upload/events',async (req,res)=>{
    // const response = await eventsSchema.insertMany(Evetns);
    // console.log(response);
    res.send("Upload data");
});


module.exports = router;

