import userModel from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken"

export const authorize = catchAsyncError(async(req,res,next)=>{
    const {token} =req.cookies;
    if(!token){
        return next(errorHandler("User is not authorized",400))
    }

    const decodedToken= jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user= await userModel.findById(decodedToken.id);
    // console.log(req.user)
    next();
}) 