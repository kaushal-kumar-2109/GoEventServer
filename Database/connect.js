const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURL)
.then(() => console.log('Database is Connected!'))
.catch((err)=>console.log("There is an error in connecting database : ",err));

module.exports=mongoose;