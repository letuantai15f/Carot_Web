var socket = io();
var sender = "";
var receiver = "";
var btnsend = document.getElementById("btnsend");
var btnsendfile = document.getElementById("btn-send-img");
var test = document.getElementById("emailcontact").value;
var email = document.getElementById("emailuser").value;
var avata=document.getElementById('avata-login').getAttribute('src')
var username=document.getElementById('nameContact').value
var idGroupChat=document.getElementById('idGroupChat').value
var typeChat=document.getElementById('typeChat').value
var nameGroup=document.getElementById('groupChat').value


receiver=test
sender=email


var emailAccGroup=[]
var reader
(function () {
  
  socket.emit("user-connected", email);
  socket.on("user-connected", function (username) {});
  sender = email;
})();
function sendimg(fileInput) {
  var mess = document.getElementById("datamess").value;
  var idGroupChat=document.getElementById('idGroupChat').value
  if(typeChat=='group'){
    if (fileInput.files && fileInput.files[0]) {
      reader = new FileReader();
      reader.onload = function (e) {
      
        var base64 = e.target.result;
        let contentMessage = {
          sender: sender,
          receiver: emailAccGroup,
          typeChat:typeChat,
           username:nameGroup,
          avata:avata,
          idGroupChat:idGroupChat,
          base64: base64,
        };
        console.log(contentMessage)
        appendImage(base64,"imgsender")
        socket.emit("group-chat-img", contentMessage);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }else{
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
 
}
function sendfile(fileInput){
  var mess = document.getElementById("datamess").value;
  var idGroupChat=document.getElementById('idGroupChat').value
  if(typeChat=="group"){
    if (fileInput.files && fileInput.files[0]) {
      reader = new FileReader();
      reader.onload = function (e) {
      
        var base64 = e.target.result;
        let contentMessage = {
          sender: sender,
          receiver: emailAccGroup,
          typeChat:typeChat,
          username:nameGroup,
          avata:avata,
          idGroupChat:idGroupChat,
          base64: base64,
          namefile:fileInput.files[0].name
        };
        console.log(contentMessage)
        appendFile(base64,fileInput.files[0].name,"imgsender")
        socket.emit("group-chat-file", contentMessage);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }else{
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
          namefile:fileInput.files[0].name
        };
        appendFile(base64,fileInput.files[0].name,"imgsender")
        socket.emit("sendFile", contentMessage);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
}
 $('input[type="text"].emailGroup').each(function () {
    
    emailAccGroup.push($(this).val())
});
btnsend.onclick = function sendmess() {
  var mess = document.getElementById("datamess").value;
  var idGroupChat=document.getElementById('idGroupChat').value
 
  if(typeChat=='group'){
    var contentMessage = {
      sender: sender,
      receiver:emailAccGroup,
      typeChat:typeChat,
      username:nameGroup,
      avata:avata,
      idGroupChat:idGroupChat,
      message: mess,
    };
    console.log('mess',contentMessage)
    if (mess != "") {
      appendMessage(mess, "text2");
      socket.emit("group-chat-message", contentMessage);
      document.getElementById("datamess").value = "";
    }
    
}
  else{
var contentMessage = {
    sender: sender,
    receiver: receiver,
    username:username,
    avata:avata,
    idGroupChat:idGroupChat,
    message: mess,
  };
  if (mess != "") {
    appendMessage(mess, "text2");
    socket.emit("client-chat-message", contentMessage);
    document.getElementById("datamess").value = "";
  }
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
function appendFile(data,name,status){
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = "<a width='40%' height='40%'  href='" + data + "'>"+name+"</a>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
$('.user-message').click(function() {
  console.log($('this->.idroom').attr("value"));

});

function test(){
  let txt = document.getElementById("chatt").getAttribute("value")
  console.log(txt)
}

socket.on("server-chat", (data) => {
  var username=document.getElementById("username");
  console.group(data.idGroupChat)
  $('#idGroupChat').attr('value', data.idGroupChat)
  
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;

  appendMessage(data.message, "text");
});
socket.on("group-server-chat", (data) => {
  console.log(data)
  var username=document.getElementById("username");
  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
  // $("#avataContact").attr("src",data.avata);
  emailAccGroup=data.receiver;
  typeChat=data.typeChat,
  group=data.idChat
  nameGroup=data.username
  console.log(emailAccGroup)
  appendMessage(data.message, "text");
});
//img
socket.on("server-chat-img", (data) => {
  var username=document.getElementById("username");
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;
  appendImage(data.path, "imgreciver");
});
socket.on("group-server-img", (data) => {
  console.log(data)
  var username=document.getElementById("username");
  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
  // $("#avataContact").attr("src",data.avata);
  emailAccGroup=data.receiver;
  typeChat=data.typeChat,
  group=data.idChat
  nameGroup=data.username
  appendImage(data.base64, "imgreciver");
});
//file
socket.on("server-chat-file", (data) => {
  var username=document.getElementById("username");
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;
  appendFile(data.path, data.namefile,"imgreciver");
});
socket.on("group-server-file", (data) => {
  console.log(data)
  var username=document.getElementById("username");
  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
  // $("#avataContact").attr("src",data.avata);
  emailAccGroup=data.receiver;
  typeChat=data.typeChat,
  group=data.idChat
  nameGroup=data.username
  appendFile(data.base64, data.namefile,"imgreciver");
});
function addMessage(data){
  console.log(data)
  var chats = document.querySelector(".messageAc");
  let div = document.createElement("div");
  let content = "<img class='user-avatar user3' alt=''> <span class='name-user'> <b>"+data.reciver+"</b></span> <span>"+data.message+"</span>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}

