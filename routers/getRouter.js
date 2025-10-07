const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');
const eventsSchema = require('../Database/Schema/events');

router.get('/goevent/user', async (req,res) => {
    try{
        const Users = await userSchema.find({});
        res.send(Users);
    }
    catch(err){
        res.send(false);
    }
});

router.get('/goevent/events', async (req,res) => {
    try{
        const Events = await eventsSchema.find({});
        res.send({status:200,data:Events});
    }
    catch(err){
        console.log(err);
        res.send({status:false,error:err});
    }
});

module.exports = router;