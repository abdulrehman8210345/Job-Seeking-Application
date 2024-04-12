import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter job title"],
        minLength:[3,"Job title must be at least 3 characters"],
        maxLength:[30,"Job title is too large"]   
    },
    description:{
        type:String,
        required:[true,"Please enter job description"],
        minLength:[10,"Job description must be at least 10 characters"],
        maxLength:[100,"Job description is too large"]
    },
    category:{
        type:String,
        required:[true,"Job category is required!"],
    },
    country:{
        type:String,
        required:[true,"Job country is required!"],
    },
    city:{
        type:String,
        required:[true,"Job city is required!"],
    },
    location:{
        type:String,
        required:[true,"Please provide exact location!"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Salary must be at least 4 digits"],
        maxLength:[10,"Salary cannot exceed 10 digits"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from must be at least 4 digits"],
        maxLength:[10,"Salary from cannot exceed 10 digits"],
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary to must be at least 4 digits"],
        maxLength:[10,"Salary to cannot exceed 10 digits"],
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    jobPostedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }

});

export default new mongoose.model("Job",jobSchema)