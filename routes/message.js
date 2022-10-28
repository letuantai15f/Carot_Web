const express = require("express");
const messageRouter = express.Router();
const { message } = require("../models/model_messages");
const { User } = require("../models/model");
const { cookieJwtAuth } = require("../middlerware/cookieJWT");
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { Contact } = require("../models/modal_contact");
const Message = require("../models/model_messages");

messageRouter.get("/", cookieJwtAuth, async (req, res) => {
  const token = req.cookies.token;
  const data = jwt_decode(token);
  // _io.emit("server-chat", "hihi");
  const user = await User.findOne({ _id: data.id });
  const contact = await Contact.findOne({ emailuser: user.account.email });

  const mycontacttrue = await Contact.find({
    status: true,
    emailuser: user.account.email,
  });
  console.log(mycontacttrue);
  const mycontactfalse = await Contact.find({
    status: false,
    emailuser: user.account.email,
  });
  // console.log(user.account.email)
  const mess = await message.find({});
  // const usercontact=await User.findOne({"_id":mess});
  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,
    avtreciver: mess[0].reciver.avata,
    text: mess[0].text,
    username: mess[0].reciver.username,
  };

  res.render("message", {
    dataimg: messconact,
    datacontact: mycontactfalse,
    datacontact2: mycontacttrue,
    myuser: user,
  });
});
module.exports = messageRouter;
