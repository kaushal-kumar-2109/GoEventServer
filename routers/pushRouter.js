const express = require('express');
const router = express.Router();

const mongoose = require('../Database/connect');
const userSchema = require('../Database/Schema/user');

router.post('/GoEvent/Create/User', async (req, res) => {
    const { name, Try, number } = req.body;  // now works ✅
    console.log("Received signup data:", req.body);

    res.send("Status ok");
});

module.exports = router;
