const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../DataBaseConnection");
const jwt = require("jsonwebtoken");
const logInRoute = express.Router();

// create admin with password
logInRoute.post("/api/createAdmin", async (req, res, next) => {
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

// admin login route

logInRoute.post("/api/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM adminCollection WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const token =jwt.sign(
              {
                email: result[0].email,
                id: result[0].id,
              }, 
              process.env.JWT_SECRET,
             
            );

            res.status(200).json({
              access_token: token,
              message: "Login successful! ",
            });
          } else {
            console.log("Wrong username/password combination!");
            res
              .status(401)
              .send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        console.log("User doesn't exist");
        res.status(404).send({ message: "User doesn't exist" });
      }
    }
  );
});

module.exports = logInRoute;
