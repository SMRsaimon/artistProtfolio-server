
const mysql = require("mysql");

// Databse connection with mySql
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "artistprotfolio",
  });

  module.exports=db