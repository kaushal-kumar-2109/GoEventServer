const express = require('express');
const router = express.Router();
const DB = require("../Database/connect");

router.post('/goevent/create/user', async (req, res) => {
    for(let d of req.body.LOG){
        try{
            const [rows] = await DB.query(d.QUE);
            console.log("Saved");
            res.send({STATUS:200,DATA:rows,MES:"got data."});
        }
        catch(err){
            console.log("Olready done")
            res.send({STATUS:500,MES:"Server error."});
        }
    }
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

