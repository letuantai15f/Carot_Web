const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { cookieJWT } = require("./middlerware/cookieJWT");
const app = express();
const port=3000
const server=require("http").Server(app);
var io=require('socket.io')(server);
const  SocketServices = require('./services/chat');
global._io  =  io;
global.__dirname=__dirname;
const path= require('path');


const userRouter = require("./routes/user");
const contactRouter = require("./routes/contact");
const chatgroupRouter = require("./routes/chatgroup");
const messageRouter = require("./routes/message");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, (err) => {
  if(err) {
    console.log(err)
  }
  else console.log("MongoDB is connected");
});

app.use(cookieParser());
// app.use(express.static(path.join(__dirname,'views/partials/nav.handlebars')));
app.use(express.static(__dirname+"/uploads"));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(express.static("resources"));

app.engine("hbs", exphbs.engine({extname:'.hbs'}));
app.set("view engine", ".hbs");
app.set('views',path.join(__dirname,'views'))

// app.use((req,res,next)=>{
//   res.io=io
//   next();
// })

//configAWS
const AWS = require("aws-sdk");
const { response } = require("express");

const docClient = new AWS.DynamoDB.DocumentClient();

const profileRouter = require('./routes/profile');

const tableName = "UserAccounts";
//multer
const multer = require("multer");
const { options } = require("./routes/user");
const upload = multer();
//getUI
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/home", (req, res) => {
  res.render("home");
});
// io.on("connection", function(socket){
//   console.log("user connectedUsers");
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
    
//   });
  
//   socket.on('client-chat-message', function(data){
//     io.emit("server-chat", data);
//     console.log(data);
//   });
// })

//signup
app.use("/",userRouter);

// modal contact
app.use("/", contactRouter)

// chatgroup message
app.use("/message", messageRouter);

global._io.on('connection',  SocketServices.connection)
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

    
