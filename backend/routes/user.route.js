import express from "express";
import {signup, signin} from "../controllers/user.controller.js";

const router = express.Router();

// Signup API (Path: "/api/auth/signup")

router.post("/signup" , signup);

// Signin API (Path: "/api/auth/signin")

router.post("/signin", signin); 


export default router;