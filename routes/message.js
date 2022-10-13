const express = require("express");
const messageRouter = express.Router();
const { message}=require("../models/model_messages")
const { User } = require("../models/model");

const multer = require("multer");
const upload = multer();
messageRouter.get('/',async(req, res) =>{
    console.log(1);
        const user=await User.findOne({"account.email":"letuantai15f@gmail.com"});
        const mess= await message.find({});
        console.log(mess);
        const messconact={
            avata:user.avata,
            avtreciver:mess[0].reciver.avata,
            text:mess[0].text,
            username:mess[0].reciver.username
        }
        console.log(messconact);
    res.render('message',{dataimg:messconact});

});

module.exports = messageRouter;