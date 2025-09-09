const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');
const sendMail = require('../utils/sendMail');

router.post('/goevent/sendemail', async (req, res) => {
    const response = sendMail(req.body);
    res.send(response);
});

module.exports = router;
