const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./DataBaseConnection");

const adminRoute = express.Router();

adminRoute.post("/api/createAdmin", async (req, res, next) => {
  try {
    const hasingPassword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;

    const result = await db.query(
      "INSERT INTO adminCollection (email, hasingPassword) VALUES (?,?)",
      [email, hasingPassword]
    );


    res.status(200).send(result);
    console.log(result);


  } 
  
  
  
  catch (error) {
    console.log(err);

    res.status(200).send(err)
  }
});

module.exports = adminRoute;
