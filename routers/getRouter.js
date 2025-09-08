const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');

router.get('/GoEvent/User', async (req,res) => {
    const Users = await userSchema.find({});
    res.send(Users);
});

module.exports = router;