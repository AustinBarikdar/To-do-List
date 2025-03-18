import express from 'express';
import { login, logout, register, resetPassword, sendResetPasswordOTP, sendVerfiyEmailOTP, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerfiyEmailOTP);
authRouter.post('/verify-email', userAuth, verifyEmail);
authRouter.post('/send-password-otp', userAuth, sendResetPasswordOTP);
authRouter.post('/reset-password', userAuth, resetPassword);




export default authRouter;