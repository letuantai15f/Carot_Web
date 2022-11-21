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
    // console.log(contactuser)
    return contactuser
  })

  const contacttrue = []
  const contactfalse = []
  const mycontacttrue = await Contact.find({
    status: true,
    emailuser: user.account.email,
  });
  const mycontactfalse = await Contact.find({
    status: false,
    emailuser: user.account.email,
  });
  for (let i = 0; i < mycontacttrue.length; i++) {
    const ct = await Contact.findOne({_id:mycontacttrue[i]._id})
    const us = await User.findOne({"account.email":ct.emailcontact})
    // console.log(us);
    contacttrue.push({
      _id: mycontacttrue[i]._id,
      emailuser: mycontacttrue[i].emailuser,
      emailcontact: mycontacttrue[i].emailcontact,
      status:mycontacttrue[i].status,
      avata:us.avata,
      name:us.username
    })
  }
  for (let j = 0; j < mycontactfalse.length; j++) {
    const ct = await Contact.findOne({_id:mycontactfalse[j]._id})
    const us = await User.findOne({"account.email":ct.emailcontact})
    // console.log(us);
    contactfalse.push({
      _id: mycontactfalse[j]._id,
      emailuser: mycontactfalse[j].emailuser,
      emailcontact: mycontactfalse[j].emailcontact,
      status:mycontactfalse[j].status,
      avata:us.avata,
      name:us.username
    })
  }

  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  const test = {avata: '/img/avata_user.png'}
  const groupMessage=await getDataMessenger(user)

  res.render("message", {
    dataimg: messconact,
    contactfalse,
    contacttrue,
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
  
  const contacttrue = []
  const contactfalse = []
  const mycontacttrue = await Contact.find({
    status: true,
    emailuser: user.account.email,
  });
  const mycontactfalse = await Contact.find({
    status: false,
    emailuser: user.account.email,
  });
  for (let i = 0; i < mycontacttrue.length; i++) {
    const ct = await Contact.findOne({_id:mycontacttrue[i]._id})
    const us = await User.findOne({"account.email":ct.emailcontact})
    // console.log(us);
    contacttrue.push({
      _id: mycontacttrue[i]._id,
      emailuser: mycontacttrue[i].emailuser,
      emailcontact: mycontacttrue[i].emailcontact,
      status:mycontacttrue[i].status,
      avata:us.avata,
      name:us.username
    })
  }
  for (let j = 0; j < mycontactfalse.length; j++) {
    const ct = await Contact.findOne({_id:mycontactfalse[j]._id})
    const us = await User.findOne({"account.email":ct.emailcontact})
    // console.log(us);
    contactfalse.push({
      _id: mycontactfalse[j]._id,
      emailuser: mycontactfalse[j].emailuser,
      emailcontact: mycontactfalse[j].emailcontact,
      status:mycontactfalse[j].status,
      avata:us.avata,
      name:us.username
    })
  }

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
    // console.log(mess)
    if(mess.sender.email == user.account.email){
      if(!!mess.file.path){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          file:mess.file.path,
          typeFile:"1"
        })
      }if(mess.text){
        messSent.push({
          text:mess.text,
          typeChat:"1"
        })
      }
    } else{
      if(!!mess.file.path){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          file:mess.file.path,
          typeFileNone:"1"
        })
      }if(mess.text){
        messSent.push({
          text:mess.text,
          typeNone:"1"
        })
      }
    }
    
  }
  res.render("message", {
    dataUserMessage: userChat, 
    dataimg: messconact, 
    contactfalse,
    contacttrue,
    emailContact: email, 
    idGroupChat,
    messSent,
    message:groupMessage ,
    groupChat: group2,
  })
})
messageRouter.get("/api/message",cookieJwtAuth,async (req, res)=>{
  
  const  email  = req.query.email;
  const user = await getUserLogin(req, res)
  const check = await ChatGroup.findOne({ $and: [{ members: { $all: [user.account.email, email] } }, { typeChat: '1' }] });
  const messageDB = check.message;
  const messSent = []
  
  for (let i = 0; i < messageDB.length; i++) {

    const mess = await message.findOne({ _id: messageDB[i] });  
    if(mess.sender.email==user.account.email){
      if(!!mess.file.path){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          file:mess.file.path,
          typeFile:"1"
        })
        
      }if(mess.text){
      messSent.push({
        text:mess.text,
        typeChat:"1"
      })}
    }else{
      if(!!mess.file.path){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          file:mess.file.path,
          typeFileNone:"1"
        })
      }if(mess.text){
      messSent.push({
        text:mess.text,
        typeNone:"1"
      })
    }
    }
    
  }
  return res.status(200).json(messSent)
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
  
  const contacttrue = []
  const contactfalse = []
  const mycontacttrue = await Contact.find({
    status: true,
    emailuser: user.account.email,
  });
  const mycontactfalse = await Contact.find({
    status: false,
    emailuser: user.account.email,
  });
  for (let i = 0; i < mycontacttrue.length; i++) {
    const ct = await Contact.findOne({_id:mycontacttrue[i]._id})
    const us = await User.findOne({"account.email":ct.emailcontact})
    // console.log(us);
    contacttrue.push({
      _id: mycontacttrue[i]._id,
      emailuser: mycontacttrue[i].emailuser,
      emailcontact: mycontacttrue[i].emailcontact,
      status:mycontacttrue[i].status,
      avata:us.avata,
      name:us.username
    })
  }
  for (let j = 0; j < mycontactfalse.length; j++) {
    const ct = await Contact.findOne({_id:mycontactfalse[j]._id})
    const us = await User.findOne({"account.email":ct.emailcontact})
    // console.log(us);
    contactfalse.push({
      _id: mycontactfalse[j]._id,
      emailuser: mycontactfalse[j].emailuser,
      emailcontact: mycontactfalse[j].emailcontact,
      status:mycontactfalse[j].status,
      avata:us.avata,
      name:us.username
    })
  }

  const messconact = {
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    usernameprofile: user.username,
    avata: user.avata,

  };
  const check = await ChatGroup.findOne({ _id: idgroup });
  
  const nameus=[]
  for(let i = 0; i< check.members.length; i++){
    let findus = await User.findOne({"account.email":check.members[i]})
    nameus.push({
      usname:findus.username,
      avata:findus.avata
    })
  }
  groupChat2 = {
    _id: check._id,
    username: check.name,
    avata:check.avatar,
    typeChat: check.typeChat,
    members:check.members,
    membersinfo:nameus,
    sotv:check.members.length
  }
  const messageDB = check.message;
  const messSent = []
  for (let i = 0; i < messageDB.length; i++) {
    const mess = await message.findOne({ _id: messageDB[i] });
    if(mess.sender.email==user.account.email){
      if(!!mess.file.path){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          file:mess.file.path,
          typeFile:"1"
        })
        
      }if(mess.text){
      messSent.push({
        text:mess.text,
        typeChat:"1"
      })}
    }else{
      if(!!mess.file.path){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          file:mess.file.path,
          typeFileNone:"1"
        })
      }if(mess.text){
      messSent.push({
        text:mess.text,
        typeNone:"1"
      })
    }
    }
  }
  res.render("message", {
    dataUserMessage: groupChat2, 
    dataimg: messconact, 
    contactfalse,
    contacttrue,
    idGroupChat: idgroup, 
    check,
    message:groupMessage ,
    messSent,
    groupChat: group2,

  })
})
messageRouter.get("/api/group",cookieJwtAuth,async (req, res)=>{
  
 
  const  idgroup  = req.query.idgroup;
  const user = await getUserLogin(req, res)
  const check = await ChatGroup.findOne({ _id: idgroup });
  const messageDB = check.message;
  const messSent = []
  
  
    for (let i = 0; i < messageDB.length; i++) {

      const mess = await message.findOne({ _id: messageDB[i] });  
      if(mess.sender.email==user.account.email){
        if(!!mess.file.path){
          messSent.push({
            namefile:mess.file.fileName,
          type:mess.file.contenType,
            file:mess.file.path,
            typeFile:"1"
          })
          
        }if(mess.text){
        messSent.push({
          namefile:mess.file.fileName,
          type:mess.file.contenType,
          text:mess.text,
          typeChat:"1"
        })}
      }else{
        if(!!mess.file.path){
          messSent.push({
            namefile:mess.file.fileName,
          type:mess.file.contenType,
            file:mess.file.path,
            typeFileNone:"1"
          })
        }if(mess.text){
        messSent.push({
          text:mess.text,
          typeNone:"1"
        })
      }
      }
      
    
  }
  
  return res.status(200).json(messSent)
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
      members: groupchat[i].members.length,
      avatar: groupchat[i].avatar
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
