import express from "express";
import { employerGetallapplications, jobSeekerDeleteapplication, jobSeekerGetallapplications, postapplication } from "../controller/applicationController.js";
import { authorize } from "../middlewares/auth.js";

const router=express.Router();

router.get("/employer/getall",authorize,employerGetallapplications);
router.get("/jobseeker/getall",authorize,jobSeekerGetallapplications);
router.delete("/delete/:id",authorize,jobSeekerDeleteapplication);
router.post("/postapplication",authorize,postapplication);


export default router;