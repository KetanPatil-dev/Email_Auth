import { ResetSuccessEmail, SendPasswordResetEmail, SendVerificationCode, WelcomeEmail } from "../mailtrap/mail.js"
import UserModel from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export const Signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password)
            throw new Error("All fields are required");
        const userExists = await UserModel.findOne({ email });
        if (userExists)
            return res.status(403).json({ message: "User Already Exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const VerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = await UserModel.create({
            name, email, password: hashedPassword, verificationToken: VerificationCode, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        generateTokenAndSetCookie(res, newUser._id);
        const { password: _, ...userData } = newUser.toObject();
        await SendVerificationCode(email, VerificationCode, userData.name);
        return res.status(201).json({ success: true, message: "User created Successfully", userData });
    } catch (error) {
        console.log("Signup Error", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json("Invalid Crediantials");
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(402).json("Invalid Password");
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        const { password: _, ...userData } = user.toObject();
        return res.status(200).json({ message: "Login Successful", userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json("Logout Successful");
    } catch (error) {
        console.log("Logout Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const VerifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user)
            return res.status(400).json("Invalid or expired Verfifcation Token");

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await WelcomeEmail(user.email, user.name);
        return res.status(201).json("Email Verified Successfully");
    } catch (error) {
        console.log("Verify Email Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json("User not Found");
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        await SendPasswordResetEmail(user.email, user.resetPasswordToken, user.name);
        return res.status(201).json("Reset Link Sent to your Email");
    } catch (error) {
        console.log("Forgot Password Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user)
            return res.status(400).json({ success: false, message: "Invalid" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        const { password: _, ...userData } = user.toObject();
        await user.save();
        await ResetSuccessEmail(user.email, user.name);
        return res.status(200).json({ message: "Password reset Successfully", userData });
    } catch (error) {
        console.log("Reset Password Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const CheckAuth = async (req, res) => {
    try {
        const { password: _, ...user } = req.user.toObject();
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("CheckAuth Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
