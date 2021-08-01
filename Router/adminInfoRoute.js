const express = require("express");
const db = require("../DataBaseConnection");
const authCheck = require("../Middleware/authCheck");
const upload = require("../Multer/multer");

const adminInfoRoute = express.Router();

// GET method
// get all created admin   from data base

// api : http://localhost:5000/adminInformation/api/contractInformation/get
adminInfoRoute.get("/api/contractInformation/get", (req, res, next) => {
  db.query("SELECT * FROM admininformation", (err, result) => {
    if (err) {
      res.status(500).send("server error ");
    } else {
      res.status(200).send(result);
    }
  });
});




//   PUT Method
// Update profile img on database onHandel change  

// api: http://localhost:5000/adminInformation/api/profileImg/update/:id

adminInfoRoute.patch(
  "/api/profileImg/update/:id",
  authCheck,
  upload.single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const id = req.params.id;
    const img = url + "/uploads/" + req.file.filename;
    console.log(img, id);
    // update images on database
    db.query(
      "UPDATE admininformation SET profileImg = ?  WHERE id = ?",
      [img, id],
      (err, result) => {
        if (err) {
          res.status(500).send("server Error");
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }
);

//   PUT Method
// Update admin personal information on database

// api: http://localhost:5000/adminInformation/api/contractInformation/update/:id

adminInfoRoute.patch(
  "/api/contractInformation/update/:id",
  authCheck,

  (req, res, next) => {
      const id=req.params.id
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const whatsAppNumber = req.body.whatsAppNumber;
    const facebook = req.body.facebook;
    const linkedIn = req.body.linkedIn;
    const instagram = req.body.instagram;
    const resume = req.body.resume;
    const date = new Date()


    // update images on database
    db.query(
      "UPDATE admininformation SET name=?, email=?, phoneNumber=?, whatsAppNumber=?, facebook=?, linkedIn=?, instagram=?, resume=?, date=?  WHERE id = ?",
      [
        name,
        email,
        phoneNumber,
        whatsAppNumber,
        facebook,
        linkedIn,
        instagram,
        resume,
        date,
        id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).send("server Error");
        } else {
          res.send(result);
        }
      }
    );
  }
);

module.exports = adminInfoRoute;
