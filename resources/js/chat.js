

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
var peerId=""
var peer = new Peer();



receiver=test
sender=email


var emailAccGroup=[]
var reader
(function () {
  

peer.on('open', function(id) {
  const data={email,id}
	console.log('My peer ID is: ' + id);
  document.getElementById("myPeer").setAttribute('value',id)
  socket.emit("user-connected", data);
  peerId=id;
  });
  
  socket.on("user-connected", function (data) {});
  sender = email;
})();
function sendimg(fileInput) {
  var mess = document.getElementById("datamess").value;
  var idGroupChat=document.getElementById('idGroupChat').value
  var avatacontact=document.getElementById('avataContact').getAttribute('src')
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
          avata:avatacontact,
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
  var avatacontact=document.getElementById('avataContact').getAttribute('src')
  if(typeChat=='group'){
    var contentMessage = {
      sender: sender,
      receiver:emailAccGroup,
      typeChat:typeChat,
      username:nameGroup,
      avata:avatacontact,
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
// append
function appendMessage(data, status) {
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = `<span>` + data + "</span>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
function appendMessageGroup(data, sender ,status) {
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = `<img class="avt-text" src='${sender}'><span>${data}</span>`;
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
function appendImage(data,status){
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = "<img width='100px' height='100px'  src='" + data + "'></img>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
function appendImageGroup(data,sender,status){
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = "<img width='100px' height='100px'  src='" + data + "'></img> <span>"+sender+"</span>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
function appendFile(data,name,status){
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = "<a width='100px' height='100px'  href='" + data + "'>"+name+"</a>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
function appendFileGroup(data,name,sender,status){
  var chats = document.querySelector(".mess");
  let div = document.createElement("div");
  div.classList.add(status);
  let content = "<a width='100px' height='100px'  href='" + data + "'>"+name+"</a>"+sender;
  div.innerHTML = content.trim();
  chats.appendChild(div);
}
$('.user-message').click(function() {
  console.log($('this->.idroom').attr("value"));

});
//
function test(){
  let txt = document.getElementById("chatt").getAttribute("value")
  console.log(txt)
}

socket.on("server-chat",async (data) => {
    const x=$("#username").text();
    if(x=="" || x!=data.username){
      $('.mess').empty();
     $.ajax({ 
       type: "GET",
       url: "http://localhost:3000/message/api/message",  
       data:{email:data.sender},           
       contentType: "application/json",               
       success: function(response){    
        console.log(response)                
           for(let i=0;i<response.length;i++){
             if(response[i].typeNone=='1'){
               appendMessage(response[i].text, "text");
             }else if(response[i].typeFileNone=='1' && response[i].type=='png' ){
              appendImage(response[i].file, "imgreciver");
             }
             else if(response[i].typeFileNone=='1' ){
              appendFile(response[i].file,response[i].namefile, "imgreciver");
             }
             else if(response[i].typeChat){
               appendMessage(response[i].text, "text2");
             }
           }
       }
   
   });
   }
   else{
       appendMessage(data.message, "text"); 
   }

  var username=document.getElementById("username");
  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;
});
socket.on("group-server-chat", (data) => {
  const x=$("#username").text();
  console.log(data)
    if(x=="" || x!=data.username){
     $.ajax({ //create an ajax request to display.php
       type: "GET",
       url: "http://localhost:3000/message/api/group",  
       data:{idgroup:data.idGroupChat},           
       contentType: "application/json",   //expect html to be returned                
       success: function(response){ 
        console.log(response)                   
           for(let i=0;i<response.length;i++){
             if(response[i].typeNone=='1'){
              appendMessageGroup(response[i].text, response[i].sender,"text");
             }else if(response[i].typeFileNone){
              appendImage(response[i].file, response[i].sender,"imgreciver");
             }
             else if(response[i].typeChat){
               appendMessageGroup(response[i].text,"","text2");
             }
           }
       }
   
   });
   }
   else{
    $.ajax({ //create an ajax request to display.php
      type: "GET",
      url: "http://localhost:3000/message/api/user",  
      data:{email:data.sender},           
      contentType: "application/json",   //expect html to be returned                
      success: function(response){ 
      appendMessageGroup(data.message, response.avata,"text"); 
      }
  
  });
     
   }
  var username=document.getElementById("username");
  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
$("#avataContact").attr("src",data.avata);
  emailAccGroup=data.receiver;
  typeChat=data.typeChat,
  group=data.idChat
  nameGroup=data.username
  
  // appendMessage(data.message, "text");
});
//img
socket.on("server-chat-img", (data) => {
  const x=$("#username").text();
    if(x==""){
     $.ajax({ //create an ajax request to display.php
       type: "GET",
       url: "http://localhost:3000/message/api/message",  
       data:{email:data.sender},           
       contentType: "application/json",   //expect html to be returned                
       success: function(response){    
        console.log(response)                
           for(let i=0;i<response.length;i++){
             if(response[i].typeNone=='1'){
               appendMessage(response[i].text, "text");
             }else if(response[i].typeFileNone=='1'){
              appendImage(response[i].file, "imgreciver");
             }
             else if(response[i].typeChat){
               appendMessage(response[i].text, "text2");
             }
           }
       }
   
   });
   }
   else{
    appendImage(data.path, "imgreciver");
   }
  var username=document.getElementById("username");
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;
  // appendImage(data.path, "imgreciver");
});
socket.on("group-server-img", (data) => {
  var username=document.getElementById("username");
  const x=$("#username").text();
  if(x==""){
   $.ajax({ //create an ajax request to display.php
     type: "GET",
     url: "http://localhost:3000/message/api/group",  
     data:{idgroup:data.idGroupChat},           
     contentType: "application/json",   //expect html to be returned                
     success: function(response){                    
         for(let i=0;i<response.length;i++){
          if(response[i].typeNone=='1'){
            appendMessageGroup(response[i].text, response[i].sender,"text");
          }else if(response[i].typeFileNone){
           appendImageGroup(response[i].file,response[i].sender ,"imgreciver");
          }
          else if(response[i].typeChat){
            appendMessageGroup(response[i].text,"","text2");
          }
         }
     }
 
 });
 }
 else{
  $.ajax({ //create an ajax request to display.php
    type: "GET",
    url: "http://localhost:3000/message/api/user",  
    data:{email:data.sender},           
    contentType: "application/json",   //expect html to be returned                
    success: function(response){ 
    appendImageGroup(data.base64, response.username,"text"); 
    }

});

 }

  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  emailAccGroup=data.receiver;
  typeChat=data.typeChat,
  group=data.idChat
  nameGroup=data.username
  // appendImage(data.base64, "imgreciver");
});
//file
socket.on("server-chat-file", (data) => {
  var username=document.getElementById("username");
  const x=$("#username").text();
  if(x==""){
   $.ajax({ //create an ajax request to display.php
     type: "GET",
     url: "http://localhost:3000/message/api/message",  
     data:{email:data.sender},           
     contentType: "application/json",   //expect html to be returned                
     success: function(response){    
      console.log(response)                
         for(let i=0;i<response.length;i++){
           if(response[i].typeNone=='1'){
             appendMessage(response[i].text, "text");
           }else if(response[i].typeFileNone=='1'){
            appendImage(response[i].file, "imgreciver");
           }
           else if(response[i].typeChat){
             appendMessage(response[i].text, "text2");
           }
         }
     }
 
 });
 }
 else{
  appendFile(data.path, data.namefile,"imgreciver");
 }


  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  receiver=data.sender;
  // appendFile(data.path, data.namefile,"imgreciver");
});
socket.on("group-server-file", (data) => {
  console.log(data)
  var username=document.getElementById("username");
  if(x==""){
    $.ajax({ //create an ajax request to display.php
      type: "GET",
      url: "http://localhost:3000/message/api/group",  
      data:{idgroup:data.idGroupChat},           
      contentType: "application/json",   //expect html to be returned                
      success: function(response){                    
          for(let i=0;i<response.length;i++){
           if(response[i].typeNone=='1'){
             appendMessageGroup(response[i].text, response[i].sender,"text");
           }else if(response[i].typeFileNone){
            appendImageGroup(response[i].file,response[i].sender ,"imgreciver");
           }
           else if(response[i].typeChat){
             appendMessageGroup(response[i].text,"","text2");
           }
          }
      }
  
  });
  }
  else{
   $.ajax({ //create an ajax request to display.php
     type: "GET",
     url: "http://localhost:3000/message/api/user",  
     data:{email:data.sender},           
     contentType: "application/json",   //expect html to be returned                
     success: function(response){ 
      appendFileGroup(data.base64, data.namefile,response.sender,"imgreciver");
     }
 
 });
 
  }

  
  $('#idGroupChat').attr('value', data.idGroupChat)
  username.innerHTML=data.username;
  $("#avataContact").attr("src",data.avata);
  emailAccGroup=data.receiver;
  typeChat=data.typeChat,
  group=data.idChat
  nameGroup=data.username
  // appendFile(data.base64, data.namefile,"imgreciver");
});
function addMessage(data){
  console.log(data)
  var chats = document.querySelector(".messageAc");
  let div = document.createElement("div");
  let content = "<img class='user-avatar user3' alt=''> <span class='name-user'> <b>"+data.reciver+"</b></span> <span>"+data.message+"</span>";
  div.innerHTML = content.trim();
  chats.appendChild(div);
}


//call

function calluser(){
  $('#modalCall').modal('show');
  var data={
    sender: sender,
    receiver: receiver,
    username:username,
    peerId,
  }
  
  socket.emit("callTo",data)
}

peer.on('call',call=>{
  openStream().then(stream=>{
  call.answer(stream);
  playStream('localStream',stream);
  call.on('stream',remoteStream=>playStream('remoteStream',remoteStream))
  })
})

function playStream(idVideoTag,stream){
  const video=document.getElementById(idVideoTag);
  video.srcObject=stream;
  video.play();
}

function openStream(){
  const config={audio:true,video:true};
  return navigator.mediaDevices.getUserMedia(config)
}
socket.on("server-call",(data)=>{
  document.getElementById("contactPeer").value = data.peerId;
  document.getElementById("emailcontact").value=data.data.sender
  
  
  $('#modalShowCall').modal('show');
  
})
socket.on("server-acceptCall",(data)=>{
  
  $('#modalCall').modal('hide');
  $('#modalVideo').modal('show');
   openStream().then(stream=>{
    playStream('localStream',stream)
    const call=peer.call(data.myPeer,stream)
    call.on('stream',remoteStream=>playStream('remoteStream',remoteStream))
   })
    
  
})
socket.on("server-cancelAccept",(data)=>{
  console.log(data)
  $('#modalCall').modal('hide');
  // $("#modalCall").modal({"backdrop": "static"});
})
socket.on("server-cancelVideo",(data)=>{
  console.log(data)
  location.reload();
})
socket.on("server-cancelCall",(data)=>{
  $('#modalShowCall').modal('hide');
})
function acceptCall(){
  const contactPeer=  document.getElementById("contactPeer").value
  const myPeer=document.getElementById("myPeer").value
  const reciver=document.getElementById("emailcontact").value
  const data={
    sender: sender,
    receiver: reciver,
    contactPeer,
    myPeer,
  }
  $('#modalShowCall').modal('hide');
  $('#modalVideo').modal('show');
  socket.emit("acceptCall",data)
  openStream().then(stream=>{
    playStream('localStream',stream)
    const call=peer.call(data.peerId,stream)
    call.on('stream',remoteStream=>playStream('remoteStream',remoteStream))
   })

}
function cancelAccept(){
  const contactPeer=  document.getElementById("contactPeer").value
  const myPeer=document.getElementById("myPeer").value
  const reciver=document.getElementById("emailcontact").value
  const data={
    sender: sender,
    receiver: reciver,
    contactPeer,
    myPeer,
  }
  console.log(data)
  socket.emit("cancelAccept",data)
}
function cancelVideo(){
  const contactPeer=  document.getElementById("contactPeer").value
  const myPeer=document.getElementById("myPeer").value
  const reciver=document.getElementById("emailcontact").value
  const data={
    sender: sender,
    receiver: reciver,
    contactPeer,
    myPeer,
  }
  console.log(data)
  socket.emit("cancelVideo",data);
  location.reload();
}
function cancelCall(){
  const contactPeer=  document.getElementById("contactPeer").value
  const myPeer=document.getElementById("myPeer").value
  const reciver=document.getElementById("emailcontact").value
  const data={
    sender: sender,
    receiver: reciver,
    contactPeer,
    myPeer,
  }
  $('#modalCall').modal('hide');
  socket.emit("cancelCall",data);
  
}


