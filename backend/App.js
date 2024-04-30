import  express, { urlencoded }  from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRoute.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { dbConnection } from "./database/dbconnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app= express();
dotenv.config({path:"./config/.env"})
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true,
    methods:["POST","PUT","DELETE","GET"]
}))

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))

app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to Job Seeker Backend"
    })
})

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/applications",applicationRouter);

dbConnection();



app.use(errorHandler)
export default app;