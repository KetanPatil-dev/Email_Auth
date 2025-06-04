import express from "express"
import { ForgotPassword, Login, Logout, Signup, VerifyEmail } from "../controllers/user.controller.js"
const AuthRoutes=express.Router()

AuthRoutes.post("/signup",Signup)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)
AuthRoutes.post("/verify-email",VerifyEmail)
AuthRoutes.post("/forgot-password",ForgotPassword)
export default AuthRoutes