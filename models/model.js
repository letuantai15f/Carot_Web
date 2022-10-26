const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String
    }, 
    gender:{
        type:String
    },
    avata:{
        type:String
    },
    date:{type:String},
    account:{
        email:{type:String},
    
        
    }
});
let User=mongoose.model('User',userSchema);
module.exports={User};