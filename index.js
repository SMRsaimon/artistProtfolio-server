const express = require("express");
const multer =require("multer")
const path = require("path");
const app = express();

const db=require("./DataBaseConnection")
const cors = require("cors");
app.use(cors());
app.use(express.json());

// import  route

const projectRoute=require("./projectsRoute")


// defiend root  folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// use router 

app.use("/projects",projectRoute )



// get projects data from database
app.get("/projects", (req, res) => {

  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
      
    }
  });
});



// error handeling
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("there was an uploaded error ");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});


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