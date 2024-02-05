const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT_BREVO,
      secure: false, // Use TLS
      auth: {
        user: process.env.FROM_EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    let message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `<h1> wellcome to TelecomTechStore <strng> created by Riahi Semah </strng> </h1>  <a href=${options.url}><button>Click Here</button></a>`,
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
