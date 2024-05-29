import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI,{dbName:"Job_Seeking_Application"}).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(`database connection failed due to ${err}`)
    })
}