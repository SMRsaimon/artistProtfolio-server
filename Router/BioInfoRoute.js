const  express=require("express");
const db = require("../DataBaseConnection");
const authCheck = require("../Middleware/authCheck");
 const bioInfoRouter=express.Router()



  
  // POST Method 
  // api: http://localhost:5000/bioInfo/api/bioInformation/insert
  
  
  bioInfoRouter.post("/api/bioInformation/insert", authCheck, (req,res,next)=>{
  
    const heading=req.body.heading;
    const bioInformation=req.body.paraGraph
    const date = new Date();
  console.log(req.body)
    db.query(
      "INSERT INTO bioinformation (heading, bioInformation, created_at) VALUES (?,?,?)",
      [heading, bioInformation, date],
      (err, result) => {
        if (err) {
          res.status(500).send("server error ");
  
          next();
        }
        if (result) {
          res.status(200).send(result);
          next();
        }
      }
    );
  
  })

  //  GET Method

 // get all Bio Information data   from data base
// api : http://localhost:5000/bioInfo/api/bioInformation/get
bioInfoRouter.get("/api/bioInformation/get", (req, res, next) => {
    db.query("SELECT * FROM bioinformation", (err, result) => {
      if (err) {
        res.status(500).send("server error ");
      } else {
        res.status(200).send(result);
      }
    });
  });



 module.exports=bioInfoRouter