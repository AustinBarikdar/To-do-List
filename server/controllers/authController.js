import bcrypt from "bcryptjs"; // encrypt information
import jwt from 'jsonwebtoken';// create token for website 
import userModel from "../models/userModel.js";

export const register = async(req,res) => {
    const {name, email, password} = req.body;


    if (!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'})
    }
    try{ 
        const existingUser = await userModel.findOne({email});// find existing user.

        if(existingUser){
            return res.json({success:false, message: "User already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10,);// hash password

        const user = new userModel({name,email, password: hashedPassword});// created a new user schmica for the user

        await user.save()// Created in the MangoDB

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});// creates a token for the website

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === ' production', // only for production it will be true
            sameSite:process.env.NODE_ENV === 'production' ? // working on a local enviorment strict becuase it will run on local host, however delploying on live host have to add another domain name
            'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  // in millseconds
            
        })
    }catch(error) { // if any error happens we catch it.
        res.json({success:false, message: error.message})
    }
}