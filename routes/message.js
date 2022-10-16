const express = require("express");
const messageRouter = express.Router();
const { message}=require("../models/model_messages")
const { User } = require("../models/model");
const {cookieJwtAuth}=require("../middlerware/cookieJWT")
const multer = require("multer");
const upload = multer();
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

messageRouter.get('/',cookieJwtAuth,async(req, res) =>{
        const token=req.cookies.token;
        const data=jwt_decode(token);

        const user=await User.findOne({"_id":data.id});
        console.log(user);
        const mess= await message.find({});
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