// mail trap config
// Looking to send emails in production? Check out our Email API/SMTP product!
import nodemailer from "nodemailer"

// testing 
console.log("MAIL_TRAP_HOST:", process.env.MAIL_TRAP_HOST);
console.log("MAIL_TRAP_PORT:", process.env.MAIL_TRAP_PORT);
console.log("MAIL_TRAP_USER:", process.env.MAIL_TRAP_USER);
console.log("MAIL_TRAP_PASS:", process.env.MAIL_TRAP_PASS);

const mailTransporter = nodemailer.createTransport({
    host: `${process.env.MAIL_TRAP_HOST}`,
    port: `${process.env.MAIL_TRAP_PORT}`,
    auth: {
      user: `${process.env.MAIL_TRAP_USER}`,
      pass: `${process.env.MAIL_TRAP_PASS}`
    }
  });

// prod
// Looking to send emails in production? Check out our Email API/SMTP product!

  export {mailTransporter}