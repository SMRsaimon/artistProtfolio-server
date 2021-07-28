const express = require("express");
const multer =require("multer")
const path = require("path");
const app = express();
const db=require("./DataBaseConnection")
const nodemailer = require('nodemailer');
const cors = require("cors");
app.use(cors());
app.use(express.json());
require('dotenv').config();
// import  router
const projectRoute=require("./projectsRoute");
const adminRoute = require("./adminRoute");


// defiend root  folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// use router 
app.use("/projects",projectRoute )

app.use("/admin", adminRoute)





//custom  error handeling
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("there was an uploaded error ");
    } else {
      res.status(500).send(err);
    }
  } else {
    res.send("success");
  }
});

app.listen(3001, () => {
  console.log(" server is running on port 3001");
});


