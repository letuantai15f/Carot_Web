const express = require("express");
const userAPI = express.Router();
const { User } = require("../models/model");
const { message } = require("../models/model_messages")
const multer = require("multer");
const upload = multer();
const jwt=require("jsonwebtoken");
const firebase = require("../config/firebase");

userAPI.post("/login",upload.fields([]), async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const x=await firebase.loginAPI(email, password, req, res);
   res.status(200).json(x)
  });
  userAPI.post("/signup",upload.fields([]), async (req, res) => {
    const { username, email, password, name, date, repassword, gender } =req.body
    const newUser = {
        username,
        gender,
        date,
        avata:
          "https://thtuan2-130821.s3.ap-southeast-1.amazonaws.com/zyro-image.png",
        account: {email},
      };
      const user = await User.findOne({ "account.email": email });
      if (user == null) {
        try{
        // firebase.addUser(email, password); đăng kí tài khoản firebase phía BE
        const tuser = new User(newUser);
        const saveUser = await tuser.save();
        res.redirect("/");
      } catch (err) {
        res.status(500).json(err);
        // var status = "alert alert-success";
        // var notify = "Đăng kí thành công";
        // var dataStatus = { status, notify };
        // res.render("login", { message: dataStatus });
      }} else {
        // var status = "alert alert-danger";
        // var notify = "Đăng kí thất bại. Tài khoản đã tồn tại";
        // var dataStatus = { status, notify };
        // res.render("login", { message: dataStatus });
        res.json("Tài khoản đã tồn tại")
      }
  })
  module.exports = userAPI;