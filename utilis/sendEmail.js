const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
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
      text: options.message,
      html: `<h1> wellcome to TelecomTechStore <strng> created by Riahi Semah </strng> </h1>
        <a href=${options.url}><button>Click Here</button></a>`,
    };

    let info = transporter.sendMail(message);
    console.log("Email sent 1 : " + info.response);
    return info;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
