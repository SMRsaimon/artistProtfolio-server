const express = require("express");
const adminPanelRouter = express.Router();
const db = require("../DataBaseConnection");


// GET method
// get all created admin   from data base

// api : http://localhost:5000/adminPanel/api/admin/email
adminPanelRouter.get("/api/admin/email",  (req, res, next) => {
  db.query("SELECT * FROM admincollection", (err, result) => {
    if (err) {
      res.status(500).send("server error ");
    } else {
      res.status(200).send(result);
    }
  });
});


// Delete method 
// delete  admin email from database
// api : http://localhost:5000/adminPanel/api/admin/delete/

adminPanelRouter.delete("/api/admin/delete/:id", (req, res, next) => {
  const id = req.params.id;

  db.query("DELETE FROM admincollection WHERE id = ?", id, (err, result) => {
    if (err) {

      console.log(err)
      res.status(500).send("server error")
    } 
    if(result){

      console.log(result)

        res.status(200).send(result)
    }
  });
});

module.exports = adminPanelRouter;
