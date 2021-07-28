const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./DataBaseConnection");

const adminRoute = express.Router();

adminRoute.post("/api/createAdmin", async (req, res, next) => {
  try {
    const hashingPassword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;
    const date = new Date();
    db.query(
      "INSERT INTO adminCollection (email, password,created_at) VALUES (?,?,?)",
      [email, hashingPassword, date],
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

    
  } catch (error) {
    

    res.status(500).send(error);
  }
});

module.exports = adminRoute;
