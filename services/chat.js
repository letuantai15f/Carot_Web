var users = [];
const { async } = require('@firebase/util');
const fs = require('fs');
const {message} = require("../models/model_messages");
const { ChatGroup } = require("../models/modal_chat_group");
class SocketServices {
  //connection socket
  connection(socket) {
    console.log("connection:", socket.id);
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });

    // event on here

    socket.on("client-chat-message", async (data)=> {
      const newMessage={
        sender:{
          email:data.sender
        },
        reciver:{
          email:data.receiver
        },
        idChat:data.idGroupChat,
        avata:data.avata,
        username:data.username,
        text:data.message
      }
      const sMessage= new message(newMessage);
      const saveMessage= await sMessage.save()
      var idChat = sMessage.idChat;
      var chat = ChatGroup.findById(idChat);
      await chat.findOneAndUpdate({ $push: { message: saveMessage._id } });
      

      for (let i = 0; i < users.length; i++) {
        if (users[i].email == data.receiver) {
          var socketId = users[i].userid;
          // socket.join(socketId);
          socket.to(socketId).emit("server-chat", data);
        }
      }
    });

    socket.on("sendImage", function (data) {
      console.log(data)
      var guess = data.base64.match(/^data:image\/(png|jpeg);base64,/)[1];
    var ext = "";
    switch(guess) {
      case "png"  : ext = ".png"; break;
      case "jpeg" : ext = ".jpg"; break;
      default     : ext = ".bin"; break;
    }
    var savedFilename = "/upload/"+randomString(10)+ext;
    for (let i = 0; i < users.length; i++) {
      console.log("email mang", users[i].email);
      if (users[i].email == data.receiver) {
        var socketId = users[i].userid;
        socket.to(socketId).emit("server-chat-img", {
          sender:data.sender,
          reciver:data.receiver,
          idGroupChat:data.idGroupChat,
          path: data.base64,
        });
      }
    }
    // fs.writeFile(__dirname+"/public"+savedFilename, getBase64Image(data.base64), 'base64', function(err) {
    //   if (err !== null)
    //     console.log(err);
    //   else {
        
        
    //   }
    //     console.log("Send photo success!");
    // });

      // for (let i = 0; i < users.length; i++) {
      //   console.log("email mang", users[i].email);
      //   if (users[i].email == data.receiver) {
      //     var socketId = users[i].userid;
      //     socket.to(socketId).emit("server-chat-img", data);
      //   }
      // }
    });

    socket.on("user-connected", function (username) {
      users.push({
        userid: socket.id,
        email: username,
      });

      _io.emit("user-connected", username);
    });

    // on room...
  }
}
function randomString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
 
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
 
    return text;
}
function getBase64Image(imgData) {
  return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
}
module.exports = new SocketServices();
