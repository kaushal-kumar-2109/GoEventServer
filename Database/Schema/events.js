const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    EventName: {
        type: String,
        required: true
    },
    EventDate: {
        type: String,
        required: true
    },
    EventAmount: {
        type: String,
        required: true,
    },
    EventLocation:{
        type:String,
        required:true,
    },
    EventTime: {
        type:String,
        required:true
    },
    EventAbout: {
        type: String,
        required:true
    },
    EventHighlight:{
        type:String,
        default:'none'
    },
    EventType:{
        type:String,
        default:'Public'
    },
    EventCreatedAt:{
        type:Date,
        default:Date.now()
    }
});

const eventsSchema = mongoose.model('EventsData', EventSchema);

module.exports = eventsSchema;
