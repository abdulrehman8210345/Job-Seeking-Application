import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorObject } from "../middlewares/errorHandler.js";
import userModel from "../models/userModel.js";
import { sendToken } from "../utils/getJwt.js";

export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,password,role}=req.body;
    
    if(!name || !email || !phone || !password || !role){
     return next(errorObject("Plaese fill out all required fields", 400));
    }
    const isEmail=await userModel.findOne({email});
    if(isEmail){
        return next(errorObject("Email already exist", 400));
    }

    const createdUser= await userModel.create({name,email,phone,password,role});

    sendToken(createdUser,res,200,"User registered successfully");

});

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return next(errorObject("Plaese fill out all required fields", 400));
    }

    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        return next(errorObject("Invalid email or Password", 400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(errorObject("Invalid email or Password", 400));
    }

    if(user.role !== role){
        return next(errorObject("User with this role is not found", 400));
    }

    sendToken(user,res,200,"User logged in successfully");
        
});

export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),

    } ).json({
        success:true,
        message:"User Logged out successfully",
    })
});

export const getuser = catchAsyncError(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    })

})
