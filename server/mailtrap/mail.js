import { PASSWORD_RESET_REQUEST_TEMPLATE, Verification_Email_Template,Welcome_Email_Template } from "./EmailTemplate.js"
import { transporter } from "./mailtrap.config.js"

export const SendVerificationCode=async(email,verificationCode,name)=>{
    try {
          const info = await transporter.sendMail({
            from: '"Ketan Patil" <mail.ketan027@gmail.com>',
            to: "mail.ketan027@gmail.com",
            subject: "Verify",
            text: "Hello world?", // plain‑text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode).replace("{name}",name)
          })
    } catch (error) {
        console.log(error)
    }
}

export const WelcomeEmail=async(email,name)=>{
    try {
          const info = await transporter.sendMail({
            from: '"Ketan Patil" <mail.ketan027@gmail.com>',
            to: "mail.ketan027@gmail.com",
            subject: "Welcome",
            text: "Welcome Email", // plain‑text body
            html: Welcome_Email_Template.replace("{name}",name)
          })
    } catch (error) {
        console.log(error)
    }
}

export const SendPasswordResetEmail=async(email,resetURL)=>{
  try {
     const info = await transporter.sendMail({
            from: '"Ketan Patil" <mail.ketan027@gmail.com>',
            to: "mail.ketan027@gmail.com",
            subject: "Reset",
            text: "Reset Password", // plain‑text body
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
          })
    
  } catch (error) {
    console.log(error)
  }
}