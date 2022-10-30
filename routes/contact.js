const express = require('express');
const contactRouter = express.Router();
const { Contact } = require('../models/modal_contact');
const { User } = require('../models/model')
const multer = require('multer');
const upload = multer();

contactRouter.post('/accept', upload.fields([]), async(req, res) => {
    // console.log(req.body.status)
    let usercontact = await Contact.findById({"_id":req.body.id})
    const newcontact1 = {
        emailuser:req.body.emailcontact,
        emailcontact:usercontact.emailuser,
        status:true
    }
    const contactuser = new Contact(newcontact1);
    const save1 = contactuser.save();
    // console.log(usercontact)
    // let contact = await Contact.findOne({ emailuser: req.body.emailcontact, emailcontact: usercontact.emailuser})
    // console.log(contact)
    const newcontact2 = Contact.findByIdAndUpdate( usercontact.id , usercontact.status=true)
    // const newcontact2 = Contact.findByIdAndUpdate( contact.id , contact.status=true)
    // const save1 = contact.save();
    const save2 = usercontact.save();
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
    let searchcontact = await User.findOne({"account.email":emailuser})
    // console.log(searchcontact)
    // console.log(emailuser)
    if (searchcontact == null ){
        console.log("Không tìm thấy người dùng có email là " + emailuser)
    } else if (searchcontact.account.email == emailcontact){
        console.log("Bạn không thể kết bạn với chính mình")
    } 
    // else if(){
    //    console.log("Người này hiện tại đã là bạn bè")
    // }
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