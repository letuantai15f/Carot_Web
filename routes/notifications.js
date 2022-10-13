const express = require('express');
const notificationsRouter = express.Router();
const { Notifications } = require('../models/model_notifications');
const multer = require('multer');
const upload = multer();

notificationsRouter.post('/message', upload.fields([]), async (req, res) => {
    const { id, sender, receiver, type, content, isRead, createdAt } = req.body;
    const newNotifications = {
        id,
        sender,
        receiver,
        type,
        content,
        isRead,
        createdAt
    }
    try {
        const messageNotifications = new Notifications(newNotifications);
        console.log(messageNotifications);
        const saveNotifications = await messageNotifications.save();
        res.status(200).json(saveNotifications); // return 200 if success
        res.redirect('/message');
    } catch (err) {
        console.log(err);
        res.status(500).json(err); // return 500 if fail
    }

});

module.exports = notificationsRouter;