import express from "express";
import { deleteJob, getjobs, getmyjobs, getsinglejob, postjob, updatejob } from "../controller/jobController.js";
import { authorize } from "../middlewares/auth.js";

const router=express.Router();
router.get("/getjobs",getjobs);
router.post("/postjob",authorize,postjob);
router.get("/getmyjobs",authorize,getmyjobs);
router.put("/updatejob/:id",authorize,updatejob);
router.delete("/deletejob/:id",authorize,deleteJob);
router.get("/:id",authorize,getsinglejob);
export default router;