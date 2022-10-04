const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
    },
    contactID: {
        type: String,
    },
    status: {
        type: Boolean,
    },
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

let Contact = mongoose.model('Contact', contactSchema)
module.exports = { Contact }