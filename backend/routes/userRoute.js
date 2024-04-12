import express from "express";
import { getuser, login, logout, register } from "../controller/userController.js";
import { authorize } from "../middlewares/auth.js";

const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",authorize,logout);
router.get("/getuser",authorize,getuser);

export default router;