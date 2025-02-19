import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

import {generateTokenAndSetCookie} from "../utils/generateTokeAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";


export const signup=async(req,res)=>{
    try{

        const {email,password,name}=req.body;
        if(!email||!password||!name){
            res.status(400).json({message:"All fields are required"})
        }
         const userAlreadyExists= await User.findOne({email})
        
         if(userAlreadyExists){
         res.status(400).json({success:false,message:"User Already Exists"})
         }

         const hashedPassword= await bcrypt.hash(password,10)
          const verificationToken= Math.floor(100000+Math.random()*900000).toString()
         const user=new User({
            email,password:hashedPassword,name,verificationToken,verificationTokenExpiresAt:Date.now()+ 24*60*60*1000 // 24 hours
         })
         await user.save()
         generateTokenAndSetCookie(res,user._id);
          await sendVerificationEmail(user.email,verificationToken)
         
         res.status(201).json({
            success:true,
            message:"User created Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
         })
        } catch(error)
    {
        res.status(400).json({success:false,message:error.message})
    }
}

export const verifyEmail=async(req,res)=>{
 const {code}=req.body;
 try {
    const user= await User.findOne({
        verificationToken:code,
        verificationTokenExpiresAt:{$gt:Date.now()}
    })
    if(!user)
    {
        return res.status(400).json({success:false,message:"Invalid or expired verification code"})
    }
    user.isVerified=true;
    user.verificationToken=undefined,
    user.verificationTokenExpiresAt=undefined
    await user.save();
    await sendWelcomeEmail(user.email,user.name)
    res.status(200).json({success:true,message:"Email Verified Successfully",user:{
        ...user._doc,password:undefined
    }})
 } catch (error) {
    
 }
}
export const login=async(req,res)=>{
    res.send("Login Route")
}
export const logout=async(req,res)=>{
    res.send("Logout Route")
}