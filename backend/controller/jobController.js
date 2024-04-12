import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorHandler, errorObject } from "../middlewares/errorHandler.js";
import jobModel from "../models/jobModel.js";

export const getjobs = catchAsyncError(async (req, res, next) => {
  const alljobs = await jobModel.find({ expired: false });
  res.status(200).json({
    success: true,
    alljobs,
  });
});

export const postjob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(errorObject("Job Seeker can't post job", 400));
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(errorObject("Please fill out all required job details", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      errorObject("Please provide either a fixed salary or ranged salary", 400)
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      errorObject("Enter Either ranged salary or fixed salary", 400)
    );
  }

  const jobPostedBy = req.user._id;
  const job = await jobModel.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    jobPostedBy
  });
  res.status(200).json({
    success: true,
    message:"Job posted successfully",
    job
  })
});

export const getmyjobs=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
  if (role === "Job Seeker") {
    return next(errorObject("Job Seeker is not allowed for this resource", 400));
  }

  const myjobs=await jobModel.find({jobPostedBy:req.user._id});
  res.status(200).json({
    success:true,
    myjobs
  })

    
})

export const updatejob=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(errorObject("Job Seeker is not allowed for this resource", 400));
    }

    const {id}=req.params;
    let job_id=await jobModel.findById(id);

    if(!job_id){
        return next(errorObject("Job not found",404))
    }

    job_id=await jobModel.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"Job updated successfully",
        job_id
    })
});

export const deleteJob=catchAsyncError(async(req,res,next)=>{
  console.log(req.user);
    const { role } = req.user;
    
    if (role === "Job Seeker") {
      return next(errorObject("Job Seeker is not allowed for this resource", 400));
    }

    const {id}=req.params;
    const job_id=await jobModel.findById(id);
    if(!job_id){
        return next(errorObject("Job not found",404))
    }
    // const deletedJob = await job_id.deleteOne();
    const deletedJob = await jobModel.deleteOne({ _id: id });
    res.status(200).json({
        success:true,
        message:"Job deleted successfully",
        deletedJob
    })
})

export const getsinglejob=catchAsyncError(async(req,res,next)=>{
  const {id}=req.params;
  const job=await jobModel.findById(id);
  if(!job){
      return next(errorObject("Job not found",404))
  }
  res.status(200).json({
      success:true,
      job
  })
})