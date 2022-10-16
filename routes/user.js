const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/model");
const multer = require("multer");
const upload = multer();
const jwt=require("jsonwebtoken");

userRouter.post("/signup", upload.fields([]), async (req, res) => {
  const { username, email, password, name, date, repassword, gender } =
    req.body;
  const newUser = {
    username,
    gender,
    date,
    avata:
      "https://thtuan2-130821.s3.ap-southeast-1.amazonaws.com/zyro-image.png",
    account: { email, password },
  };
  try {
    const tuser = new User(newUser);
    console.log(tuser);
    const saveUser = await tuser.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});
userRouter.post("/login", upload.fields([]), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ "account.email": email });
  if (user == null) {
    
    return res.render("login",{dataText:"Email hoặc mật khẩu không đúng ?"});
  } else {
    if (user.account.password == password) {
    var token= jwt.sign({id:user._id,username:user.email},process.env.JWT_KEY,{expiresIn:"1h"});
      res.cookie('token', token, { maxAge: 900000, httpOnly: true });

      return res.redirect("/message");
    }
    else{
      res.redirect("/");
    }
  }
  });

module.exports = userRouter;
