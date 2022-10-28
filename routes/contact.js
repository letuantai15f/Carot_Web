const express = require('express');
const contactRouter = express.Router();
const { Contact } = require('../models/modal_contact');
const { User } = require('../models/model')
const multer = require('multer');
const upload = multer();

contactRouter.post('/accept', upload.fields([]), async(req, res) => {
    // console.log(req.body.status)
    let usercontact = await Contact.findById({"_id":req.body.id})
    // console.log(usercontact)
    const newcontact = Contact.findByIdAndUpdate( usercontact.id , usercontact.status=true)
    // console.log(usercontact.status)
    const save = usercontact.save();
    console.log("Đã chấp nhận lời mời")
    res.redirect("/message")
});
contactRouter.post('/delete', upload.fields([]), async(req, res) => {
    let usercontact = await Contact.findById({"_id":req.body.id})
    const dlt = await Contact.findByIdAndDelete(usercontact.id)
    // const save = usercontact.save();
    console.log("Xóa thành công")
    res.redirect("/message")
});

contactRouter.post('/addfriend', upload.fields([]), async(req, res) => {  
    const {emailuser, emailcontact} = req.body;
    let searchcontact = await User.findOne({"account.email":emailcontact})
    console.log(searchcontact)
    if (searchcontact == null ){
        console.log("Không tìm thấy người dùng có email là " + emailcontact)
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
module.exports = contactRouter;