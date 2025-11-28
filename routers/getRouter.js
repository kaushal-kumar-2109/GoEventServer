const express = require('express');
const router = express.Router();
const DB = require("../Database/connect");


//  geting user data router
router.post('/goevent/user', async (req,res) => {
    const q = "SELECT * FROM userdata WHERE USEREMAIL = ?";
    console.log(req.body.UserEmail);
    try {
        const [rows] = await DB.query(q, [req.body.UserEmail]);
        console.log("data => ",rows);
        if (rows.length === 0) {
            return res.send({ STATUS:404, MES:"There is no user with this email." });
        }
        return res.send({STATUS:200,MES:"Account exists with this email.",DATA: rows});
    } catch (err) {
        return res.send({ STATUS:500, MES:"There is a server error." });
    }
});
//  getting user data router end here

router.post('/goevent/all/data', async (req,res) => {
    const event = "SELECT * FROM eventsdata;"
    const vendor = "SELECT * FROM vendordata;"
    try{
        const [rows] = await DB.query(event);
        const [ven] = await DB.query(vendor);
        const data = {EVENTS:rows,VENDORS:ven};
        res.send({STATUS:200,DATA:data,MES:"got data."});
    }
    catch(err){
        console.log(err);
        res.send({STATUS:500,MES:"Server error."});
    }
});

module.exports = router;