var socket = io();
var sender = "";
var receiver = "";
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
    // addMessage(contentMessage)
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
// $('.nhantin').click(function() {
//   // console.log($(this).attr("value"));
//   var email=$(this).attr("value");
//   var username=document.getElementById("username");
//   username.innerHTML=$(this).attr("value");
//   receiver=email;
//   console.log(sender)

// });
$('.user-message').click(function() {
  console.log($('this->.idroom').attr("value"));

});

function test(){
  let txt = document.getElementById("chatt").getAttribute("value")
  console.log(txt)
}

socket.on("server-chat", (data) => {
  var username=document.getElementById("username");
  username.innerHTML=data.sender;
  receiver=data.sender;
  appendMessage(data.message, "text");
});
socket.on("server-chat-img", (data) => {
  var username=document.getElementById("username");
  username.innerHTML=data.sender;
  receiver=data.sender;
  appendImage(data.path, "imgreciver");
});
function addMessage(data){
  console.log(data)
  var chats = document.querySelector(".messageAc");
  let div = document.createElement("div");
  let content = "<img class='user-avatar user3' alt=''> <span class='name-user'> <b>"+data.reciver+"</b></span> <span>"+data.message+"</span>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
