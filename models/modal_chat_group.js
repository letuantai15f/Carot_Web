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
    }],
    createdAt: {
        type: timestamp,
    },
    updateAt: {
        type: timestamp,
    },
    deleteAt: {
        type: timestamp,
    }
});

let ChatGroup = mongoose.model('ChatGroup', chatGroupSchema)
module.exports = { ChatGroup }