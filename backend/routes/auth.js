import express from "express";
import { login, logout, signup ,verifyEmail,forgotPassword, checkAuth} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/check-auth",verifyToken,checkAuth)

router.post("/login", login);

router.post("/logout", logout);

router.post('/verify-email',verifyEmail)
router.post('/forgot-password',forgotPassword)

export default router;
