import express from 'express';
import { login, logout, register, resetPassword, sendResetPasswordOTP, sendVerfiyEmailOTP, verifyEmail } from '../controllers/authController.js';
import authUser from '../middleware/authUser.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', authUser, sendVerfiyEmailOTP);
authRouter.post('/verify-email', authUser, verifyEmail);
authRouter.post('/send-password-otp', authUser, sendResetPasswordOTP);
authRouter.post('/reset-password', authUser, resetPassword);




export default authRouter;