const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserNumber: {
        type: String,
        default: 'none'
    },
    UserPassword: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true
    },
    Country:{
        type:String,
        required:true,
        default:'India'
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now
    },
    UserProfile: {
        type: String,
        default: 'none'
    }
});

const userSchema = mongoose.model('UserData', UserSchema);

module.exports = userSchema;
