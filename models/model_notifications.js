const mongoose = require('mongoose');
const notificationsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    sender: {
        id: String,
        username: String,
        avatar: String
    },
    receiver: {
        id: String,
        username: String,
        avatar: String
    },
    type: {
        type: String,
    },
    content: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Number,
        default: Date.now
    }
});
let Notifications = mongoose.model('Notifications', notificationsSchema);
module.exports = { Notifications };