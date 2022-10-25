var users = [];
class SocketServices {
  //connection socket
  connection(socket) {
    console.log("connection:", socket.id);
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });

    // event on here

    socket.on("client-chat-message", function (data) {
        console.log(data.receiver)
      for (let i = 0; i < users.length; i++) {
        console.log("email mang",users[i].email);
        if (users[i].email == data.receiver) {
          var socketId = users[i].userid;
          console.log(users[i].userid);
          console.log("socketId: " + socketId);
          socket.to(socketId).emit("server-chat",data);
        }
      }
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
module.exports = new SocketServices();
