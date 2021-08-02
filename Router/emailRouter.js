const express = require("express");
const emailRouter = express.Router();

const nodemailer = require("nodemailer");

// api: http://localhost:5000/sendEmail/emailsend/data/post

emailRouter.post("/emailsend/data/post", (req, res, next) => {
  const from = req.body.email;
  const message = req.body.message;
  const number = req.body.number;
  const name = req.body.name;

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: process.env.HOST_PORT,
    secure: true,
    auth: {
      user: process.env.RECEIVER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: from,
    to: process.env.RECEIVER_EMAIL,
    subject: name,
    text: message,
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(502).send(error);
    }
    if (info) {
      res.send(" message successfully send ");
    }
  });
});

module.exports = emailRouter;
