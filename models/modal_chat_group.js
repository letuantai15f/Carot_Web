const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    userCreate: String,
    avatarGroup: String,
    typeChat: String,

    status: Number,
    members: [
        {
            type:String
        }
    ],
    message: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Message',
        },
    ],


});

let ChatGroup = mongoose.model('ChatGroup', chatGroupSchema)
module.exports = { ChatGroup }