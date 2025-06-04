
import { SendVerificationCode, WelcomeEmail } from "../mailtrap/mail.js"
import UserModel from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import bcrypt from "bcryptjs"


export const Signup=async (req ,res)=>{
    const {name,email,password}=req.body
    try {
    if(!name || !email || !password)    
        throw new Error("All fields are required")
        const userExists= await UserModel.findOne({email})
        if(userExists)
            return res.status(403).json({message:"User Already Exists"})

        const hashedPassword= await bcrypt.hash(password,10)
        const VerificationCode=Math.floor(100000+Math.random()*900000).toString()
        const newUser= await UserModel.create({
            name,email,password:hashedPassword,verificationToken:VerificationCode,verificationTokenExpiresAt:Date.now()+24*60*60*1000
        })
generateTokenAndSetCookie(res,newUser._id)
const {password:_,...userData}=newUser.toObject()
await SendVerificationCode(email,VerificationCode,userData.name)
        return res.status(201).json({success:true,message:"User created Successfully",userData})
        
    } catch (error) {
        console.log("Signup Error",error.message)
    }
}
export const Logout=async(req,res)=>{
    try {
     res.clearCookie("token")
     return res.status(200).json("Logout Successful")
    } catch (error) {
        console.log("Logout Error",error)
    }
}

export const VerifyEmail=async(req,res)=>{
    try {
        const {code}=req.body
        const user=await UserModel.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
        if(!user)
            return res.status(400).json("Invalid or expired Verfifcation Token")
        
        user.isVerified=true
        user.verificationToken=undefined
        user.verificationTokenExpiresAt=undefined
        await user.save()
        await WelcomeEmail(user.email,user.name)
        return res.status(201).json("Email Verified Successfully")
    } catch (error) {
     console.log("Verify Email Error",error)   
    }
}