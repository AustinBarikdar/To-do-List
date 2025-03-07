import bcrypt from "bcryptjs"; // library to hash passwords
import jwt from 'jsonwebtoken'; // library to create JSON Web Tokens
import userModel from "../models/userModel.js"; // import the user model

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

        // Respond with success message
        return res.json({success: true, message: 'User registered successfully'});
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
            return res.json({success: false, message: "Invalid Credentials"})
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!isPasswordCorrect){
            return res.json({success: false, messgae: "Invalid Credentials"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // Set the token as a cookie in the response
        res.cookie('token', token, {
            httpOnly: true, // Cookie is accessible only by the web server
            secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Cookie is restricted to same site in development
            maxAge: 7 * 24 * 60 * 60 * 1000  // Cookie expiration time in milliseconds (7 days)
        });

        // Store login state in localStorage
       return res.json({success: true, message: "User logged in successfully", token})

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

        // Clear localStorage login state
        return res.json({success: true, message: "User logged out successfully"});

    }catch(error){
        return res.json({success: false, message: error.message});
    }
}