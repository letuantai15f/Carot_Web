var users = [];
const { async } = require('@firebase/util');
const fs = require('fs');
const { message } = require("../models/model_messages");
const { ChatGroup } = require("../models/modal_chat_group");
const uploadFile = require("../services/AwsS3Service")
class SocketServices {
  connection(socket) {
    console.log("connection:", socket.id);
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });
    socket.on("user-connected", function (username) {
      users.push({
        userid: socket.id,
        email: username,
      });
      _io.emit("user-connected", username);
    });
    // event on here
    socket.on("group-chat-message", async (data) => {
      var arrayEmail = []
      const newMessage = {
        sender: {
          email: data.sender
        },
        
        typeChat: data.typeChat,
        idChat: data.idGroupChat,
        avata: data.avata,
        username: data.username,
        text: data.message
      }
      const sMessage= new message(newMessage);
      const saveMessage= await sMessage.save()
      var idChat = sMessage.idChat;
      var chat = ChatGroup.findById(idChat);
      await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });
      if (data.typeChat == 'group') {
        for (let i = 0; i < data.receiver.length; i++) {
          if (data.receiver[i] != data.sender) {
            arrayEmail.push(data.receiver[i])
          }
        }
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < arrayEmail.length; j++) {
            if (users[i].email == arrayEmail[j]) {
              var socketId = users[i].userid;
              socket.to(socketId).emit("group-server-chat", data);
            }
          }
        }

      }
    })
    socket.on("client-chat-message", async (data) => {
      const newMessage = {
        sender: {
          email: data.sender
        },
        reciver: {
          email: data.receiver
        },
        typeChat: data.typeChat,
        idChat: data.idGroupChat,
        avata: data.avata,
        username: data.username,
        text: data.message
      }
      const sMessage= new message(newMessage);
      const saveMessage= await sMessage.save()
      var idChat = sMessage.idChat;
      var chat = ChatGroup.findById(idChat);
      await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == data.receiver) {
          
          var socketId = users[i].userid;
          socket.to(socketId).emit("server-chat", data);
        }
      }
    }); 
    // send img
    socket.on("sendImage", async (data) => {
      const type = data.base64.split(';')[0].split('/')[1];
      const key = await uploadFile.uploadFile2(data.base64, data.sender)
          const url = await uploadFile.getUrl(key)
          const newMessage = {
            sender: {
              email: data.sender
            },
            reciver: {
              email: data.receiver
            },
            typeChat: data.typeChat,
            idChat: data.idGroupChat,
            avata: data.avata,
            username: data.username,
            file: {
              contenType: type,
              path: url
            }
          }
          const sMessage = new message(newMessage);
          const saveMessage = await sMessage.save()
          var idChat = sMessage.idChat;
          var chat = ChatGroup.findById(idChat);
          await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == data.receiver) {
          var socketId = users[i].userid;
          socket.to(socketId).emit("server-chat-img", {
            sender: data.sender,
            reciver: data.receiver,
            idGroupChat: data.idGroupChat,
            path: data.base64,
            username: data.username,
            avata: data.avata
          });
        }

      }

    });
    socket.on("group-chat-img", async (data) => {
      const type = data.base64.split(';')[0].split('/')[1];
      const key = await uploadFile.uploadFile2(data.base64, data.sender)
      const url = await uploadFile.getUrl(key)
          const newMessage = {
            sender: {
              email: data.sender
            },
            
            typeChat: data.typeChat,
            idChat: data.idGroupChat,
            avata: data.avata,
            username: data.username,
            file: {
              contenType: type,
              path: url
            }
          }
          const sMessage = new message(newMessage);
          const saveMessage = await sMessage.save()
          var idChat = sMessage.idChat;
          var chat = ChatGroup.findById(idChat);
          await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });
      var arrayEmail = []
      if (data.typeChat == 'group') {
        for (let i = 0; i < data.receiver.length; i++) {
          if (data.receiver[i] != data.sender) {
            arrayEmail.push(data.receiver[i])
          }
        }
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < arrayEmail.length; j++) {
            if (users[i].email == arrayEmail[j]) {
              var socketId = users[i].userid;
              socket.to(socketId).emit("group-server-img", data);
            }
          }
        }

      }
    })
    //send file
    socket.on("sendFile", async (data) => { 
      const type = data.base64.split(';')[0].split('/')[1];
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == data.receiver) {
          var socketId = users[i].userid;
          socket.to(socketId).emit("server-chat-file", {
            sender: data.sender,
            reciver: data.receiver,
            idGroupChat: data.idGroupChat,
            path: data.base64,
            username: data.username,
            avata: data.avata,
            namefile:data.namefile
          });
   
          const key = await uploadFile.uploadFile2(data.base64, data.sender)
          const url = await uploadFile.getUrl(key)
            const newMessage = {
              sender: {
                email: data.sender
              },
              reciver: {
                email: data.receiver
              },
              typeChat: data.typeChat,
              idChat: data.idGroupChat,
              avata: data.avata,
              username: data.username,
              file: {
                contenType: type,
                path: url
              }
            }
            const sMessage = new message(newMessage);
            const saveMessage = await sMessage.save()
            var idChat = sMessage.idChat;
            var chat = ChatGroup.findById(idChat);
            await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });

        }

      }

    });
    socket.on("group-chat-file", async (data) => {
      const type = data.base64.split(';')[0].split('/')[1];
      const key = await uploadFile.uploadFile2(data.base64, data.sender)
      const url = await uploadFile.getUrl(key)
          const newMessage = {
            sender: {
              email: data.sender
            },
            
            typeChat: data.typeChat,
            idChat: data.idGroupChat,
            avata: data.avata,
            username: data.username,
            file: {
              contenType: type,
              path: url
            }
          }
          const sMessage = new message(newMessage);
          const saveMessage = await sMessage.save()
          var idChat = sMessage.idChat;
          var chat = ChatGroup.findById(idChat);
          await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });
      var arrayEmail = []
      if (data.typeChat == 'group') {
        for (let i = 0; i < data.receiver.length; i++) {
          if (data.receiver[i] != data.sender) {
            arrayEmail.push(data.receiver[i])
          }
        }
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < arrayEmail.length; j++) {
            if (users[i].email == arrayEmail[j]) {
              var socketId = users[i].userid;
             
              socket.to(socketId).emit("group-server-file", data);
            }
          }
        }

      }
    })
        
    socket.on("createRoom",async(data)=>{
      console.log(data)
    })

  }
}



function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function getBase64Image(imgData) {
  return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
}
module.exports = new SocketServices();
