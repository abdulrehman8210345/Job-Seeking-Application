import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI,{dbName:"JobSeekingApplication"}).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(`database connection failed due to ${err}`)
    })
}