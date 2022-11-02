var socket = io();
var sender = "";
var receiver = "";
var btnsend = document.getElementById("btnsend");
var btnsendfile = document.getElementById("btn-send-file");
var test = document.getElementById("emailcontact").value;
var email = document.getElementById("emailuser").value;
var avata=document.getElementById('avata-login').getAttribute('src')
var username=document.getElementById('nameContact').value
var idGroupChat=document.getElementById('idGroupChat').value
receiver=test
sender=email



var reader
(function () {
  
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
        username:username,
        avata:avata,
        idGroupChat:idGroupChat,
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
  var idGroupChat=document.getElementById('idGroupChat').value
  let contentMessage = {
    sender: sender,
    receiver: receiver,
    username:username,
    avata:avata,
    idGroupChat:idGroupChat,
    message: mess,
  };
  console.log(contentMessage)
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
  let content = `<span width='100%'>` + data + "</span>";
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
$('.user-message').click(function() {
  console.log($('this->.idroom').attr("value"));

});

socket.on("server-chat", (data) => {
  console.log(data)
  var username=document.getElementById("username");
  console.group(data.idGroupChat)
  $('#idGroupChat').attr('value', data.idGroupChat)
  
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;
  appendMessage(data.message, "text");
});
socket.on("server-chat-img", (data) => {
  var username=document.getElementById("username");
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
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
