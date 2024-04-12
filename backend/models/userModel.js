import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[30,"Name is too large"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    phone:{
        type:Number,
        required:[true,"Please enter your phone number"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password must be at least 8 characters"],
        maxLength:[32,"Password cannot exceed 32 characters"],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker","Employer"]
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
});

// Hashing password middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Comparing passwords instance method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating token instance method
userSchema.methods.generateToken = function () {
    return Jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
};



export default new mongoose.model("User",userSchema)