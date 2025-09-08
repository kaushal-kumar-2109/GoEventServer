const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const mongoose = require('./Database/connect');;
const userSchema = require('./Database/Schema/user');

const getRouter = require('./routers/getRouter');

app.use('/',getRouter);
app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log( `Server is online at port : ${port}` );
});