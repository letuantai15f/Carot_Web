const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/model");
const multer = require("multer");
const upload = multer();

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
    account: {
      email, password;
    }
  }
  try {
    const tuser = new User(newUser);
    console.log(tuser);
    const saveUser = await tuser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
userRouter.post("/login", upload.fields([]), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ "account.email": email });
  console.log(user.account.password);
  if (user == null) {
    console.log("User not found");
  } else {
    if (user.account.password == password) {
      res.redirect("/message");
    } else {
      console.log("sai pass");
      res.redirect("/");
    }
  }
});
module.exports = userRouter;
