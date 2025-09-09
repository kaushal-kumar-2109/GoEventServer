const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserPhone: {
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
    UserRole: {
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'user'
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
