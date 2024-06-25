import express from "express";
import {signup, signin, getUsers, getUserByAccountNumber, updateUser, deleteUser} from "../controllers/user.controller.js";

const router = express.Router();

// Signup API (Path: "/api/auth/signup")

router.post("/auth/signup" , signup);

// Signin API (Path: "/api/auth/signin")

router.post("/auth/signin", signin); 

// get All Users API (Path: "/api/users")

router.get("/users", getUsers);

// get User By account Number (Path: "/api.users/<account number>")

router.get("/users/:id", getUserByAccountNumber);

// update User (Path: "/api.users/<account number>")

router.put("/users/:id", updateUser);

// delete User  (Path: "/api.users/<account number>")

router.delete("/users/:id", deleteUser);


export default router;