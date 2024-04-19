const nodemailer = require("nodemailer");
require("dotenv").config();

async function main(email, sub, tex) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: sub,
    text: tex,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Invalid Email ID");
    } else {
      console.log("Email sent: ");
    }
  });
}

module.exports = main;
