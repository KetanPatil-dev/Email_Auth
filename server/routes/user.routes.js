import express from "express"
import { CheckAuth, ForgotPassword, Login, Logout, ResetPassword, Signup, VerifyEmail } from "../controllers/user.controller.js"
import { VerifiyToken } from "../middleware/VerifyToken.js"
const AuthRoutes=express.Router()

AuthRoutes.post("/signup",Signup)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)
AuthRoutes.post("/verify-email",VerifyEmail)
AuthRoutes.post("/forgot-password",ForgotPassword)
AuthRoutes.post("/reset-password/:token",ResetPassword)
AuthRoutes.get("/check-auth",VerifiyToken,CheckAuth)
export default AuthRoutes