const express=require('express');
const userRouter=express.Router();
const {User}=require('../models/model');
//
userRouter.post('/',async(req, res)=>{
    
            try{
            const newUser= User(req.body);
            console.log(newUser);
            const saveUser=await newUser.save();
            console.log(saveUser);
            res.status(200).json(saveUser);}
            
            catch(err){
                console.log(err);
                res.status(500).json(err);
            }
     

});
module.exports=userRouter;