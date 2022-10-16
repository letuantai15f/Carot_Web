const mongoose = require('mongoose');
const messagesSchema = new mongoose.Schema({
    sender:{
        id:String,
        username:String,
        avata: String
    },
    reciver:{
        id:String,
        username:String,
        avata: String
    },
    text:String,
    file:{data:Buffer,contenType: String,fileName:String},
    // createdAt: {type:Number,default:Date.now},
    // updateAt: {type:Number,default:null},
    // deleteAt: {type:Number,default:null},
    

});
let message = mongoose.model('message', messagesSchema);
module.exports = {message};