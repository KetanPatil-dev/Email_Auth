import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mail.ketan027@gmail.com",
    pass: "tkpc jcev ezyf zcre",
  },
});

