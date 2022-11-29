const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    status: {
        type: Boolean,
    },
    emailcontact: {
        type: String,
    },
    emailuser: {
        type: String,
    }
});

let Contact = mongoose.model('Contact', contactSchema)

module.exports = { Contact }