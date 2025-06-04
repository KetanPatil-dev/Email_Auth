import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mail.ketan027@gmail.com",
    pass: "tkpc jcev ezyf zcre",
  },
});

const SendEmail=async()=>{
    try {
        const info = await transporter.sendMail({
    from: '"Ketan Patil" <mail.ketan027@gmail.com>',
    to: "mail.ketan027@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>",
        } )  
        console.log(info)
    }   
     catch (error) {
        console.log(error)
    }
}
SendEmail()