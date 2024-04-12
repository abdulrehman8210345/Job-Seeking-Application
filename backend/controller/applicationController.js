import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorHandler, errorObject } from "../middlewares/errorHandler.js";
import applicationModel from "../models/applicationModel.js";
import cloudinary from "cloudinary";
import jobModel from "../models/jobModel.js";

export const employerGetallapplications=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(errorObject("Job Seeker is not allowed for this resource", 400));
    }

    const {_id}=req.user;
    const allapplications= await applicationModel.find({'employerID.user':_id})

    res.status(200).json({
        success:true,
        allapplications
    })
});
export const jobSeekerGetallapplications=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Employer") {
      return next(errorObject("Employer is not allowed for this resource", 400));
    }

    const {_id}=req.user;
    const allapplications= await applicationModel.find({'applicantID.user':_id})

    res.status(200).json({
        success:true,
        allapplications
    })
});

export const jobSeekerDeleteapplication=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Employer") {
      return next(errorObject("Employer is not allowed for this resource", 400));
    }

    const {id}=req.params;
    const application_id=await applicationModel.findById(id);
    if(!application_id){
        return next(errorObject("Application not found",404))
    }
    await application_id.deleteOne();

    res.status(200).json({
        success:true,
        message:"Application deleted successfully"
    })
});

export const postapplication=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if (role === "Employer") {
        return next(errorObject("Employer is not allowed for this resource", 400));
      }

      if(!req.files || Object.keys(req.files).length===0){
        return next(errorObject("CV/Resume is required!",400))
      }

      const {resume}=req.files;
      console.log(resume.mimetype);
      const formatsAllowed=["image/jpeg","image/jpg","image/png","image/webp"];
      if(!formatsAllowed.includes(resume.mimetype)){
        return next(errorObject("Invalid file format!!,Please upload image in jpg/jpeg/png/webp format",400))
      };

      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
      ) 
      if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(cloudinaryResponse.error);
        return next(errorObject("Failed to upload resume/CV",400))
      }

      const {name,email,coverLetter,phone,address,jobID}=req.body;
      const applicantID={
        user:req.user._id,
        role:"Job Seeker"
      }
      if(!jobID){
        return next(errorObject("Job not found",400))
      }

      const jobDetails=await jobModel.findById(jobID);
      const employerID={
        user:jobDetails.jobPostedBy,
        role:"Employer"
      }

      if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(errorObject("Please fill out all required application details",400))
      }

      const application = await applicationModel.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
      });

      res.status(200).json({
        success:true,
        message:"Application submitted successfully",
        application
      })



})