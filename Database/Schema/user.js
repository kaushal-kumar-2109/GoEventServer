const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName:{
        type:String,
        require:true
    },
    UserPhone:{
        type:String,
        default:'none'
    },
    UserPassword:{
        type:String,
        require:true
    },
    UserEmail:{
        type:String,
        require:true,
        unique:true
    },
    UserRole:{
        type:String,
        enm:['user','vendor','admin'],
        default:'user'
    },
    UserCreatedAt:{
        type:Date,
        default:Date.now()
    },
    UserProfile:{
        type:String,
        default:'none'
    }
});

const userSchema = mongoose.model('UserSchema',UserSchema);

module.exports=userSchema;