const express = require('express');
const chatgroupRouter = express.Router();
const { ChatGroup } = require('../models/modal_chat_group');
const { User } = require('../models/model')
const multer = require('multer');
const upload = multer();

chatgroupRouter.post('/', upload.fields([]), async(req, res) => {
    res.redirect("/message")
});

module.exports = chatgroupRouter;
