const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');

router.post('/GoEvent/Create/User', async (req, res) => {
    if(!req.body.UserName || !req.body.UserPhone || !req.body.UserPassword || !req.body.UserEmail ){res.send({err:"data mising",status:404})}
    let response = await userSchema.insertOne(req.body);
    res.send(response);
});

module.exports = router;
