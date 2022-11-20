const { Contact } = require('../models/modal_contact');
const express = require('express');
const contactAPI = express.Router();

contactAPI.get("/   ",async(req,res)=>{
    // const {email} = req.body
    const mycontacttrue = await Contact.find({
        status: true,
        emailuser:"letuantai15f@gmail.com",
      });
      console.log(mycontacttrue)
      return res.status(200).json(mycontacttrue)

})
module.exports = contactAPI;