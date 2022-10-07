const express = require('express');
const contactRouter = express.Router();
const { Contact } = require('../models/modal_contact');
const multer = require('multer');
const upload = multer();
//

contactRouter.post('/modal', upload.fields([]), async(req, res) => {
    const { id, userName, phoneNumber, status } = req.body;
    const newContact = {
        id,
        userName,
        phoneNumber,
        status
    }
    try {
        const infoContact = new Contact(newContact);
        console.log(infoContact);
        const saveContact = await infoContact.save();
        res.status(200).json(saveContact);
        res.redirect('/message');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = contactRouter;