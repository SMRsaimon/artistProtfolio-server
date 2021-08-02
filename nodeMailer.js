
const express=require("express")
const  nodeMailerRoute=express.Router()

// Node mailer
// create reusable transporter object using the default SMTP transport
nodeMailerRoute.post("/sendEmail/data/post", (req,res,next)=>{

        



})
let transporter = nodemailer.createTransport({

  
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'saimoncse333@gmail.com', // generated ethereal user
        pass: 'SMRsaimon960@'  // generated ethereal password
    },
    
  });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Nodemailer Contact"reyadabfedin7@gmail.com', // sender address
      to: 'saimoncse333@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'test data send', // plain text body
      
  };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
     
  });
  