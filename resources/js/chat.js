var socket = io();
var sender="";
var receiver="kutin123v@gmail.com";


(function () {
  var email=document.getElementById("emailuser").value;
  socket.emit("user-connected",email);
    socket.on('user-connected', function(username){
        console.log("email:",username)
      });
      sender=email;

})();
  var btnsend = document.getElementById("btnsend");
  btnsend.onclick = function sendmess() {
    var mess = document.getElementById("datamess").value;
    let contentMessage={
      sender:sender,
      receiver:receiver,
      message:mess
    }
    if(mess!=''){
        appendMessage(mess,'text2');
        socket.emit("client-chat-message", contentMessage);
        document.getElementById("datamess").value='';
    }
    
  };
  function appendMessage(data,status){
    var chats=document.querySelector(".mess");
    let div=document.createElement('div');
    div.classList.add(status);
    let content = ('<span>'+data+'</span>');
    div.innerHTML=content.trim();
    chats.appendChild(div);

  };
  socket.on('server-chat',(data)=>{
    console.log("datala",data)
    appendMessage(data.message,'text')
  })
  
