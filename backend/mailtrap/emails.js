import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"


export const sendVerificationEmail=async(email,verificationToken)=>{
    const recipient=[{email}]
    try{
  const response=await mailtrapClient.send({
     from:sender,
     to:recipient,
     subject:"Verify your email",
     html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
     category:"Email Verification"

  })
  console.log("Email sent Succcessfully...")
    } catch(error)
    {
        console.error(error)
      throw new Error(`Error sending verification email:${error}`)
    }
}

export const sendWelcomeEmail=async(email,name)=>{
  const recipient=[{email}]
  try {
    const response= await mailtrapClient.send({
      from:sender,
      to:recipient,
      template_uuid:"61eea085-7dca-4497-9382-921461965e65",
      template_variables:{
        company_info_name:"Ketan's Auth Company",
        name:name
      }
     })
     console.log("Email Sent Successfullt..",response)
  } catch (error) {
    console.error("ERROR",error) 
  }
}