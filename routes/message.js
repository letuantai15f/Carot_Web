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
const { ChatGroup } = require("../models/modal_chat_group");

messageRouter.get("/", cookieJwtAuth, async (req, res) => {
  const token = req.cookies.token;
  const data = jwt_decode(token);
  const user = await User.findOne({ _id: data.id });
  
  const contact = await Contact.findOne({ emailuser: user.account.email });
  const contactall = await Contact.find({ emailuser: user.account.email });
  contactall.forEach(async (el) => {
    let contactuser = await User.find({ "account.email": el.emailcontact })
  })
  const mycontacttrue = await Contact.find({
    status: true,
    emailuser: user.account.email,
  });
  const mycontactfalse = await Contact.find({
    status: false,
    emailuser: user.account.email,
  });
  // const mess = await message.find({ $or: [{ 'sender.email': user.account.email }, { 'reciver.email': user.account.email }] });

  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  res.render("message", {
    dataimg: messconact,
    // dataall: datauserall,
    datacontact: mycontactfalse,
    datacontact2: mycontacttrue,
    myuser: user,
    // messages:mess
  });
});



///
messageRouter.post("/addMessage", cookieJwtAuth, upload.fields([]), async (req, res) => {
  const { email } = req.body;
  const user = await getUserLogin(req, res)
  const contact = await Contact.findOne({ emailuser: user.account.email });
  const contactall = await Contact.find({ emailuser: user.account.email });
  contactall.forEach(async (el) => {
    let contactuser = await User.find({ "account.email": el.emailcontact })
  })
  const mycontacttrue = await Contact.find({
    status: true,
    emailuser: user.account.email,
  });
  const mycontactfalse = await Contact.find({
    status: false,
    emailuser: user.account.email,
  });
  const groupDemo = {
    userCreate: user.account.email,
    typeChat: '1',
    members: [email, user.account.email]
  }
  const check = await ChatGroup.findOne({ $and: [{ members: { $all: [user.account.email, email] } }, { typeChat: '1' }] });
  if (check == null) {
    const groupAdd2Person = new ChatGroup(groupDemo);
    const group2p = await groupAdd2Person.save();
  }
  const userchat = await User.findOne({'account.email':email});
  const userChat={
    avata:userchat.avata,
    username:userchat.username
  }
  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  res.render("message", {dataUserMessage:userChat,dataimg:messconact, datacontact: mycontactfalse,
    datacontact2: mycontacttrue,}) 
})
getUserLogin = async (req, res) => {
  const token = req.cookies.token;
  const data = jwt_decode(token);
  const user = await User.findOne({ _id: data.id });
  return user;
}
module.exports = messageRouter;
