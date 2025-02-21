import express from 'express';
import { login, logout, register, sendVerfiyEmailOTP, verifyEmail } from '../controllers/authController.js';
import authUser from '../middleware/authUser.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', authUser, sendVerfiyEmailOTP);
authRouter.post('/verify-email', authUser, verifyEmail);



export default authRouter;