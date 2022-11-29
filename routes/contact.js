const express = require('express');
const contactRouter = express.Router();
const { Contact } = require('../models/modal_contact');
const { User } = require('../models/model')
const multer = require('multer');
const { ChatGroup } = require('../models/modal_chat_group');
const upload = multer();

contactRouter.post('/accept', upload.fields([]), async(req, res) => {
    let usercontact = await Contact.findById({"_id":req.body.id})
    const newcontact1 = {
        emailuser:req.body.emailcontact,
        emailcontact:usercontact.emailuser,
        status:true
    }
    const contactuser = new Contact(newcontact1);
    const save1 = contactuser.save();
    const newcontact2 = Contact.findByIdAndUpdate( usercontact.id , usercontact.status=true)
    const save2 = usercontact.save();
    console.log("Đã chấp nhận lời mời")
    res.redirect("/message")
});
contactRouter.post('/delete', upload.fields([]), async(req, res) => {
    let usercontact = await Contact.findById({"_id":req.body.id})
    const dlt = await Contact.findByIdAndDelete(usercontact.id)
    console.log("Xóa thành công")
    res.redirect("/message")
});

contactRouter.post('/addfriend', upload.fields([]), async(req, res) => {  
    const {emailuser, emailcontact} = req.body;
    let searchcontact = await User.findOne({"account.email":emailuser})
    if (searchcontact == null ){
        console.log("Không tìm thấy người dùng có email là " + emailuser)
    } else if (searchcontact.account.email == emailcontact){
        console.log("Bạn không thể kết bạn với chính mình")
    } 
    else {
        const newcontact = {
            emailuser,
            emailcontact,
            status:false
        }
        const contactuser = new Contact(newcontact)
        const save = await contactuser.save();
        console.log("Gửi lời mời thành công")
    }
    res.redirect("/message")
});

contactRouter.post('/addgroup', upload.fields([]), async(req, res) => {
    const {nameGroup, addemail } = req.body
    const user = await User.findOne({"account.email":req.body.email})
    let a = [ user.account.email]
    let result = [].concat(a,addemail)
    const newGroup = {
        name:nameGroup,
        avatar: "https://tse4.mm.bing.net/th?id=OIP.ya2c3T2_9NrcE8eUVHqhMQHaIz&pid=Api&P=0",
        userCreate: a[0],
        typeChat:"group",
        message:[],
        members:result
    }
    if( addemail != null){
        const group = new ChatGroup(newGroup)
        const save = await group.save();
        console.log("Tạo nhóm thành công")
    }
    else console.log("Nhóm phải từ 2 thành viên trở lên")
    
    res.redirect("/message")
});

contactRouter.post('/deleteFriend', upload.fields([]), async(req, res, next) => {
    const {emailuser, emailcontact} = req.body;
    // const { _id } = req;
    // const { userId } = req.params;
    console.log(emailuser, emailcontact);
    try {
        await Contact.findByIdAndDelete(emailuser, emailcontact);

        //res.status(204).json();
    } catch (err) {
        next(err);
    }
    res.redirect("/message")
});
module.exports = contactRouter;