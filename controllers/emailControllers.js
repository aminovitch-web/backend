const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const sendEmail = asyncHandler(async (data, req, res) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MP,
    },
  });

  // Send email
  await transporter.sendMail(data);

  // Handle response or any additional logic
  if (res) {
    res.json({ message: "Email sent successfully" });
  }
});

module.exports = sendEmail;