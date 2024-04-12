import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[30,"Name is too large"]
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please enter a valid email"],
        required:[true,"Please enter your email"],
    },
    coverLetter:{
        type:String,
        required:[true,"Please enter your cover letter"],
    },
    phone:{
        type:String,
        required:[true,"Please enter your phone number"],
    },
    address:{
        type:String,
        required:[true,"Please enter your address"],
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["Job Seeker"]
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["Employer"]
        }
    }
})

export default new mongoose.model("Application",applicationSchema)