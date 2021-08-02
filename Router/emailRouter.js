const express=require("express")
const emailRouter=express.Router()



emailRouter.post("/emailsend/data/post",(ewq,res,next)=>{

     const from=req.body.email;
     const subject=req.body.subject;
     const detals=req.body.details;
     

})