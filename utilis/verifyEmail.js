const nodemailer = require("nodemailer");

const verifyEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: "riahisamh817@gmail.com", // Your email
      pass: "nvaFt1y8wOYzZ4h9", // Your email password or app-specific password
    },
  });

  let message = {
    from: `TelecomTechStore <riahisamh817@gmail.com>`,
    to: options.email,
    subject: options.subject,
    html: `<div style="width:100%; height:100%;"><h1 style="font-weight:500">Hey,
     ${options.name}<br>Welcome to TelecomTehStore </h1><h1>Thanks for Signing up on our app</h1><h3>Your Code for verification is :
      ${options.code}</h3></div><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>Riahi Semah(Owner)</strong></p>`,
  };

  try {
    let info = await transporter.sendMail(message);
    console.log("Email sent verfy: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email for verification.");
  }
};

module.exports = verifyEmail;
