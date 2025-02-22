import bcrypt from "bcryptjs"; // library to hash passwords
import jwt from 'jsonwebtoken'; // library to create JSON Web Tokens
import userModel from "../models/userModel.js"; // import the user model
import transporter from "../config/nodemailer.js";


export const getUser = async(req,res) =>{
    try{
        const {userId} = req.body;

        if (!userId){
            return res.json({success:false, message: "No UserId"} )
        }

        const user = await userModel.findById(userId)

        if (!userId){
            return res.json({success:false, message: "No User infomormation"} )
        }

        return res.json({
            success:true,
            userInfo:
            {
                name: user.name,
                isAccountVerified: user.isAccountVerified,
            }
        })



    }catch(error){
        return res.json({success: false, message: error.message});
    }
}