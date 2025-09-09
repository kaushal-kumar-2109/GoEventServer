const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const mongoose = require('./Database/connect');
const userSchema = require('./Database/Schema/user');

const getRouter = require('./routers/getRouter');
const postRouter = require('./routers/pushRouter');
const otherRouter = require('./routers/other');

// ✅ Apply middlewares before routers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Then mount routers
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/',otherRouter);

app.listen(() => {
    console.log(`Server is online at port : ${port}`);
});
