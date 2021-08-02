const express = require("express");
const multer =require("multer")
const dotenv=require("dotenv")
const path = require("path");
const app = express();
const db=require("./DataBaseConnection")
const nodemailer = require('nodemailer');
const cors = require("cors");
app.use(cors());
app.use(express.json());
dotenv.config();
// import  router
const projectRoute=require("./Router/projectsRoute");
const logInRoute = require("./Router/logInRoute");
const adminPanelRouter = require("./Router/adminPanelRouter");
const authCheck = require("./Middleware/authCheck");
const adminInfoRoute = require("./Router/adminInfoRoute");
const bioInfoRouter = require("./Router/BioInfoRoute");
const emailRouter=require("./Router/emailRouter")

// defiend root  folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// use router 
app.use("/projects", projectRoute )
app.use("/admin/login",  logInRoute)
app.use("/adminPanel", authCheck, adminPanelRouter)
app.use("/adminInformation", adminInfoRoute)
app.use("/bioInfo", bioInfoRouter)
// app.use("/sendEmail", emailRouter)

let transporter = nodemailer.createTransport({

  
  host: "mail.reyadabedin.com",
  port: 465,
  secure: true, 
  auth: {
      user: 'info@reyadabedin.com', 
      pass: 'info@reyad!@#$'  
  },
  
});

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'saimoncse333@gmail.com', 
    to: 'info@reyadabedin.com', 
    subject: 'Node Contact Request', 
    text: 'test data send', 
    
};
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

   
});

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

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;

app.listen(port, () => {
  console.log(" server is running on port"+port);
});


