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
const messagesSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sender"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Receiver"
    },
    text: {
        type: String,
    },
    file: {
        type: Buffer,
    },
    // createdAt: { 
    //     type: timestamp,
    // },
    // updateAt: {
    //     type: timestamp,
    // },
    // deleteAt: {
    //     type: timestamp,
    // }
});
let Messages = mongoose.model('Messages', messagesSchema);
let Sender = mongoose.model('Sender', senderSchema);
let Receiver = mongoose.model('Receiver', receiverSchema);
module.exports = { Messages, Sender, Receiver };