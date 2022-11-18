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
const { get } = require("mongoose");




//CRUD
messageRouter.get("/", cookieJwtAuth, async (req, res) => {
  const user = await getUserLogin(req, res)
  const contact = await getContact(user)
  const contactall = await getContactAll(user)
  const group2 = await getGroupChat(user)

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
  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  const test = {avata: '/img/avata_user.png'}
  const groupMessage=await getDataMessenger(user)

 

 console.log(groupMessage)

  res.render("message", {
    dataimg: messconact,
    datacontact: mycontactfalse,
    datacontact2: mycontacttrue,
    myuser: user,
    dataUserMessage: test,
    groupChat: group2,
    message:groupMessage 
  });
});

// chatMessage
messageRouter.post("/addMessage", cookieJwtAuth, upload.fields([]), async (req, res) => {
  const { email } = req.body;
  const user = await getUserLogin(req, res)
  const contact = await getContact(user)
  const contactall = await getContactAll(user)
  const group2 = await getGroupChat(user)
  const groupMessage=await getDataMessenger(user)
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
    var idGroupChat = group2p._id
  }
  else {
    var idGroupChat = check._id
  }
  const userchat = await User.findOne({ 'account.email': email });
  const userChat = {
    avata: userchat.avata,
    username: userchat.username,
    date:userchat.date,
    gender:userchat.gender,
    email:userchat.account.email

    
  }
  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  const messageDB = check.message;
  const messSent = []
  for (let i = 0; i < messageDB.length; i++) {
    const mess = await message.findOne({ _id: messageDB[i] });
    messSent.push(mess)
  }

  res.render("message", {
    dataUserMessage: userChat, 
    dataimg: messconact, 
    datacontact: mycontactfalse,
    datacontact2: mycontacttrue, 
    emailContact: email, 
    idGroupChat,
     messSent, 
    message:groupMessage ,
    groupChat: group2,
  })
})
// chatGroup
messageRouter.post("/group", cookieJwtAuth, upload.fields([]), async (req, res) => {
  const { idgroup } = req.body;
  const user = await getUserLogin(req, res)
  const contact = await getContact(user)
  const contactall = await getContactAll(user)
  const group2 = await getGroupChat(user)
  const groupMessage=await getDataMessenger(user)
  
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
  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  const check = await ChatGroup.findOne({ _id: idgroup });
  groupChat2 = {
    _id: check._id,
    username: check.name,
    avata:check.avatar,
    typeChat: check.typeChat
  }
  console.log(groupChat2)
  const messageDB = check.message;
  const messSent = []
  for (let i = 0; i < messageDB.length; i++) {
    const mess = await message.findOne({ _id: messageDB[i] });
    messSent.push(mess)
  }
  res.render("message", {
    dataUserMessage: groupChat2, 
    dataimg: messconact, 
    datacontact: mycontactfalse,
    datacontact2: mycontacttrue, 
    idGroupChat: idgroup, 
    check,
    message:groupMessage ,
    messSent,
    groupChat: group2,

  })
})


getUserLogin = async (req, res) => {
  const token = req.cookies.token;
  const data = jwt_decode(token);
  const user = await User.findOne({ _id: data.id });
  return user;
}
getDataPage = async (req, res) => {

}
getContactAll = async (user) => {
  const contactall = await Contact.find({ emailuser: user.account.email });
  return contactall
}
getContact = async (user) => {
  const contact = await Contact.findOne({ emailuser: user.account.email });
  return contact
}
getGroupChat = async (user) => {
  const group2 = []
  const groupchat = await ChatGroup.find({
    members: user.account.email,
    typeChat: 'group',
  });
  for (let i = 0; i < groupchat.length; i++) {
    group2.push({
      _id: groupchat[i]._id,
      groupName: groupchat[i].name,
      members: groupchat[i].members.length
    })
  }
  return group2;
}
getDataMessenger=async(user)=>{
  const message1=await ChatGroup.find({ members: { $all: [user.account.email] } } )
  // const groupMessage=await getDataMessenger(user)
  const groupMessage=[]
  for(let i=0;i<message1.length;i++){
    var username=""
     if(message1[i].typeChat=="1"){
      if(message1[i].members[0]==user.account.email){
       const userName2=await User.findOne({"account.email":message1[i].members[1]})
       username=userName2.username
       email=userName2.account.email
       if(!!message1[i].message[message1[i].message.length-1]){
        var text="";
        const messagetxt=await message.findOne({_id:message1[i].message[message1[i].message.length-1]})
        if(messagetxt.text==undefined){
            text="Ban nhan 1 file"
        }else{
          text=messagetxt.text
        }
      groupMessage.push({
        idChatGroup:message1[i]._id,
        name:username,
        avata:userName2.avata,
        typeChat:message1[i].typeChat,
        email,
        message:text
      })}

      }
      else{
        const userName2=await User.findOne({"account.email":message1[i].members[0]})
        username=userName2.username
        email=userName2.account.email
        if(!!message1[i].message[message1[i].message.length-1]){
          var text="";
          const messagetxt=await message.findOne({_id:message1[i].message[message1[i].message.length-1]})
          if(messagetxt.text==undefined){
              text="Ban nhan 1 file"
          }else{
            text=messagetxt.text
          }
        groupMessage.push({
          idChatGroup:message1[i]._id,
          name:username,
          avata:userName2.avata,
          typeChat:message1[i].typeChat,
          email,
          message:text
        })}
        
      }
     }else{
      if(!!message1[i].message[message1[i].message.length-1]){
        var text="";
        const messagetxt=await message.findOne({_id:message1[i].message[message1[i].message.length-1]})
        if(messagetxt.text==undefined){
            text="Ban nhan 1 file"
        }else{
          text=messagetxt.text
        }
      groupMessage.push({
        idChatGroup:message1[i]._id,
        name:message1[i].name,
        avata:message1[i].avatar,
        members:message1[i].members.length,
        // typeChat:message1[i].typeChat,
        message:text
      })}}
  }
  return groupMessage
}
module.exports = messageRouter;
