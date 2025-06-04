import express from "express"
import { Logout, Signup, VerifyEmail } from "../controllers/user.controller.js"
const AuthRoutes=express.Router()

AuthRoutes.post("/signup",Signup)
AuthRoutes.post("/logout",Logout)
AuthRoutes.post("/verify-email",VerifyEmail)

export default AuthRoutes