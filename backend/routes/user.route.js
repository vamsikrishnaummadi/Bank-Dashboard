import express from "express";
import {
  deleteUser,
  getUserByAccountNumber,
  getUsers,
  signin,
  signup,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Signup API (Path: "/api/auth/signup")

router.post("/auth/signup", signup);

// Signin API (Path: "/api/auth/signin")

router.post("/auth/signin", signin);

// get All Users API (Path: "/api/users")

router.get("/users", getUsers);

// get User By account Number (Path: "/api/users/<account number>")

router.get("/users/:accountNumber", getUserByAccountNumber);

// update User (Path: "/api/users/<account number>")

router.put("/users/:accountNumber", updateUser);

// delete User  (Path: "/api/users/<account number>")

router.delete("/users/:accountNumber", deleteUser);

// update Password of the User (Path: "/users/password/<account number>")

router.put("/users/password/:accountNumber", updatePassword);

export default router;
