import bcrypt from "bcryptjs"; // library to hash passwords
import jwt from 'jsonwebtoken'; // library to create JSON Web Tokens
import userModel from "../models/userModel.js"; // import the user model
import transporter from "../config/nodemailer.js";

export const register = async(req, res) => {
    const {name, email, password} = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'});
    }

    try {
        // Check if a user with the provided email already exists
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({success:false, message: "User already exists."});
        }

        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const user = new userModel({name, email, password: hashedPassword});

        // Save the new user to the database
        await user.save();

        // Create a JWT token with the user's ID and a 7-day expiration
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // Set the token as a cookie in the response
        res.cookie('token', token, {
            httpOnly: true, // Cookie is accessible only by the web server
            secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Cookie is restricted to same site in development
            maxAge: 7 * 24 * 60 * 60 * 1000  // Cookie expiration time in milliseconds (7 days)
        });

                // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL, // sender address
            to: email,
            subject: "Welcome to our platform", // Subject line
            text: `Hello ${name}, Welcome to our platform!, Your account has been created with them email ID ${email}`, // plain text body
        }

        await transporter.sendMail(mailOptions);
        // Respond with success message
        res.json({success: true, message: 'User registered successfully'});
    } catch(error) {
        // Handle any errors that occur during registration
        res.json({success:false, message: error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password){
        return res.json( {success: false, message: "Missing Email and Password"})
    }

    try{
        const user = await userModel.findOne({email});

        // Check if the user exists
        if(!user){
            return res.json({success: false, message: "Invalid Email"})
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!isPasswordCorrect){
            return res.json({success: false, messgae: "Invalid Password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // Set the token as a cookie in the response
        res.cookie('token', token, {
            httpOnly: true, // Cookie is accessible only by the web server
            secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Cookie is restricted to same site in development
            maxAge: 7 * 24 * 60 * 60 * 1000  // Cookie expiration time in milliseconds (7 days)
        });

        return res.json({success: true, message: "User logged in successfully"})

    }catch{
        return res.json({success:false, message: "Invalid Credentials"})
    }
}

export const logout = async(req,res) => {
    try{
        // Clear the token cookie to log out the user
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

        });


        return res.json({success: true, message: "User logged out successfully"});

    }catch(error){
        return res.json({success: false, message: error.message});
    }
}

export const sendVerfiyEmailOTP = async(req, res) => {  

    try{

        // Check if the user exists
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false, message: "Account already verified"})
       
        }


        // Generate a random 6-digit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Set the OTP and its expiration time (5 minutes from now)
        user.verfiyOTP =  otp;

        user.verfiyOTPExpireAt = Date.now() + 10 * 60 * 1000; //10 minutes from now

        await user.save();

        // Send the OTP to the user's email 

        
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your email", 
            text: `Your OTP for email verification is ${otp}, This expires in 10 mins`, 
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "OTP sent to email"})
    } catch(error){

        return res.json({success: false, message: error.message})
    }
}

export const verifyEmail = async(req, res) => {


    try{

        const {userId, otp} = req.body

        const user =  await userModel.findById(userId);
        
        if (user.verfiyOTP != otp){
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.verfiyOTPExpireAt < Date.now()){
            return res.json({success: false, message: "OTP Expired"})
        }

        user.isAccountVerified = true;
        user.verfiyOTP = '';
        user.verfiyOTPExpireAt = 0;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verification Successful", 
            text: `Your email has been verified successfully`, 
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: false, message: "Email verified successfully"})
    }catch (error){
        return res.json({success: false, message: error.message})
    }
}

export const sendResetPasswordOTP = async(req,res) => {

    try{
        const {email} = req.body;

        if(!email){
            return res.json({success: false, message: "Email not entered."})
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Set the OTP and its expiration time (5 minutes from now)
        user.resetOtp =  otp;

        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; //10 minutes from now

        await user.save();
        
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Password", 
            text: `Your OTP for password verification is ${otp}, This expires in 10 mins`, 
        }

        await transporter.sendMail(mailOptions);


        return res.json({success: true, message: "Reset Password OTP sent to email"})


    }catch(error){

        return res.json({success: false, message: error.message})
    }
}

export const resetPassword = async(req, res) => {


    try{

        const {email, otp, password} = req.body

        const user =  await userModel.findOne({email});
        
        console.log(user.resetOtp)

        if (user.resetOtp != otp){
            return res.json({success: false, message: "Invalid OTP"})
        }
         

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP Expired"})
        }
        

        if (!password || password.length < 6){
            return res.json({success: false, message: "Password is required"})
        }



        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        user.password = await bcrypt.hash(password, 10);

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Password Successful", 
            text: `Your password has been reset successfully`, 
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Reset password successfully"})
        
    }catch (error){
        return res.json({success: false, message: error.message})
    }

}