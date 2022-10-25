const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    emailuser: {
        type: String,
    },
    emailcontact: {
        type: String,
    },
    status: {
        type: Boolean,
    }
});

let Contact = mongoose.model('Contact', contactSchema)
module.exports = { Contact }