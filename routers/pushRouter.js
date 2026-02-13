const express = require('express');
const router = express.Router();
const DB = require("../Database/connect");
const { STATES } = require('mongoose');
const sendMessage = require('../utils/sendInvitation');
const CREATE_QR = require('../utils/qrHandler');

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

// events Routers 
router.post('/goevent/send/invitation',async (req,res)=>{
    const { users,event } = req.body;
    let send=[];
    let unsend =[];
    let qr_user_data = [];
    console.log("user",users);
    console.log("event",event);

    users.forEach(async(data) => {
        try{

            if(!data.email || data.email == ""||data.email.split("@")[1] !="gmail.com" || data.email==null||data.email=="undefine"){
                unsend.push(data);
            }else{

                let qr_data = {
                    name: data.name,
                    email: data.email,
                    number: data.number,
                    eventid: event.id,
                    event: event.EVENTNAME,
                    date: event.EVENTDATE,
                    location : event.EVENTLOCATION,
                    time : event.EVENTTIME
                }

                let qr_res = await CREATE_QR(qr_data);
                if(qr_res.STATUS){
                    qr_user_data.push({users: data,event:event,qr:qr_res.URL});
                    const response =await sendMessage(data,event,qr_res.FILENAME);
                    console.log(response);
                    if(response.STATUS==200){
                        console.log("here");

                        let sql = `INSERT INTO eventTicket VALUES ('${CreateID()}','${data.email}','${event.id}','${event.USERID}','${qr_res.URL}','${qr_res.FILENAME}','PENDING','${Date.now()}')`;

                        await DB.query(sql)
                        .then(([rows]) => {
                            console.log("✅data added of email :",data.email,rows);
                        })
                        .catch(err => {
                            console.log("❌ Error creating eventTicket table:", err);
                            unsend.push(data); 
                        });

                        send.push(data);
                    }else{
                       unsend.push(data); 
                    }

                }
                else{
                    unsend.push(data);
                }
            }
        }catch(error){
            unsend.push(data);
        }
    });

    let sql = `SELECT * FROM eventTicket`;
    let  [allRows] = await DB.query(sql);
    
    let ress = {
        STATUS : 200,
        qr_user_data:allRows,
        SEND : send,
        UNSEND : unsend
    }
    res.json(ress);
});





const CreateID = () => {
    let sequence = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    let id = "";
    for(let i=0;i<15;i++){
        let Random = Math.floor(Math.random()*sequence.length);
        id += sequence[Random];
    }
    return id;
}

module.exports = router;

