const express = require('express');
const chatgroupRouter = express.Router();
const { ChatGroup } = require('../models/modal_chat_group');
const multer = require('multer');
const upload = multer();

chatgroupRouter.post('/message', upload.fields([]), async(req, res) => {
    const { id,username,usersAmount,messagesAmount,members } = req.body;
    const newChatGroup = {
        id,
        username,
        usersAmount,
        messagesAmount,
        members
    }
    try {
        const messageChatGroup = new ChatGroup(newChatGroup);
        console.log(messageChatGroup);
        const saveChatGroup = await messageChatGroup.save();
        res.status(200).json(saveChatGroup); // return 200 if success
        res.redirect('/message');
    } catch (err) {
        console.log(err);
        res.status(500).json(err); // return 500 if fail
    }

});

module.exports = chatgroupRouter;
