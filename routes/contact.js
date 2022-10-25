const express = require('express');
const contactRouter = express.Router();
const { Contact } = require('../models/modal_contact');
const multer = require('multer');
const upload = multer();

// contactRouter.post('/', upload.fields([]), async(req, res) => {
//     const {status, emailcontact, emailuser} = req.body;
//     const newContact = {
//         status,
//         emailcontact,
//         emailuser
//     };
//     const contactuser = new Contact(newContact)
//     const save = await contactuser.save();
// });

// contactRouter.get('/',(req ,res)=>{
//     Contact.find({}, function( err, contact){
//         let contact={
//             contactList:contact
//         }
//         res.render('message', {contactList:contact})
//     })
// })
module.exports = contactRouter;