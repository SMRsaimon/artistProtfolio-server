const express = require("express");
const projectsRoute = express.Router();
const db = require("../DataBaseConnection");
const authCheck = require("../Middleware/authCheck");
// multer file uploaded function
const upload = require("../Multer/multer");

// POST Method
// project data post method
projectsRoute.post(
  "/data/insert",
  authCheck,
  upload.single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const imgFolder = req.body.imgFolder;
    const vertical = req.body.vertical;
    const squire = req.body.squire;
    const date = new Date();

    const img = url + "/uploads/" + req.file.filename;
    // insert data on database
    db.query(
      "INSERT INTO projects (created_at,fileName, vertical,squire, img) VALUES (?,?,?,?,?)",
      [date, imgFolder, vertical, squire, img],
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
  }
);

// insert project details in database

projectsRoute.post("/details/data/insert", authCheck, (req, res, next) => {
  const fileName = req.body.descriptionFolder;
  const title = req.body.title;
  const description = req.body.description;

  const date = new Date();

  db.query(
    "INSERT INTO projectsdetails (fileName, title, description, created_at) VALUES (?,?,?,?)",
    [fileName, title, description, date],
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
});

// GET method
// get projects  images data from data base

projectsRoute.get("/data/get", (req, res, next) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      res.status(500).send("server error ");
    } else {
      res.status(200).send(result);
    }
  });
});

// get projects details data from data base
// http://localhost:5000/projects/details/data/getDetails
projectsRoute.get("/details/data/getDetails", (req, res, next) => {
  db.query("SELECT * FROM projectsdetails", (err, result) => {
    if (err) {
      res.status(500).send("server error ");
    } else {
      res.status(200).send(result);
    }
  });
});

// PATCH Method update images data on database

// Update images in database by ID
projectsRoute.patch(
  "/data/img/update",
  authCheck,
  upload.single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const id = req.body.id;
    const img = url + "/uploads/" + req.file.filename;

    // update images on database
    db.query(
      "UPDATE projects SET img = ? WHERE id = ?",
      [img, id],
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

// DELETE Method to delete project images

projectsRoute.delete("/data/img/delete/:id", authCheck, (req, res, next) => {
  const id = req.params.id;

  // update images on database
  db.query("DELETE FROM projects WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(500).send("server error");
    }
    if (result) {
      res.status(200).send(result);
    }
  });
});

module.exports = projectsRoute;

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
