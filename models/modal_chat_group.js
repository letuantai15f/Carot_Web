const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
    },
    usersAmount: {
        type: Number,
    },
    messagesAmount: {
        type: Number,
    },
    members: [{
        userId: String
    }]
});

let ChatGroup = mongoose.model('ChatGroup', chatGroupSchema)
module.exports = { ChatGroup }