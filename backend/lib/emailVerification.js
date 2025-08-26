import nodemailer from "nodemailer"
import { Verification_Email_Template, Welcome_Email_Template } from "./emailTemplate.js"

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vrushabhpawar05@gmail.com",
    pass: "opyz miry yopl txds",
  },
});

export const sendEmail = async (receipient, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"Streamify" <vrushabhpawar05@gmail.com>', // sender address
      to: receipient, // list of receivers
      subject: "Verify your Email", // Subject line
      text: "Verify your email", // plain text body
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode), 
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

export const sendWelcomeEmail = async (receipient, fullname) => {
  try {
    const info = await transporter.sendMail({
      from: '"Streamify" <vrushabhpawar05@gmail.com>', // sender address
      to: receipient, // list of receivers
      subject: "Welcome email", // Subject line
      text: "Welcome email", // plain text body
      html: Welcome_Email_Template.replace("{name}", fullname), 
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};