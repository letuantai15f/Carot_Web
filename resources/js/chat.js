var socket = io();
var sender = "";
var receiver = "kutin123v@gmail.com";
var btnsend = document.getElementById("btnsend");
var btnsendfile = document.getElementById("btn-send-file");
var reader
(function () {
  var email = document.getElementById("emailuser").value;
  socket.emit("user-connected", email);
  socket.on("user-connected", function (username) {});
  sender = email;
})();
function sendfile(fileInput) {
  if (fileInput.files && fileInput.files[0]) {
    reader = new FileReader();
    reader.onload = function (e) {
    
      var base64 = e.target.result;
      let contentMessage = {
        sender: sender,
        receiver: receiver,
        base64: base64,
      };
      appendImage(base64,"imgsender")
      socket.emit("sendImage", contentMessage);
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}
btnsend.onclick = function sendmess() {
  var mess = document.getElementById("datamess").value;
  let contentMessage = {
    sender: sender,
    receiver: receiver,
    message: mess,
  };
  if (mess != "") {
    appendMessage(mess, "text2");
    socket.emit("client-chat-message", contentMessage);
    document.getElementById("datamess").value = "";
  }
};
function appendMessage(data, status) {
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = `<span>` + data + "</span>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
function appendImage(data,status){
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = "<img width='40%' height='40%'  src='" + data + "'></img>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}

function test(){
  let txt = document.getElementById("chatt").getAttribute("value")
  console.log(txt)
}

socket.on("server-chat", (data) => {
  appendMessage(data.message, "text");
});
socket.on("server-chat-img", (data) => {
  appendImage(data.path, "imgreciver");
});
