const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: Boolean,
    }
});

let Contact = mongoose.model('Contact', contactSchema)
module.exports = { Contact }