import mongoose from "mongoose"

const userSchema = new mongoose.Schema({ //create user model
    name: {type: String, required:true },
    email: {type: String, required:true,unique: true },
    password: {type: String, required:true,},
    
    verfiyOTP: {type: String, default: '',},
    verfiyOTPExpireAt: {type: Number, default: 0,},
    isAccountVerified: {type: Boolean, default: false,},
    resetOtp: {type: String, default: '',},
    resetOtpExpireAt: {type: Number, default: 0,},


})

const userModel = mongoose.models.user || mongoose.model('user', userSchema); // the mongoose.models.user is if theirs a usermodel, unlesss use the schmea

export default userModel;