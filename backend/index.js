import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api", (req,res) => {
    console.log("hittebjd");
    res.status(200).json({"message" : "Welcome to Bank Dashboard Api" });
})

// Running Port of API
app.listen(5000, () => {
    console.log("API Running at http://localhost:5000");
});