import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api", (req,res) => {
    res.status(200).json({"message" : "Welcome to Bank Dashboard Api" });
})

// Running Port of API
app.listen(5000, () => {
    console.log("API Running at http://localhost:5000");
});

// Middleware to handle errors 
app.use((error,req,res,next) => {
   const statusCode = error.statusCode || 500;
   const message = error.message || "Internal Server Error";
   res.send({
    success : false,
     statusCode,
     message
   });
});