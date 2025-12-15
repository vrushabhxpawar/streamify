import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { Verification_Email_Template, Welcome_Email_Template } from "./emailTemplate.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vrushabhpawar05@gmail.com",
    pass: "opyz miry yopl txds",        
  },
  // optional debug/logging
  logger: true,
  debug: true
});

export const sendEmail = async (receipient, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: `"Streamify" <${process.env.FROM_EMAIL}>`,
      to: receipient,
      subject: "Verify your Email",
      text: "Verify your email",
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

export const sendWelcomeEmail = async (receipient, fullname) => {
  try {
    const info = await transporter.sendMail({
      from: `"Streamify" <${process.env.FROM_EMAIL}>`,
      to: receipient,
      subject: "Welcome email",
      text: "Welcome email",
      html: Welcome_Email_Template.replace("{name}", fullname),
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};
