const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
    },
    avatar: {
        type: String,
    }
});

const receiverSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
    },
    avatar: {
        type: String,
    }
});
const notificationsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sender"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receiver"
    },
    type: {
        type: String,
    },
    content: {
        type: String,
    },
    isRead: {
        type: Boolean,
    },
    createdAt: {
        type: timestamp,
    },
});
let Notifications = mongoose.model('Notifications', notificationsSchema);
let Sender = mongoose.model('Sender', senderSchema);
let Receiver = mongoose.model('Receiver', receiverSchema);
module.exports = { Notifications, Sender, Receiver };