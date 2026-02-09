import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, message, phone } = req.body;
  const name = firstName + " " + lastName;

  const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await new Promise((resolve, reject) => {
      contactEmail.sendMail(mail, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(); 
        }
      });
    });
    return res.status(200).json({ code: 200, status: "Message Sent" });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "Message failed", error: error.toString() });
  }
}
