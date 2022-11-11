const express = require("express");
const userAPI = express.Router();
const { User } = require("../models/model");
const { message } = require("../models/model_messages")
const multer = require("multer");
const upload = multer();
const jwt=require("jsonwebtoken");
const firebase = require("../config/firebase");

userAPI.post("/login",upload.fields([]), async (req, res) => {
    // 
    const x=req.body
        console.log(req.body)
        return res.status(200).json(x)
  });
  module.exports = userAPI;