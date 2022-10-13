const express = require("express");
const messageRouter = express.Router();
const { Message } = require("../models/model_messages");
const { User } = require("../models/model");

const multer = require("multer");
const upload = multer();
messageRouter.get('/',async(req, res) =>{
    console.log(1);
        const user=await User.findOne({"account.email":"letuantai15f@gmail.com"});
    console.log(user);
    res.render('message',{dataimg:user.avata});

});

module.exports = messageRouter;