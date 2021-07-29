const express=require("express")
const adminPanelRouter=express.Router()
const db = require("../DataBaseConnection");

// GET method 
// get all created admin   from data base

adminPanelRouter.get("/api/admin/email",  async(req, res, next) => {

         
    db.query("SELECT * FROM admincollection",(err, result) => {

        if (err) {
            res.status(500).send("server error ")
         } else {
           res.status(200).send(result);
         }
       });
      
  

})




module.exports = adminPanelRouter;

   