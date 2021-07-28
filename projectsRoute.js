const express = require("express");
const projectsRoute = express.Router();
const db = require("./DataBaseConnection");
// multer file uploaded function
const upload = require("./multer");



// POST Method 
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
        res.status(500).send("fail to uploaded");
        next();
      } else {
        res.send(true);
        next();
      }
    }
  );
});

// insert project details in database

projectsRoute.post("/details/data/insert", (req, res, next) => {
  const fileName = req.body.descriptionFolder;
  const title = req.body.title;
  const description = req.body.description;

  console.log(req.body)

  db.query(
    "INSERT INTO projectsdetails (fileName, title, description) VALUES (?,?,?)",
    [fileName, title, description],
    (err, result) => {
      if (err) {
        res.status(500).send("server error ");
   
        next();
      
      } if(result){

      
        res.status(200).send(result);
        next();
      }
    }
  );
});

// GET method 
// get projects  images data from data base

projectsRoute.get("/data/get", (req, res, next) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
       res.status(500).send("server error ")
    } else {
      res.status(200).send(result);
    }
  });
});


// get projects  images data from data base

module.exports = projectsRoute;
