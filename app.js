const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
var bodyParser=require('body-parser');
const morgan=require('morgan');
const dotenv=require('dotenv');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
// const path= require('path');

const userRouter=require('./routes/user')
dotenv.config();
mongoose.connect((process.env.MONGODB_URL),()=>{
    console.log('MongoDB');
})
//
// app.use(express.static(path.join(__dirname,'views/partials/nav.handlebars')));
app.use(bodyParser.json({limit:"50mb"}))
app.use(cors());
app.use(morgan("common"));
app.use(express.static('resources'));
app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');
//configAWS
const AWS=require('aws-sdk');
const { response } = require('express');


const docClient=new AWS.DynamoDB.DocumentClient();
const tableName="UserAccounts"
//multer
const multer=require('multer');
const upload=multer();
//getUI
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/message', (req, res) => {
    res.render('message');
});

app.get('/modal', (req, res) => {
    res.render('modal');
});

//signup
  app.use("/",userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

