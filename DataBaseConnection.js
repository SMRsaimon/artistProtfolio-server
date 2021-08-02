
const mysql = require("mysql");

// Databse connection with mySql

const db = mysql.createConnection({
    user: process.env.DB_USER_NAME,
    host: process.env.DB_HOST_NAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE_NAME,
  });

  module.exports=db

  