const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    status: {
        type: Boolean,
    }
});

let Contact = mongoose.model('Contact', contactSchema)
module.exports = { Contact }