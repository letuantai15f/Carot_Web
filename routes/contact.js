const express = require('express');
const contactRouter = express.Router();
const { Contact } = require('../models/modal_contact');
const { User } = require("../models/model");
const {cookieJwtAuth}=require("../middlerware/cookieJWT")
const multer = require('multer');
const upload = multer();
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
//

contactRouter.post('/', cookieJwtAuth, async(req, res) => {
    const token=req.cookies.token;
        const data=jwt_decode(token);

        const user=await User.findOne({"_id":data.id});
        console.log(user);
        const cont= await Contact.find({});
        const contact={
        }
        console.log(contact);
    res.render('message',{dataimg:contact});
});

module.exports = contactRouter;