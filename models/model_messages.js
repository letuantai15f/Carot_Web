const mongoose = require('mongoose');
const messagesSchema = new mongoose.Schema({
    idChat: {
        type: mongoose.Schema.ObjectId,
        index: true,
        ref: 'GroupChat',
    },
    sender:{
        email:String,

    },
    reciver:{
        username:String,
        email:String,
        avata: String
    },
    text:String,
    file:{
            data:Buffer,
            contenType: String,
            fileName:String,
            path:String},
    createdAt: {type:Number,default:Date.now},
    updateAt: {type:Number,default:null},
    deleteAt: {type:Number,default:null},
    

});
let message = mongoose.model('message', messagesSchema);
module.exports = {message};