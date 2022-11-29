const express = require("express");
require("dotenv").config();
const profileRouter = express.Router();
const { message } = require("../models/model_messages");
const { User } = require("../models/model");
const { cookieJwtAuth } = require("../middlerware/cookieJWT");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { s3Uploadv3 } = require("../services/AwsS3Service");
const { uploadFile } = require("../services/AwsS3Service");
const ProfileService = require("../services/ProfileService");
const uuid = require("uuid").v4;
const upload = multer();
//const fileUpload = require('express-fileupload');
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1000000000, files: 2 },
// });
profileRouter.get("/", cookieJwtAuth, upload.fields([]), async (req, res) => {
  const user = await getUserLogin(req, res)
  const profileinfo = {
    _id: user._id,
    emailuser: user.account.email,
    gender: user.gender,
    date: user.date,
    username: user.username,
    avata: user.avata,

  };
  res.render("profile", {
    dataprofile: profileinfo,
    myuser: user,

  });
});

//updateProfile
profileRouter.post("/uploadprofile", cookieJwtAuth, upload.fields([]), async(req, res) => {
  const user = await getUserLogin(req, res);
  
  try {
      await User.findByIdAndUpdate({ _id: user._id }, { $set: { username: req.body.username, date: req.body.date, gender: req.body.gender}});
      
      res.redirect("/message/profile");
    
  } catch (error) {
    console.log(error.message);
  }
});

// //updateProfile
// profileRouter.post("/uploadprofile", cookieJwtAuth, upload.single("file"),async(req, res, next) => {
//   const user = await getUserLogin(req, res);
//   const { file } = req;
//   const _id = user._id;
//   console.log(_id, file);
//    try {
//             const avata = await ProfileService.changeAvatar(_id, file);
//             //await User.findByIdAndUpdate({ _id: user._id }, { $set: { avata: avata}});
//             // const cachedUser = await redisDb.get(_id);
//             // await redisDb.set(_id, { ...cachedUser, avatar });
//             console.log(avata);
//             return res.json({ avata });
//         } catch (err) {
//             next(err);
//         }
// });

// profileRouter.post("/upload", cookieJwtAuth, upload.single("file"), async (req, res) => {
//   const user = await getUserLogin(req, res);
//   const { _id, file } = req.body;
//   try {
//     //const results = await uploadFile(file);
//     console.log(results);
//     return res.json({ status: "success" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// profileRouter.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res.status(400).json({
//         message: "file is too large",
//       });
//     }

//     if (error.code === "LIMIT_FILE_COUNT") {
//       return res.status(400).json({
//         message: "File limit reached",
//       });
//     }

//     if (error.code === "LIMIT_UNEXPECTED_FILE") {
//       return res.status(400).json({
//         message: "File must be an image",
//       });
//     }
//   }
// });
//changePassword
profileRouter.patch("/password", async (req, res, next) => {
  const { _id } = req;
  const { oldPassword, newPassword } = req.body;

  try {
    await ProfileService.changePassword(_id, oldPassword, newPassword);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

getUserLogin = async (req, res) => {
  const token = req.cookies.token;
  const data = jwt_decode(token);
  const user = await User.findOne({ _id: data.id });
  return user;
}
module.exports = profileRouter;
