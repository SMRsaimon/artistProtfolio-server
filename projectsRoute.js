const express = require("express");
const projectsRoute = express.Router();
const db = require("./DataBaseConnection");
// multer file uploaded function
const upload = require("./multer");

// project data post method 
projectsRoute.post("/data/insert", upload.single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const imgFolder = req.body.imgFolder;
  const vertical = req.body.vertical;

  const img = url + "/uploads/" + req.file.filename;
// insert data on database 
  db.query(
    "INSERT INTO projects (fileName, vertical, img) VALUES (?,?,?)",
    [imgFolder, vertical, img],
    (err, result) => {
      if (err) {
        res.send("fail to uplioaded");
      } else {
        res.send(true);
        console.log(result);
      }
    }
  );
});


// project data get method 


projectsRoute.get("/data/get",(req,res,next)=>{


    
})

module.exports = projectsRoute;
